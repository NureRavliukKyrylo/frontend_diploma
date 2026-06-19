import { useState } from "react";
import { useEventSettingsForm } from "@features/event";
import { EventSettingsModals } from "./components/EventSettingsModals";
import { EventSidebarCard } from "./components/EventSidebarCard";
import { EventSettingsTabContent } from "./components/EventSettingsTabContent";
import { EventSettingsTopBar } from "./components/EventSettingsTopBar";
import { EventTabSwitcher } from "./components/EventTabSwitcher";
import { StatePanel } from "./components/StatePanel";
import type { ActiveTab } from "./config/settingsTabs";
import styles from "./SettingsWidget.module.scss";

interface EventSettingsWidgetProps {
  eventId: string;
}

export const EventSettingsWidget = ({ eventId }: EventSettingsWidgetProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("general");
  const form = useEventSettingsForm(eventId);
  const {
    event,
    eventStatus,
    values,
    lockState,
    isLoading,
    isError,
    canEditEvent,
    isSaveModalOpen,
    isCancelModalOpen,
    cancelReason,
    pendingPolicyChange,
    isSavePending,
    isCancelPending,
    handlePolicyConfirm,
    handleDiscard,
    handleSave,
    handleSaveConfirm,
    navigateToEvent,
    setIsSaveModalOpen,
    setIsCancelModalOpen,
    setCancelReason,
    setPendingPolicyChange,
    cancelEvent,
  } = form;

  if (isLoading) {
    return (
      <StatePanel
        title="Loading event settings"
        text="Fetching the latest event details."
      />
    );
  }

  if (isError || !event || !values) {
    return (
      <StatePanel
        title="Event unavailable"
        text="We could not load this event settings page."
        action={
          <button
            type="button"
            className={styles.stateButton}
            onClick={navigateToEvent}
          >
            Back to event
          </button>
        }
      />
    );
  }

  if (!canEditEvent) {
    return (
      <StatePanel
        title="You do not have access"
        text="Event settings require the event.content_manage permission."
        action={
          <button
            type="button"
            className={styles.stateButton}
            onClick={navigateToEvent}
          >
            Back to event
          </button>
        }
      />
    );
  }

  return (
    <>
      <EventSettingsTopBar
        title={event.title}
        isSavePending={isSavePending}
        onBack={navigateToEvent}
        onDiscard={handleDiscard}
        onSave={handleSave}
      />

      <div className={styles.layout}>
        <EventSidebarCard event={event} eventStatus={eventStatus} />

        <main className={styles.mainPanel}>
          {lockState.message ? (
            <div className={styles.lockBanner}>{lockState.message}</div>
          ) : null}

          <EventTabSwitcher activeTab={activeTab} onChange={setActiveTab} />
          <EventSettingsTabContent activeTab={activeTab} form={form} />
        </main>
      </div>

      <EventSettingsModals
        isSaveModalOpen={isSaveModalOpen}
        isCancelModalOpen={isCancelModalOpen}
        cancelReason={cancelReason}
        hasPendingPolicyChange={Boolean(pendingPolicyChange)}
        isSavePending={isSavePending}
        isCancelPending={isCancelPending}
        onSaveConfirm={handleSaveConfirm}
        onSaveCancel={() => setIsSaveModalOpen(false)}
        onPolicyConfirm={handlePolicyConfirm}
        onPolicyCancel={() => setPendingPolicyChange(null)}
        onCancelModalClose={() => setIsCancelModalOpen(false)}
        onCancelReasonChange={setCancelReason}
        onCancelEvent={() => cancelEvent()}
      />
    </>
  );
};
