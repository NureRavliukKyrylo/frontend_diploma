import { Calendar, MapIcon, TimeIcon } from "@shared/assets/icons/info";
import styles from "./OfferCalendarDetail.module.scss";
import { formatDateToText, formatHourTime } from "@shared/libs/date";
import type { Offer } from "@entities/offer/model";
import { useTranslation } from "react-i18next";

interface OfferCalendarDetailProps {
  offer: Offer;
}

export const OfferCalendarDetail = ({ offer }: OfferCalendarDetailProps) => {
  const { t, i18n } = useTranslation(["timeBank"]);

  return (
    <>
      <div className={styles.middleContent}>
        <div className={styles.baseInfo}>
          <div className={styles.subBaseInfoBlock}>
            <Calendar />
            <div className={styles.calendarDivider} />
            <span className={styles.calendarInfo}>
              {formatDateToText(
                new Date(offer.startAt).toISOString(),
                i18n.language as "en" | "ua",
              )}
            </span>
          </div>
          <div className={styles.subBaseInfoBlock}>
            <MapIcon className={styles.mapIcon} />
            <div className={styles.divider} />
            <span className={styles.info}>{offer.locationInfo?.address}</span>
          </div>
          <div className={styles.subBaseInfoBlock}>
            <TimeIcon className={styles.timeIcon} />
            <div className={styles.divider} />
            <span className={styles.info}>
              {formatHourTime(offer.startAt, i18n.language as "en" | "ua") ??
                t("timeBank:offers.detail.allTime")}
            </span>
          </div>
        </div>
        <div className={styles.descriptionInfo}>
          <h1>{t("timeBank:offers.detail.about")}</h1>
          <p>{offer.description}</p>
        </div>
      </div>
    </>
  );
};
