import { useMemo, useState } from "react";
import type { TFunction } from "i18next";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Ban,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  CircleX,
  ClipboardX,
  Download,
  FileClock,
  LogIn,
  LogOut,
  MapPin,
  QrCode,
  Radio,
  TriangleAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  approveEventAttendance,
  eventKeys,
  eventQuery,
  exportEventAttendance,
  type Event,
  rejectEventAttendance,
  resolveEventAttendance,
  type EventAttendanceManagerRecord,
  type EventAttendanceManagerStatus,
} from "@entities/event";
import { formatDateRange } from "@shared/libs/date";
import { getErrorMessage } from "@shared/libs/error-message";
import { ConfirmationModal } from "@shared/ui/modals";
import {
  canApproveEventAttendance,
  canRejectEventAttendance,
  canResolveEventAttendance,
  type EventPermissionContext,
} from "@widgets/events/details/lib/eventPermissions";
import styles from "./EventAttendanceManagerPage.module.scss";
import { useTranslation } from "react-i18next";

interface EventAttendanceManagerPageLabels {
  eyebrow: string;
  title: string;
  subtitle: string;
  back: string;
  loading: string;
  error: string;
  empty: string;
  user: string;
  checkIn: string;
  checkOut: string;
  minutes: string;
  status: string;
  note: string;
  actions: string;
  export: string;
  allStatuses: string;
  approve: string;
  reject: string;
  resolve: string;
  resolveAsApprove: string;
  resolveAsReject: string;
  commentPlaceholder: string;
  modalTitle: string;
  modalText: string;
  confirm: string;
  cancel: string;
  saved: string;
  failed: string;
  exported: string;
  notProvided: string;
}

interface EventAttendanceManagerPageProps {
  event: Event;
  eventId: string;
  labels: EventAttendanceManagerPageLabels;
  permissionContext?: EventPermissionContext;
  onBack: () => void;
}

type AttendanceAction = "approve" | "reject" | "resolve";
type AttendanceTone =
  | "pending"
  | "disputed"
  | "checkedIn"
  | "approved"
  | "neutral";

interface StatusFilter {
  value: "" | EventAttendanceManagerStatus;
  labelKey: string;
  tone?: AttendanceTone;
}

const statusFilters: StatusFilter[] = [
  {
    value: "",
    labelKey: "event:attendancePage.filters.all",
    tone: "neutral",
  },
  {
    value: "CheckedOutPendingApproval",
    labelKey: "event:attendancePage.filters.pending",
    tone: "pending",
  },
  {
    value: "CheckedIn",
    labelKey: "event:attendancePage.filters.checkedIn",
    tone: "checkedIn",
  },
  {
    value: "Disputed",
    labelKey: "event:attendancePage.filters.disputed",
    tone: "disputed",
  },
  {
    value: "Approved",
    labelKey: "event:attendancePage.filters.approved",
    tone: "approved",
  },
  {
    value: "Rejected",
    labelKey: "event:attendancePage.filters.rejected",
    tone: "neutral",
  },
];

const toneClassNames: Record<AttendanceTone, string> = {
  pending: styles.tonePending,
  disputed: styles.toneDisputed,
  checkedIn: styles.toneCheckedIn,
  approved: styles.toneApproved,
  neutral: styles.toneNeutral,
};

const getAttendanceTone = (
  status?: EventAttendanceManagerRecord["status"],
): AttendanceTone => {
  if (status === "CheckedOutPendingApproval") return "pending";
  if (status === "Disputed") return "disputed";
  if (status === "CheckedIn") return "checkedIn";
  if (status === "Approved" || status === "Resolved") return "approved";
  return "neutral";
};

const getDateKey = (value: string | Date | null | undefined) => {
  if (!value) return "";
  const date = value instanceof Date ? new Date(value) : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

const getRecordDateKey = (record: EventAttendanceManagerRecord) =>
  getDateKey(record.checkInAt ?? record.dateFrom);

const getCalendarDays = (startValue: string, endValue: string) => {
  const start = new Date(startValue);
  const end = new Date(endValue);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const days: Date[] = [];
  const cursor = new Date(start);

  while (cursor <= end && days.length < 366) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
};

const startOfDayUTC = (date: Date) =>
  new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  ).toISOString();

const endOfDayUTC = (date: Date) =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999,
    ),
  ).toISOString();

const getSelectedRange = (date: Date | null) =>
  date
    ? {
        From: startOfDayUTC(date),
        To: endOfDayUTC(date),
      }
    : null;

const formatTime = (
  value: string | null | undefined,
  fallback: string,
  locale: string,
) => {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getRecordUserLabel = (
  record: EventAttendanceManagerRecord,
  fallback: string,
) => record.userName?.trim() || record.userId || fallback;

const getShortUserLabel = (
  record: EventAttendanceManagerRecord,
  fallback: string,
) => {
  const label = getRecordUserLabel(record, fallback);
  if (record.userName?.trim() || label.length <= 12) return label;
  return `${label.slice(0, 12)}\u2026`;
};

const getInitials = (
  record: EventAttendanceManagerRecord,
  fallback: string,
) => {
  const name = record.userName?.trim();
  if (name) {
    return (
      name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "AT"
    );
  }
  return (record.userId || fallback).slice(0, 2).toUpperCase();
};

const getMinutesValue = (record: EventAttendanceManagerRecord) => {
  if (record.status === "CheckedIn" && record.checkInAt) {
    const checkIn = new Date(record.checkInAt);
    if (!Number.isNaN(checkIn.getTime())) {
      return `~${Math.max(
        0,
        Math.floor((Date.now() - checkIn.getTime()) / 60000),
      )}`;
    }
  }
  return record.confirmedMinutes == null
    ? "\u2014"
    : String(record.confirmedMinutes);
};

const getStatusLabel = (
  status: EventAttendanceManagerRecord["status"],
  fallback: string,
  t: TFunction,
) => {
  return status
    ? t(`event:attendance.statuses.${status}`, { defaultValue: status })
    : fallback;
};

const getStatusIcon = (
  status: EventAttendanceManagerRecord["status"],
) => {
  const iconProps = { size: 14, strokeWidth: 2.4 };

  switch (status) {
    case "CheckedIn":
      return <Radio {...iconProps} />;
    case "CheckedOutPendingApproval":
      return <FileClock {...iconProps} />;
    case "Approved":
    case "Resolved":
      return <CheckCircle2 {...iconProps} />;
    case "Rejected":
      return <CircleX {...iconProps} />;
    case "Disputed":
      return <TriangleAlert {...iconProps} />;
    case "Cancelled":
      return <Ban {...iconProps} />;
    default:
      return <CircleDashed {...iconProps} />;
  }
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const EventAttendanceManagerPage = ({
  event,
  eventId,
  labels,
  permissionContext,
  onBack,
}: EventAttendanceManagerPageProps) => {
  const { t, i18n } = useTranslation(["event", "common"]);
  const intlLocale =
    i18n.language === "uk" || i18n.language === "ua" ? "uk-UA" : "en-US";
  const queryClient = useQueryClient();
  const eventDays = useMemo(
    () => getCalendarDays(event.startAt, event.endAt),
    [event.endAt, event.startAt],
  );
  const isMultiDay = eventDays.length > 1;
  const visibleDayColumns = Math.min(eventDays.length, 10);
  const [status, setStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(() =>
    isMultiDay ? (eventDays[0] ?? null) : null,
  );
  const selectedDay = useMemo(
    () => getDateKey(selectedDate),
    [selectedDate],
  );
  const [showAllOther, setShowAllOther] = useState(false);
  const [activeAction, setActiveAction] = useState<{
    type: AttendanceAction;
    record: EventAttendanceManagerRecord;
  } | null>(null);
  const [comment, setComment] = useState("");
  const [resolveApprove, setResolveApprove] = useState(true);
  const canApprove = canApproveEventAttendance(event, permissionContext);
  const canReject = canRejectEventAttendance(event, permissionContext);
  const canResolve = canResolveEventAttendance(event, permissionContext);
  const selectedRange = useMemo(
    () => getSelectedRange(selectedDate),
    [selectedDate],
  );
  const fullAttendanceResult = useQuery(
    eventQuery.attendanceManager(eventId, {
      Page: 1,
      PageSize: 500,
    }),
  );
  const attendanceResult = useQuery(
    eventQuery.attendanceManager(eventId, {
      Page: 1,
      PageSize: 100,
      Status: status || undefined,
      ...selectedRange,
    }),
  );
  const invalidateAttendance = () =>
    queryClient.invalidateQueries({
      queryKey: [...eventKeys.id(eventId), "attendance-manager"],
    });
  const decisionMutation = useMutation({
    mutationFn: async () => {
      if (!activeAction) return null;
      const payload = { comment: comment.trim() };

      if (activeAction.type === "approve") {
        return approveEventAttendance(eventId, activeAction.record.id, payload);
      }

      if (activeAction.type === "reject") {
        return rejectEventAttendance(eventId, activeAction.record.id, payload);
      }

      return resolveEventAttendance(eventId, activeAction.record.id, {
        approveAttendance: resolveApprove,
        resolutionComment: comment.trim() || undefined,
      });
    },
    onSuccess: async () => {
      await invalidateAttendance();
      addToast({ title: labels.saved, color: "success" });
      setActiveAction(null);
      setComment("");
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.failed,
        description: getErrorMessage(error, t),
        color: "danger",
      }),
  });
  const exportMutation = useMutation({
    mutationFn: () => exportEventAttendance(eventId),
    onSuccess: (blob) => {
      downloadBlob(blob, `event-${eventId}-attendance.csv`);
      addToast({ title: labels.exported, color: "success" });
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.failed,
        description: getErrorMessage(error, t),
        color: "danger",
      }),
  });

  const allRecords = useMemo(
    () => fullAttendanceResult.data?.data ?? [],
    [fullAttendanceResult.data?.data],
  );
  const records = useMemo(
    () => attendanceResult.data?.data ?? [],
    [attendanceResult.data?.data],
  );
  const periodRecords = useMemo(
    () =>
      selectedDay
        ? allRecords.filter(
            (record) => getRecordDateKey(record) === selectedDay,
          )
        : allRecords,
    [allRecords, selectedDay],
  );
  const dayStats = useMemo(() => {
    const map = new Map<
      string,
      { count: number; hasPendingApproval: boolean }
    >();
    allRecords.forEach((record) => {
      const key = getRecordDateKey(record);
      if (!key) return;
      const current = map.get(key) ?? {
        count: 0,
        hasPendingApproval: false,
      };
      current.count += 1;
      current.hasPendingApproval =
        current.hasPendingApproval ||
        record.status === "CheckedOutPendingApproval";
      map.set(key, current);
    });
    return map;
  }, [allRecords]);
  const heroStats = useMemo(
    () => [
      {
        label: t("event:attendancePage.hero.total"),
        value: allRecords.length,
        tone: "default",
      },
      {
        label: t("event:attendancePage.hero.pending"),
        value: allRecords.filter(
          (record) => record.status === "CheckedOutPendingApproval",
        ).length,
        tone: "pending",
      },
      {
        label: t("event:attendancePage.hero.disputed"),
        value: allRecords.filter((record) => record.status === "Disputed")
          .length,
        tone: "disputed",
      },
      {
        label: t("event:attendancePage.hero.approved"),
        value: allRecords.filter(
          (record) =>
            record.status === "Approved" || record.status === "Resolved",
        ).length,
        tone: "approved",
      },
    ],
    [allRecords, t],
  );
  const groupedRecords = useMemo(() => {
    const pending = records.filter(
      (record) =>
        record.status === "CheckedOutPendingApproval" ||
        record.status === "Disputed",
    );
    const checkedIn = records.filter(
      (record) => record.status === "CheckedIn",
    );
    const approved = records.filter(
      (record) =>
        record.status === "Approved" || record.status === "Resolved",
    );
    const other = records.filter(
      (record) =>
        record.status === "Rejected" ||
        record.status === "Cancelled" ||
        record.status === "Draft" ||
        !record.status,
    );
    return { pending, checkedIn, approved, other };
  }, [records]);
  const locationLabel = [
    event.locationInfo?.address,
    event.locationInfo?.city,
    event.locationInfo?.country,
  ]
    .filter(Boolean)
    .join(", ");
  const closeActionModal = () => {
    if (decisionMutation.isPending) return;
    setActiveAction(null);
    setComment("");
  };
  const openAction = (
    type: AttendanceAction,
    record: EventAttendanceManagerRecord,
  ) => {
    setActiveAction({ type, record });
    setResolveApprove(true);
    setComment("");
  };
  const getFilterCount = (filter: StatusFilter) =>
    filter.value
      ? periodRecords.filter((record) => record.status === filter.value).length
      : periodRecords.length;
  const renderRecord = (
    record: EventAttendanceManagerRecord,
    index: number,
  ) => {
    const tone = getAttendanceTone(record.status);
    const isPendingApproval =
      record.status === "CheckedOutPendingApproval";
    const isDisputed = record.status === "Disputed";
    const isCheckedIn = record.status === "CheckedIn";
    const hasQr = Boolean(
      record.qrCheckInTokenId || record.qrCheckOutTokenId,
    );

    return (
      <motion.article
        key={record.id}
        className={`${styles.recordCard} ${toneClassNames[tone]}`}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{
          y: -2,
          transition: { duration: 0.22, delay: 0 },
        }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
          delay: index * 0.04,
        }}
      >
        <span className={styles.statusStrip} />
        <div className={styles.recordBody}>
          <span className={styles.avatar}>
            {getInitials(record, labels.notProvided)}
          </span>

          <div className={styles.recordInfo}>
            <div className={styles.recordNameRow}>
              <strong className={styles.recordName}>
                {getShortUserLabel(record, labels.notProvided)}
              </strong>
              {isDisputed ? (
                <span className={styles.disputeTag}>
                  {t("event:attendancePage.record.disputeOpen")}
                </span>
              ) : null}
            </div>
            <div className={styles.timeRow}>
              <span
                className={`${styles.timeChip} ${
                  isCheckedIn ? styles.timeChipLive : ""
                }`}
              >
                <LogIn size={13} strokeWidth={2.3} />
                {formatTime(
                  record.checkInAt,
                  labels.notProvided,
                  intlLocale,
                )}
              </span>
              <ArrowRight
                size={13}
                strokeWidth={2.2}
                className={styles.timeArrow}
              />
              {isCheckedIn ? (
                <span className={styles.liveChip}>
                  <span className={styles.liveDot} />
                  {t("event:attendancePage.record.liveNow")}
                </span>
              ) : record.checkOutAt ? (
                <span className={styles.timeChip}>
                  <LogOut size={13} strokeWidth={2.3} />
                  {formatTime(
                    record.checkOutAt,
                    labels.notProvided,
                    intlLocale,
                  )}
                </span>
              ) : (
                <span className={styles.notCheckedOutChip}>
                  <LogOut size={13} strokeWidth={2.3} />
                  {t("event:attendancePage.record.notCheckedOut")}
                </span>
              )}
              {hasQr ? (
                <span className={styles.qrBadge}>
                  <QrCode size={11} strokeWidth={2.3} />
                  {t("event:attendancePage.record.viaQr")}
                </span>
              ) : null}
            </div>
          </div>

          <div className={styles.minutesBlock}>
            <strong className={isCheckedIn ? styles.minutesLive : ""}>
              {getMinutesValue(record)}
            </strong>
            <span>
              {isCheckedIn
                ? t("event:attendancePage.record.minutesSoFar")
                : t("event:attendancePage.record.minutes")}
            </span>
          </div>

          <span className={styles.statusBadge}>
            {getStatusIcon(record.status)}
            {getStatusLabel(record.status, labels.notProvided, t)}
          </span>

          <div className={styles.recordActions}>
            {isPendingApproval && canApprove ? (
              <button
                type="button"
                className={`${styles.actionButton} ${styles.approveButton}`}
                disabled={decisionMutation.isPending}
                onClick={() => openAction("approve", record)}
              >
                {labels.approve}
              </button>
            ) : null}
            {isPendingApproval && canReject ? (
              <button
                type="button"
                className={`${styles.actionButton} ${styles.rejectButton}`}
                disabled={decisionMutation.isPending}
                onClick={() => openAction("reject", record)}
              >
                {labels.reject}
              </button>
            ) : null}
            {isDisputed && canResolve ? (
              <button
                type="button"
                className={`${styles.actionButton} ${styles.resolveButton}`}
                disabled={decisionMutation.isPending}
                onClick={() => openAction("resolve", record)}
              >
                {labels.resolve}
              </button>
            ) : null}
          </div>
        </div>
      </motion.article>
    );
  };
  const sections = [
    {
      key: "pending",
      title: t("event:attendancePage.sections.pending"),
      records: groupedRecords.pending,
    },
    {
      key: "checked-in",
      title: t("event:attendancePage.sections.checkedIn"),
      records: groupedRecords.checkedIn,
    },
    {
      key: "approved",
      title: t("event:attendancePage.sections.approved"),
      records: groupedRecords.approved,
    },
    {
      key: "other",
      title: t("event:attendancePage.sections.other"),
      records: groupedRecords.other,
    },
  ];

  return (
    <>
      <main className={styles.page}>
        <div className={styles.topRow}>
          <button
            type="button"
            className={styles.backButton}
            aria-label={labels.back}
            onClick={onBack}
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbContext}>{event.title}</span>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbTitle}>
              {t("event:attendancePage.hero.breadcrumb")}
            </span>
          </div>
        </div>

        <section className={styles.heroCard}>
          <span className={styles.heroDecoPrimary} />
          <span className={styles.heroDecoSecondary} />
          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>
                <span />
                {t("event:attendancePage.hero.eyebrow")}
              </div>
              <h1>{event.title}</h1>
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>
                  <CalendarDays size={15} strokeWidth={2.3} />
                  {formatDateRange(
                    event.startAt,
                    event.endAt,
                    i18n.language === "uk" ? "uk" : "en",
                  )}
                </span>
                {locationLabel ? (
                  <span className={styles.metaItem}>
                    <MapPin size={15} strokeWidth={2.3} />
                    {locationLabel}
                  </span>
                ) : null}
                {isMultiDay ? (
                  <span className={styles.durationPill}>
                    {t("event:attendancePage.hero.days", {
                      count: eventDays.length,
                    })}
                  </span>
                ) : null}
              </div>
              {event.attendanceEnabled === false ? (
                <div className={styles.disabledNote}>
                  <AlertCircle size={16} strokeWidth={2.3} />
                  {t("event:attendancePage.hero.disabled")}
                </div>
              ) : null}
            </div>

            <div className={styles.heroStats}>
              {heroStats.map((stat) => (
                <article key={stat.label} className={styles.statTile}>
                  <strong className={styles[`stat_${stat.tone}`]}>
                    {stat.value}
                  </strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {isMultiDay ? (
          <section className={styles.dayPicker}>
            <div className={styles.dayPickerHeader}>
               <strong>{t("event:attendancePage.dayPicker.title")}</strong>
               <span>
                 {t("event:attendancePage.dayPicker.count", {
                   count: eventDays.length,
                 })}
               </span>
            </div>
            <div className={styles.daysScroller}>
              <div
                className={styles.daysGrid}
                style={{
                  gridTemplateColumns: `repeat(${eventDays.length}, minmax(86px, 1fr))`,
                  minWidth:
                    eventDays.length > visibleDayColumns
                      ? `${eventDays.length * 90}px`
                      : undefined,
                }}
              >
                {eventDays.map((day) => {
                  const key = getDateKey(day);
                  const stats = dayStats.get(key);
                  const isActive = selectedDay === key;
                  const isFutureEmpty =
                    day.getTime() > Date.now() && !stats?.count;

                  return (
                    <button
                      key={key}
                      type="button"
                      className={`${styles.dayButton} ${
                        isActive ? styles.dayButtonActive : ""
                      } ${
                        stats?.hasPendingApproval && !isActive
                          ? styles.dayButtonPending
                          : ""
                      } ${isFutureEmpty ? styles.dayButtonDimmed : ""}`}
                      disabled={isFutureEmpty}
                      onClick={() => setSelectedDate(day)}
                    >
                      <span className={styles.dayWeekday}>
                        {day
                          .toLocaleDateString(
                             intlLocale,
                            { weekday: "short" },
                          )
                          .slice(0, 3)}
                      </span>
                      <strong>{day.getDate()}</strong>
                      <span
                        className={`${styles.dayDot} ${
                          stats?.hasPendingApproval
                            ? styles.dayDotPending
                            : ""
                        }`}
                      />
                      <span className={styles.dayCount}>
                         {t("event:attendancePage.records", {
                           count: stats?.count ?? 0,
                         })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <div className={styles.toolbar}>
          <div className={styles.statusFilters}>
            {statusFilters.map((filter) => (
              <button
                key={filter.value || "all"}
                type="button"
                className={`${styles.filterChip} ${
                  status === filter.value ? styles.filterChipActive : ""
                }`}
                onClick={() => setStatus(filter.value)}
              >
                {filter.tone ? (
                  <span
                    className={`${styles.filterDot} ${
                      toneClassNames[filter.tone]
                    }`}
                  />
                ) : null}
                <span>{t(filter.labelKey)}</span>
                <span className={styles.filterCount}>
                  {getFilterCount(filter)}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className={styles.exportButton}
            disabled={exportMutation.isPending}
            onClick={() => exportMutation.mutate()}
          >
            <Download size={16} strokeWidth={2.3} />
             {labels.export}
          </button>
        </div>

        {attendanceResult.isPending ? (
          <div className={styles.statePanel}>{labels.loading}</div>
        ) : null}
        {attendanceResult.isError ? (
          <div className={styles.statePanel}>{labels.error}</div>
        ) : null}
        {!attendanceResult.isPending &&
        !attendanceResult.isError &&
        records.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>
              <ClipboardX size={40} strokeWidth={1.8} />
            </span>
             <strong>{t("event:attendancePage.emptyPeriod.title")}</strong>
             <span>{t("event:attendancePage.emptyPeriod.hint")}</span>
          </div>
        ) : null}

        {!attendanceResult.isPending && !attendanceResult.isError
          ? sections.map((section) => {
              if (section.records.length === 0) return null;
              const visibleRecords =
                section.key === "other" && !showAllOther
                  ? section.records.slice(0, 3)
                  : section.records;

              return (
                <section key={section.key} className={styles.recordsSection}>
                  <div className={styles.sectionHeader}>
                    <strong>{section.title}</strong>
                    <span className={styles.sectionLine} />
                    <span>{section.records.length}</span>
                  </div>
                  <div className={styles.recordsList}>
                    {visibleRecords.map(renderRecord)}
                  </div>
                  {section.key === "other" &&
                  section.records.length > 3 &&
                  !showAllOther ? (
                    <button
                      type="button"
                      className={styles.showMoreButton}
                      onClick={() => setShowAllOther(true)}
                    >
                       {t("event:attendancePage.showMore", {
                         count: section.records.length - 3,
                       })}
                    </button>
                  ) : null}
                </section>
              );
            })
          : null}
      </main>

      <ConfirmationModal
        isOpen={Boolean(activeAction)}
        title={labels.modalTitle}
        text={labels.modalText}
        confirmText={labels.confirm}
        cancelText={labels.cancel}
        isLoading={decisionMutation.isPending}
        onConfirm={() => decisionMutation.mutate()}
        onCancel={closeActionModal}
      >
        {activeAction?.type === "resolve" ? (
          <div className={styles.modalChoiceRow}>
            <button
              type="button"
              className={`${styles.modalChoice} ${
                resolveApprove ? styles.modalChoiceActive : ""
              }`}
              onClick={() => setResolveApprove(true)}
            >
              {labels.resolveAsApprove}
            </button>
            <button
              type="button"
              className={`${styles.modalChoice} ${
                !resolveApprove ? styles.modalChoiceActive : ""
              }`}
              onClick={() => setResolveApprove(false)}
            >
              {labels.resolveAsReject}
            </button>
          </div>
        ) : null}
        <textarea
          className={styles.modalField}
          value={comment}
          placeholder={labels.commentPlaceholder}
          onChange={(event) => setComment(event.target.value)}
        />
      </ConfirmationModal>
    </>
  );
};
