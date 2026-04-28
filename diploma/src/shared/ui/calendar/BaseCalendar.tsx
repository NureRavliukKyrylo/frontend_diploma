import FullCalendar from "@fullcalendar/react";
import type { CalendarOptions } from "@fullcalendar/core";
import styles from "./BaseCalendar.module.scss";
import { useRef } from "react";

export const BaseCalendar = (props: CalendarOptions) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={wrapperRef} className={styles.calendarWrapper}>
      <FullCalendar
        expandRows={true}
        height={"auto"}
        viewDidMount={(info) => {
          wrapperRef.current?.setAttribute("data-view", info.view.type);
        }}
        {...props}
      />
    </div>
  );
};
