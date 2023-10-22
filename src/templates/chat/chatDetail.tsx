'use client';
import '@/styles/templates/chat/chatDetail.scss';
import Header from '@/components/header';
import ChatItem from './chatItem';
import { BiPlus } from 'react-icons/bi';
import { TbSend } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { getChatContents } from '@/api/service';
import { AXIOSResponse } from '@/types/interface';
import * as StompJs from '@stomp/stompjs';
import { useSearchParams, usePathname } from 'next/navigation';

interface ChatContents {
  roomId: number | null;
  userId: number | null;
  nickName: string;
  content: string;
  createAt: string;
}

export default function ChatDetail() {
  const idParams = useSearchParams();
  const strId = idParams.get('productId') || '';
  const productId = parseInt(strId);
  const path = usePathname();
  const roomId = path.split('/')[2];
  const [chatContents, setchatContents] = useState<ChatContents>({
    roomId: null,
    userId: null,
    nickName: '',
    content: '',
    createAt: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<ChatContents> = await getChatContents(roomId);
      if (res.statusCode === 200) {
        setchatContents(res.data);
      } else {
        console.log('실패');
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

  const client = new StompJs.Client({
    brokerURL: process.env.NEXT_PUBLIC_BROKER_URL,
    onConnect: () => {
      setConnected(true);
    },
  });

  const connect = () => {
    client.activate();
    const callback = function () {
      console.log('콜백함수임');
    };
    client.subscribe(`/sub/room/${roomId}`, callback);
  };

  const disconnect = () => {
    if (client) {
      client.deactivate();
      setConnected(false);
    }
  };

  const sendMessage = () => {
    console.log('메시지보내기');
    console.log(client, connected);
    if (client && connected) {
      console.log('if문 들어옴');
      client.publish({
        destination: `/pub/room/${roomId}`,
        body: 'hi',
      });
      console.log('메시지 보냄');
    } else {
      console.error('클라이언트가 연결되지 않았습니다.');
      setMessage('');
    }
  };

  return (
    <div id="chat-detail">
      <Header goBack={true} title="닉네임" border={true} />

      <div className="chat-detail">
        <ChatItem productId={productId} />
      </div>
      <div className="chat-detail__main">{chatContents.content}</div>
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
