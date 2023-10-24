import { ChatContent } from '@/types/interface';

export default function ChatSend({
  chatContent,
}: {
  chatContent: ChatContent;
}) {
  const { content } = chatContent;
  return (
    <div className="chat-content">
      <div className="chat-bubble sender">{content}</div>
    </div>
  );
}
