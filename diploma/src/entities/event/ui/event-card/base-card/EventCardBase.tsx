import type { ReactNode } from "react";
import styles from "./EventCardBase.module.scss";
import type { Event } from "../../../model";
import { DefaultAvatar } from "@shared/assets/images/user";

interface EventCardBaseProps {
  event: Event;
  bottomContent?: ReactNode;
  topContent?: ReactNode;
}

export const EventCardBase = ({
  event,
  bottomContent,
  topContent,
}: EventCardBaseProps) => (
  <>
    <div className={styles.organizationInfoBlock}>
      <img
        className={styles.imageOrganization}
        src={event.organization?.logoUrl ?? DefaultAvatar}
        alt="image organization"
      />
      <h1>{event.organization?.name ?? "Unknown Organization"}</h1>
    </div>
    {topContent}
    <div className={styles.eventInfoBlock}>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
    </div>
    {bottomContent}
  </>
);
