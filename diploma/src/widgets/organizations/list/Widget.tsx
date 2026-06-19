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

interface OrganizationsListWidgetProps {
  organizations?: Organization[];
  ownedOrganizationIds?: string[];
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
  ownedOrganizationIds = [],
  showDiscoverCard = false,
  className,
}: OrganizationsListWidgetProps) => {
  const queryClient = useQueryClient();
  const [hiddenOrganizationIds, setHiddenOrganizationIds] = useState<string[]>(
    [],
  );
  const [organizationToLeave, setOrganizationToLeave] =
    useState<Organization | null>(null);
  const storedUserId = useUserStore((state) => state.userId)?.trim();
  const { data: currentUser } = useQuery(profileQuery.all());
  const currentUserId = storedUserId || currentUser?.id?.trim();
  const ownedIds = useMemo(
    () => new Set(ownedOrganizationIds),
    [ownedOrganizationIds],
  );

  const visibleOrganizations = useMemo(
    () =>
      organizations.filter(
        (organization) => !hiddenOrganizationIds.includes(organization.id),
      ),
    [organizations, hiddenOrganizationIds],
  );

  const leaveOrganizationMutation = useMutation({
    mutationFn: (organization: Organization) => leaveOrganization(organization.id),
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
        title: leftDirectly ? "Left organization" : "Leave request sent",
        description: leftDirectly
          ? "You have left this organization."
          : "Your request to leave has been sent for review.",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Leave failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const handleCloseLeaveModal = () => {
    leaveOrganizationMutation.reset();
    setOrganizationToLeave(null);
  };

  const handleShare = async (organization: Organization) => {
    const rawLink = organization.shareUrl ?? `/organizations/${organization.id}`;
    const link = rawLink.startsWith("http")
      ? rawLink
      : `${window.location.origin}${
          rawLink.startsWith("/") ? rawLink : `/${rawLink}`
        }`;

    try {
      await navigator.clipboard.writeText(link);
      addToast({
        title: "Link copied",
        description: `${organization.name} is ready to share.`,
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Share failed",
        description: getErrorMessage(error),
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
          const isOwner =
            ownedIds.has(organization.id) ||
            Boolean(
              currentUserId &&
                organization.ownerId?.trim() === currentUserId,
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
                <span className={styles.emptyEyebrowText}>Discover</span>
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
                <h2 className={styles.emptyTitle}>Find your next community</h2>
                <p className={styles.emptyDesc}>
                  Browse the public catalog to discover organizations that
                  match your interests.
                </p>
                <Link to="/organizations" className={styles.emptyBtn}>
                  <IconSearch size={14} />
                  Browse organizations
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
          onConfirm={() => leaveOrganizationMutation.mutate(organizationToLeave)}
          title="Are you leaving?"
          text={`Are you sure you want to leave ${organizationToLeave.name}? You can join it again later.`}
          maxWidth="628px"
          error={
            leaveOrganizationMutation.error
              ? getErrorMessage(leaveOrganizationMutation.error)
              : null
          }
          isLoading={leaveOrganizationMutation.isPending}
          cancelText="Cancel"
          confirmText="Leave"
          image={DeleteModal}
        />
      )}
    </>
  );
};
