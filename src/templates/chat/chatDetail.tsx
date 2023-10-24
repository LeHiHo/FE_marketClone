'use client';
import '@/styles/templates/chat/chatDetail.scss';
import Header from '@/components/header';
import ChatItem from './chatItem';
import { BiPlus } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { useEffect, useMemo, useState, useRef } from 'react';
import { getChatContents } from '@/api/service';
import { AXIOSResponse, ChatContent } from '@/types/interface';
import * as StompJs from '@stomp/stompjs';
import { useSearchParams, usePathname } from 'next/navigation';
import ChatSend from './chatSend';
import ChatRecive from './chatReceive';

// type ChatContents = ChatContent[]

export default function ChatDetail() {
  const idParams = useSearchParams();
  const strId = idParams.get('productId') || '';
  const productId = parseInt(strId);
  const strUserId = idParams.get('userId') || '';
  const userId = parseInt(strUserId);
  const path = usePathname();
  const roomId = path.split('/')[2];
  const [chatContents, setChatContents] = useState<ChatContent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AXIOSResponse<ChatContent[]> = await getChatContents(roomId);

        const convertedChatContents = res.data.map((chatContent) => {
          const dateObj = new Date(chatContent.createAt);
          if (!isNaN(dateObj.getTime())) {
            chatContent.createAt = dateObj.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            });
          } else {
            console.error('Invalid createAt value:', chatContent.createAt);
            chatContent.createAt = 'Invalid Date';
          }
          return chatContent;
        });

        setChatContents(convertedChatContents);
      } catch (error) {
        console.log('실패', error);
      }
    };

    fetchData();
    connect();
    return () => {
      disconnect();
    };
  }, []);

  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const client = useMemo(
    () =>
      new StompJs.Client({
        brokerURL: process.env.NEXT_PUBLIC_BROKER_URL,
      }),
    [],
  );

  const connect = () => {
    client.onConnect = () => {
      client.subscribe(`/sub/room/${roomId}`, (message) => {
        console.log(`Received: ${message.body}`);
        const newMessage = JSON.parse(message.body);

        const dateObj = new Date(newMessage.dateTime);
        if (!isNaN(dateObj.getTime())) {
          newMessage.createAt = dateObj.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });
        } else {
          console.error('Invalid createAt value:', newMessage.createAt);
          newMessage.createAt = 'Invalid Date';
        }

        setChatContents((prevChatContents) => [
          ...prevChatContents,
          newMessage,
        ]);
      });
    };
    client.activate();
    setConnected(true);
  };

  const disconnect = () => {
    if (client) {
      client.deactivate();
      setConnected(false);
    }
  };

  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [chatContents]);

  const sendMessage = () => {
    if (connected) {
      client.publish({
        destination: `/pub/room/${roomId}`,
        body: JSON.stringify({ userId: userId, content: message }),
      });
      setMessage('');
      console.log(messageEndRef.current);
      // messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('클라이언트가 연결되지 않았습니다.');
      setMessage('');
    }
  };

  return (
    <div id="chat-detail">
      <Header goBack={true} title={chatContents[0]?.nickName} border={true} />

      <div className="chat-detail">
        <ChatItem productId={productId} />
      </div>
      <div className="chat-detail__main">
        {chatContents.map((chatContent, index) =>
          chatContent.userId === userId ? (
            <ChatSend key={index} chatContent={chatContent} />
          ) : (
            <ChatRecive key={index} chatContent={chatContent} />
          ),
        )}
        <div ref={messageEndRef}></div>
      </div>
      <footer className="chat-detail__footer">
        <div>
          <BiPlus size="30" />
          <input
            type="text"
            placeholder="메세지 보내기"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <TbSend onClick={sendMessage} size="25" />
        </div>
      </footer>
    </div>
  );
}
