'use client';
import '@/styles/templates/chat/chatDetail.scss';
import Header from '@/components/header';
import ChatItem from '@/templates/chat/chatItem';
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
  }, []);

  const client = new StompJs.Client({
    brokerURL: process.env.NEXT_PUBLIC_BROKER_URL,
  });

  client.onConnect = (frame) => {
    // setConnected(true);
    console.log('Connected: ' + frame);
    client.subscribe(`/sub/room/${chatContents.roomId}`, (greeting) => {
      console.log(greeting);
      // showGreeting(JSON.parse(greeting.body).content);
    });
  };

  return (
    <div id="chat-detail">
      <Header goBack={true} title="닉네임" border={true} />

      <div className="chat-detail">
        <ChatItem />
      </div>

      <div className="chat-detail__main">
        <div>채팅1</div>
        <div>채팅2</div>
        <div>채팅3</div>
        <div>채팅4</div>
      </div>

      <footer className="chat-detail__footer">
        <div>
          <BiPlus size="30" />
          <input type="text" placeholder="메세지 보내기" />
          <TbSend size="25" />
        </div>
      </footer>
    </div>
  );
}
