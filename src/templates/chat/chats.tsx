'use client';

import { getMyChatList, getProductChatList } from '@/api/service';
import Header from '@/components/header';
import '@/styles/templates/chat/chats.scss';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AXIOSResponse } from '@/types/interface';

type ChatList = {
  chatRoomId: number;
  lastChattedAt: string;
  lastMessage: string;
  personId: number;
  personNickname: string;
  personProfileImage: string;
  productId: number;
  productImage: string;
  productStatus: string;
}[];

export default function Chats() {
  const router = useRouter();

  const [chats, setChats] = useState<ChatList>([
    {
      chatRoomId: 0,
      lastChattedAt: '',
      lastMessage: '',
      personId: 0,
      personNickname: '',
      personProfileImage: '',
      productId: 0,
      productImage: '',
      productStatus: '',
    },
  ]);

  const path = usePathname();
  const id: number | null = parseInt(path.split('/')[2]) || null;
  useEffect(() => {
    const fetchData = async () => {
      const res: AXIOSResponse<ChatList> = id
        ? await getProductChatList(id)
        : await getMyChatList();
      try {
        if (res.statusCode === 200) {
          setChats(res.data);
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      setChats([]);
    };
  }, []);

  return (
    <>
      <header>
        <Header
          goBack={true}
          border={true}
          title={id ? '이 상품 관련 채팅목록' : '채팅목록'}
        />
      </header>

      {chats.map((chat, index) => (
        <div
          onClick={() =>
            router.push(
              `/chat/${chat.chatRoomId}?productId=${chat.productId}&userId=${chat.personId}`,
            )
          }
          key={index}
          id="chat-list">
          <div className="chat-list">
            <div>
              <img
                className="chat-list__profile"
                src={chat.personProfileImage}
                alt="profile"
              />
            </div>
            <div className="chat-list__content">
              <div className="chat-list__desc">
                <span>{chat.personNickname}</span>
                <span> | </span>
                <span>장소</span>
              </div>
              <p>{chat.lastMessage}</p>
            </div>
            <div className="chat-list__thumnail">
              <img src={chat.productImage} alt="thumnail" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
