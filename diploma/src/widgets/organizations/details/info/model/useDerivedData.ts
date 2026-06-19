import { useMemo } from "react";
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
  const level = organization.level ?? 13;
  const rawRating =
    typeof organization.rating === "object" && organization.rating !== null
      ? organization.rating.value
      : organization.rating;
  const numericRating = Number(rawRating);
  const rating = Number.isFinite(numericRating) ? numericRating : 4.5;
  const levelCurrent = Math.min(Math.max(organization.activeTasks ?? 25, 0), 100);
  const levelNext = level + 1;
  const votes = Math.max(members.length * 12, 120);
  const totalTasks = Math.max(organization.totalTasks ?? 132, 0);
  const activeProjects = Math.max(organization.activeTasks ?? 7, 0);
  const completedProjects = Math.max(totalTasks - activeProjects, 0);
  const description = organization.description?.trim() || "Description not added yet";
  const hasLongDescription = Boolean(organization.description?.trim());
  const renderedDescription = description;
  const websiteHref = normalizeOrganizationWebsiteHref(organization.website);
  const contactEmail = organization.contactEmail?.trim() || "Email not added yet";
  const emailHref = contactEmail.includes("@") ? `mailto:${contactEmail}` : null;
  const phoneLabel = organization.phoneNumber?.trim() || "Not added yet";
  const highlightedMembers = members.slice(0, 7);
  const remainingMembersCount = Math.max(members.length - highlightedMembers.length, 0);

  const memberDirectoryCards = useMemo(
    () =>
      buildMemberDirectoryCards({
        members,
        ownerId: organization.ownerId,
      }),
    [members, organization.ownerId],
  );

  return {
    level,
    rating,
    levelCurrent,
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
    createdAtLabel: formatDate(organization.createdAt),
    launchDateLabel: formatDate(organization.launchDate),
  };
};
