import { MessageItemSkeleton } from "@entities/chat";

export const MessagesListSkeleton = ({ className }: { className: string }) => {
  const pattern = [
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
  ];

  return (
    <div className={className}>
      {pattern.map((isMine, index) => (
        <MessageItemSkeleton key={index} isMine={isMine} />
      ))}
    </div>
  );
};
