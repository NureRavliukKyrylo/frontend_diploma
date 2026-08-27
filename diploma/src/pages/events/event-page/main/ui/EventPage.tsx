import { useTranslation } from "react-i18next";
import { getEventMainTabs } from "../config/eventMainTabs";
import { useEventPage } from "../model/useEventPage";
import { EventFab } from "@widgets/events";
import { EventHeader } from "./event-page/EventHeader";
import { EventTabsContent } from "./event-page/EventTabsContent";
import styles from "./EventPage.module.scss";

export const EventPage = () => {
  const { t } = useTranslation(["event", "common"]);
  const { tab, event, policyConfig, forms, handleTabChange } = useEventPage();
  const localizedTabs = getEventMainTabs(t);

  return (
    <div className={styles.wrapperEventPage}>
      <EventHeader event={event} policyConfig={policyConfig} />
      <EventTabsContent
        tabs={localizedTabs}
        activeTab={tab}
        forms={forms}
        onTabChange={handleTabChange}
      />
      <EventFab
        eventId={event.id}
        event={event}
        activeTab={tab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};
