'use client';
import '@/styles/templates/chat/chatDetail.scss';
import Header from '@/components/header';
import ChatItem from './chatItem';
import { BiPlus } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { useEffect, useMemo, useState } from 'react';
import { getChatContents } from '@/api/service';
import { AXIOSResponse } from '@/types/interface';
import * as StompJs from '@stomp/stompjs';
import { useSearchParams, usePathname } from 'next/navigation';

type ChatContents = {
  roomId: number | null;
  userId: number | null;
  nickName: string;
  content: string;
  createAt: string;
}[];

export default function ChatDetail() {
  const idParams = useSearchParams();
  const strId = idParams.get('productId') || '';
  const productId = parseInt(strId);
  const userId = idParams.get('userId');
  const path = usePathname();
  const roomId = path.split('/')[2];
  const [chatContents, setChatContents] = useState<ChatContents>([
    {
      roomId: null,
      userId: null,
      nickName: '',
      content: '',
      createAt: '',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AXIOSResponse<ChatContents> = await getChatContents(roomId);
        console.log(res.data);
        setChatContents(res.data);
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

  const connect = () => {
    setConnected(true);
  };

  const disconnect = () => {
    if (client) {
      client.deactivate();
      setConnected(false);
    }
  };

  const client = useMemo(
    () =>
      new StompJs.Client({
        brokerURL: process.env.NEXT_PUBLIC_BROKER_URL,
      }),
    [],
  );

  const sendMessage = () => {
    if (connected) {
      console.log(message);
      client.onConnect = () => {
        client.subscribe(`/sub/room/${roomId}`, (message) =>
          console.log(`Received: ${message.body}`),
        );
        client.publish({
          destination: `/pub/room/${roomId}`,
          body: JSON.stringify({ userId: userId, content: message }),
        });
      };
      client.activate();
      setMessage('');
    } else {
      console.error('클라이언트가 연결되지 않았습니다.');
      setMessage('');
    }
  };

  return (
    <div id="chat-detail">
      <Header goBack={true} title={chatContents[0].nickName} border={true} />

      <div className="chat-detail">
        <ChatItem productId={productId} />
      </div>
      <div className="chat-detail__main">
        {chatContents.map((chat, index) => {
          return <div key={index}>{chat.content}</div>;
        })}
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
