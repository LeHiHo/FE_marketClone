'use client';

import { getMyChatList, getProductChatList } from '@/api/service';
import Header from '@/components/header';
import '@/styles/templates/chat/chats.scss';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Chats() {
  const [chats, setChats] = useState([]);
  console.log(chats);

  const path = usePathname();
  const id: number | null = parseInt(path.split('/')[2]) || null;

  useEffect(() => {
    const fetchData = async () => {
      const res = id ? await getProductChatList(id) : await getMyChatList();
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

  console.log(chats);

  return (
    <>
      <header>
        <Header
          goBack={true}
          border={true}
          title={id ? '이 상품 관련 채팅목록' : '채팅목록'}
        />
      </header>

      <div id="chat-list">
        <div className="chat-list">
          <div>
            <img
              className="chat-list__profile"
              src="/svg/default_profile.png"
              alt="profile"
            />
          </div>
          <div className="chat-list__content">
            <div className="chat-list__desc">
              <span>닉네임</span>
              <span> | </span>
              <span>장소</span>
            </div>
            <p>마지막 채팅 내용</p>
          </div>
          <div className="chat-list__thumnail">
            <img src="/svg/cat.jpg" alt="thumnail" />
          </div>
        </div>
      </div>
    </>
  );
}
