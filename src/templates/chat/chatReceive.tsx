import { ChatContent } from '@/types/interface';
export default function ChatRecive({
  chatContent,
}: {
  chatContent: ChatContent;
}) {
  const { content, createAt } = chatContent;

  return (
    <div className="chat-content">
      <div className="chat-bubble recipient">{content}</div>
      <div className="chat-time">{createAt}</div>
    </div>
  );
}
