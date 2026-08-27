import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { normalizeOrganizationWebsiteHref } from "@entities/organization";
import type { Organization, OrganizationMember } from "@entities/organization";
import {
  buildMemberDirectoryCards,
  formatDate,
} from "../lib/helpers";

interface UseOrganizationDetailsDerivedDataParams {
  organization: Organization;
  members: OrganizationMember[];
}

export const useOrganizationDetailsDerivedData = ({
  organization,
  members,
}: UseOrganizationDetailsDerivedDataParams) => {
  const { t, i18n } = useTranslation("organizations");
  const intlLocale =
    i18n.language === "uk" || i18n.language === "ua" ? "uk-UA" : "en-US";
  const level = organization.level ?? 0;
  const rawRating =
    typeof organization.rating === "object" && organization.rating !== null
      ? organization.rating.value
      : organization.rating;
  const numericRating = Number(rawRating);
  const rating = Number.isFinite(numericRating) ? numericRating : 0;
  const levelCurrent = Math.max(organization.currentProgress ?? 0, 0);
  const levelMax = Math.max(organization.maxProgress ?? 0, 0);
  const levelProgressPercent = Math.min(
    Math.max(organization.progressPercent ?? 0, 0),
    100,
  );
  const levelNext = level + 1;
  const votes =
    typeof organization.rating === "object" && organization.rating !== null
      ? Math.max(organization.rating.totalVotes ?? 0, 0)
      : 0;
  const totalTasks = Math.max(organization.totalTasks ?? 132, 0);
  const activeProjects = Math.max(organization.activeTasks ?? 7, 0);
  const completedProjects = Math.max(totalTasks - activeProjects, 0);
  const description =
    organization.description?.trim() || t("details.labels.descriptionNotAdded");
  const hasLongDescription = Boolean(organization.description?.trim());
  const renderedDescription = description;
  const websiteHref = normalizeOrganizationWebsiteHref(organization.website);
  const contactEmail =
    organization.contactEmail?.trim() || t("details.labels.emailNotAdded");
  const emailHref = contactEmail.includes("@") ? `mailto:${contactEmail}` : null;
  const phoneLabel =
    organization.phoneNumber?.trim() || t("details.labels.notAdded");
  const highlightedMembers = members.slice(0, 7);
  const remainingMembersCount = Math.max(members.length - highlightedMembers.length, 0);

  const memberDirectoryCards = useMemo(
    () =>
      buildMemberDirectoryCards({
        members,
        ownerId: organization.ownerId,
        founderLabel: t("details.labels.founder"),
        volunteerLabel: t("details.labels.volunteer"),
        teamMemberLabel: t("details.labels.teamMember"),
      }),
    [members, organization.ownerId, t],
  );

  return {
    level,
    rating,
    levelCurrent,
    levelMax,
    levelProgressPercent,
    levelNext,
    votes,
    activeProjects,
    completedProjects,
    renderedDescription,
    hasLongDescription,
    websiteHref,
    contactEmail,
    emailHref,
    phoneLabel,
    highlightedMembers,
    remainingMembersCount,
    memberDirectoryCards,
    createdAtLabel: formatDate(
      organization.createdAt,
      intlLocale,
      t("details.labels.notAdded"),
    ),
    launchDateLabel: formatDate(
      organization.launchDate,
      intlLocale,
      t("details.labels.notAdded"),
    ),
  };
};
