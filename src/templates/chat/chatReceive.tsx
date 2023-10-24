import { ChatContent } from '@/types/interface';
export default function ChatRecive({
  chatContent,
}: {
  chatContent: ChatContent;
}) {
  const { content } = chatContent;
  return (
    <div className="chat-content">
      <div className="chat-bubble recipient">{content}</div>
    </div>
  );
}
