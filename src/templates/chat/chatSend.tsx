import { ChatContent } from '@/types/interface';

export default function ChatSend({
  chatContent,
}: {
  chatContent: ChatContent;
}) {
  const { content, createAt } = chatContent;

  return (
    <div className="chat-content send">
      <div className="chat-time">{createAt}</div>
      <div className="chat-bubble sender">{content}</div>
    </div>
  );
}
