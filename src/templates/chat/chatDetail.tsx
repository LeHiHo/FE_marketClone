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

interface ChatContents {
  roomId: number | null;
  userId: number | null;
  nickName: string;
  content: string;
  createAt: string;
}

export default function ChatDetail() {
  const [chatContents, setchatContents] = useState<ChatContents>({
    roomId: null,
    userId: null,
    nickName: '',
    content: '',
    createAt: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<ChatContents> = await getChatContents(1);
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
  });

  const showGreeting = (message: any) => {
    console.log('Received:', message);
  };

  client.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    client.subscribe('/topic/greetings', (greeting) => {
      showGreeting(JSON.parse(greeting.body).content);
    });
  };

  const connect = () => {
    client.activate();
    console.log('연결됨');
  };

  const disconnect = () => {
    if (client) {
      client.deactivate();
      setConnected(false);
      console.log('연결해제됨');
    }
  };

  return (
    <div id="chat-detail">
      <Header goBack={true} title="닉네임" border={true} />

      <div className="chat-detail">
        <ChatItem />
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
          <TbSend size="25" />
        </div>
      </footer>
    </div>
  );
}
