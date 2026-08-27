import type { Message } from "../../../model";
import styles from "./SystemMessageItem.module.scss";

interface SystemMessageItemProps {
  message: Message;
}

export const SystemMessageItem = ({ message }: SystemMessageItemProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.message}>{message.message}</span>
    </div>
  );
};
