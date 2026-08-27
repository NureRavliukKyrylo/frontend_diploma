import { useMemo, useState } from "react";
import {
  IconBuildingCommunity,
  IconMap2,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  buildOrganizationCardMeta,
  leaveOrganization,
  MyOrganizationCard,
  organizationKeys,
  type Organization,
} from "@entities/organization";
import { useUserStore } from "@entities/user";
import { profileKeys, profileQuery } from "@entities/user/profile";
import { getErrorMessage } from "@shared/libs/error-message";
import { DeleteModal } from "@shared/assets/images/actions";
import { ConfirmationModal } from "@shared/ui/modals";
import styles from "./Widget.module.scss";
import { useTranslation } from "react-i18next";

interface OrganizationsListWidgetProps {
  organizations?: Organization[];
  showDiscoverCard?: boolean;
  className?: string;
}

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export const OrganizationsListWidget = ({
  organizations = [],
  showDiscoverCard = false,
  className,
}: OrganizationsListWidgetProps) => {
  const { t } = useTranslation(["organizations", "common"]);
  const queryClient = useQueryClient();
  const [hiddenOrganizationIds, setHiddenOrganizationIds] = useState<string[]>(
    [],
  );
  const [organizationToLeave, setOrganizationToLeave] =
    useState<Organization | null>(null);
  const storedUserId = useUserStore((state) => state.userId)?.trim();
  const { data: currentUser } = useQuery(profileQuery.all());
  const currentUserId = storedUserId || currentUser?.id?.trim();

  const visibleOrganizations = useMemo(
    () =>
      organizations.filter(
        (organization) => !hiddenOrganizationIds.includes(organization.id),
      ),
    [organizations, hiddenOrganizationIds],
  );

  const leaveOrganizationMutation = useMutation({
    mutationFn: (organization: Organization) =>
      leaveOrganization(organization.id),
    onSuccess: async (data, organization) => {
      const leftDirectly =
        data.mode === "direct" || data.request?.status === "resolved";

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: profileKeys.all() }),
        queryClient.invalidateQueries({ queryKey: organizationKeys.all() }),
      ]);

      if (leftDirectly) {
        setHiddenOrganizationIds((prev) =>
          prev.includes(organization.id) ? prev : [...prev, organization.id],
        );
      }

      setOrganizationToLeave(null);

      addToast({
        title: leftDirectly
          ? t("organizations:myOrganizations.left")
          : t("organizations:myOrganizations.leaveRequestSent"),
        description: leftDirectly
          ? t("organizations:myOrganizations.leftText")
          : t("organizations:myOrganizations.leaveRequestText"),
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("organizations:myOrganizations.leaveFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const handleCloseLeaveModal = () => {
    leaveOrganizationMutation.reset();
    setOrganizationToLeave(null);
  };

  const handleShare = async (organization: Organization) => {
    const rawLink =
      organization.shareUrl ?? `/organizations/${organization.id}`;
    const link = rawLink.startsWith("http")
      ? rawLink
      : `${window.location.origin}${
          rawLink.startsWith("/") ? rawLink : `/${rawLink}`
        }`;

    try {
      await navigator.clipboard.writeText(link);
      addToast({
        title: t("organizations:myOrganizations.linkCopied"),
        description: t("organizations:myOrganizations.shareReady", {
          name: organization.name,
        }),
        color: "success",
      });
    } catch (error) {
      addToast({
        title: t("organizations:myOrganizations.shareFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    }
  };

  return (
    <>
      <motion.section
        className={`${styles.grid} ${className ?? ""}`.trim()}
        variants={gridVariants}
        initial="hidden"
        animate="show"
      >
        {visibleOrganizations.map((organization) => {
          const isOwner = Boolean(
            currentUserId && organization.ownerId?.trim() === currentUserId,
          );

          return (
            <motion.div
              key={organization.id}
              className={styles.cardSlot}
              variants={cardVariants}
            >
              <MyOrganizationCard
                organization={organization}
                meta={buildOrganizationCardMeta(organization)}
                isOwner={isOwner}
                onUnsubscribe={setOrganizationToLeave}
                onShare={handleShare}
              />
            </motion.div>
          );
        })}

        {showDiscoverCard && (
          <motion.div className={styles.cardSlot} variants={cardVariants}>
            <div className={styles.emptyCard}>
              <div className={styles.emptyDeco} />
              <div className={styles.emptyDeco2} />

              <div className={styles.emptyEyebrow}>
                <div className={styles.emptyEyebrowLine} />
                <span className={styles.emptyEyebrowText}>
                  {t("organizations:myOrganizations.discover")}
                </span>
              </div>

              <div className={styles.emptyBody}>
                <div className={styles.emptyIconRow}>
                  <div className={styles.emptyIconBubble}>
                    <IconBuildingCommunity size={18} />
                  </div>
                  <div className={styles.emptyIconBubble}>
                    <IconMap2 size={18} />
                  </div>
                  <div className={styles.emptyIconBubble}>
                    <IconUsers size={18} />
                  </div>
                </div>
                <h2 className={styles.emptyTitle}>
                  {t("organizations:myOrganizations.discoverTitle")}
                </h2>
                <p className={styles.emptyDesc}>
                  {t("organizations:myOrganizations.discoverText")}
                </p>
                <Link to="/organizations" className={styles.emptyBtn}>
                  <IconSearch size={14} />
                  {t("organizations:myOrganizations.browse")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.section>

      {organizationToLeave && (
        <ConfirmationModal
          isOpen
          onCancel={handleCloseLeaveModal}
          onConfirm={() =>
            leaveOrganizationMutation.mutate(organizationToLeave)
          }
          title={t("organizations:myOrganizations.leaveTitle")}
          text={t("organizations:myOrganizations.leaveText", {
            name: organizationToLeave.name,
          })}
          maxWidth="628px"
          error={
            leaveOrganizationMutation.error
              ? getErrorMessage(leaveOrganizationMutation.error, t)
              : null
          }
          isLoading={leaveOrganizationMutation.isPending}
          cancelText={t("common:actions.cancel")}
          confirmText={t("organizations:myOrganizations.leave")}
          image={DeleteModal}
        />
      )}
    </>
  );
};
