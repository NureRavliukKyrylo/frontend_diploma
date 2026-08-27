import {
  badgesKeys,
  createAdminBadge,
  updateAdminBadge,
  uploadAdminBadgeIcon,
  type AdminBadgeDetails,
  type AdminBadgeListItem,
  type BadgeCreatePayload,
  type BadgeScopeEntityType,
} from "@entities/badge";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  badgeIconMaxSize,
  getBadgeFormSchema,
  getInitialBadgeValues,
  toBadgeRankPayload,
  toBadgeRulesPayload,
  toUtcIsoString,
  type BadgeFormValues,
} from "../libs/badgeFormSchema";
import { badgePlaceholderIcon } from "../../lib/badgeCardAdapter";

interface UseBadgeFormParams {
  mode: "create" | "edit";
  badge?: AdminBadgeDetails | AdminBadgeListItem | null;
  onSuccess: () => void;
}

const buildLocalizedValue = (uk: string, en: string) => {
  const trimmedUk = uk.trim();
  const trimmedEn = en.trim();

  if (!trimmedUk && !trimmedEn) {
    return null;
  }

  return {
    uk: trimmedUk || null,
    en: trimmedEn || null,
  };
};

const pendingBadgeIconUrl = "pending";

export const useBadgeForm = ({
  mode,
  badge,
  onSuccess,
}: UseBadgeFormParams) => {
  const { t } = useTranslation("admin");
  const queryClient = useQueryClient();
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconError, setIconError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (values: BadgeFormValues) => {
      const selectedIconFile = values.iconFile ?? iconFile;

      if (mode === "create" && !selectedIconFile) {
        throw new Error(t("badges.form.iconRequired"));
      }

      const scopeEntityType =
        values.scopeEntityType === "platform"
          ? null
          : (values.scopeEntityType as BadgeScopeEntityType);
      const payload: BadgeCreatePayload = {
        title: values.title.trim(),
        description: values.description.trim() || null,
        titleLocalized: buildLocalizedValue(
          values.titleLocalizedUk,
          values.titleLocalizedEn,
        ),
        descriptionLocalized: buildLocalizedValue(
          values.descriptionLocalizedUk,
          values.descriptionLocalizedEn,
        ),
        rank: toBadgeRankPayload(values.rank),
        iconUrl: values.iconUrl || badge?.iconUrl || pendingBadgeIconUrl,
        scopeEntityType,
        scopeEntityId: scopeEntityType ? values.scopeEntityId.trim() : null,
        availableFromUtc: toUtcIsoString(values.availableFromUtc),
        availableToUtc: toUtcIsoString(values.availableToUtc),
        autoAwardEnabled: values.autoAwardEnabled,
        isRequestable: values.isRequestable,
        rules: toBadgeRulesPayload(values.rules),
      };

      if (mode === "create") {
        const created = await createAdminBadge({
          ...payload,
          iconUrl: values.iconUrl || pendingBadgeIconUrl,
        });

        if (selectedIconFile) {
          try {
            await uploadAdminBadgeIcon(created.id, selectedIconFile);
          } catch {
            addToast({
              title: t("badges.form.iconUploadWarning"),
              color: "warning",
            });
          }
        }

        return created.id;
      }

      if (!badge) {
        throw new Error(t("badges.form.notSelected"));
      }

      let resolvedIconUrl = values.iconUrl || badge.iconUrl || badgePlaceholderIcon;

      if (selectedIconFile) {
        const uploadResult = await uploadAdminBadgeIcon(
          badge.id,
          selectedIconFile,
        );
        resolvedIconUrl = uploadResult.iconUrl || resolvedIconUrl;
      }

      await updateAdminBadge(badge.id, {
        ...payload,
        iconUrl: resolvedIconUrl,
        isArchived: values.isArchived,
      });

      return badge.id;
    },
    onSuccess: async (id) => {
      await queryClient.invalidateQueries({ queryKey: badgesKeys.all() });
      await queryClient.invalidateQueries({ queryKey: badgesKeys.adminDetails(id) });
      addToast({
        title:
          mode === "create"
            ? t("badges.form.created")
            : t("badges.form.updated"),
        color: "success",
      });
      onSuccess();
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      addToast({ title: message, color: "danger" });
    },
  });

  const formik = useFormik<BadgeFormValues>({
    initialValues: getInitialBadgeValues(badge),
    validationSchema: getBadgeFormSchema(t, mode),
    enableReinitialize: true,
    onSubmit: (values) => mutation.mutate(values),
  });

  useEffect(() => {
    setIconFile(null);
    setIconPreview(badge?.iconUrl ?? null);
    setIconError(null);
  }, [badge?.id, badge?.iconUrl, mode]);

  const selectIcon = (file: File | null) => {
    setIconError(null);

    if (!file) {
      setIconFile(null);
      setIconPreview(badge?.iconUrl ?? null);
      formik.setFieldValue("iconFile", null);
      formik.setFieldValue("iconUrl", badge?.iconUrl ?? "");
      return;
    }

    if (file.size > badgeIconMaxSize) {
      setIconError(t("badges.form.fileTooLarge"));
      setIconFile(null);
      formik.setFieldValue("iconFile", null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setIconError(t("badges.form.imageOnly"));
      setIconFile(null);
      formik.setFieldValue("iconFile", null);
      return;
    }

    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
    formik.setFieldValue("iconFile", file);
  };

  return {
    formik,
    iconError:
      iconError ??
      (formik.submitCount > 0 && formik.errors.iconFile
        ? String(formik.errors.iconFile)
        : null),
    iconPreview,
    isSubmitting: mutation.isPending,
    selectIcon,
    submitError: mutation.isError ? getErrorMessage(mutation.error) : null,
  };
};
