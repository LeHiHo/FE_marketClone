'use client';

import { getMyChatList, getProductChatList, getMyInfo } from '@/api/service';
import Header from '@/components/header';
import '@/styles/templates/chat/chats.scss';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AXIOSResponse } from '@/types/interface';

type ChatList = {
  chatRoomId: number;
  buyerId: number;
  nickName: string;
  buyerProfileImg: string;
  productId: number;
  productImage: string;
  lastMessage: string;
  lastCreatedAt: string;
}[];

type MyChatList = {
  chatRoomId: number;
  productId: number;
  productImage: string;
  productStatus: string;
  personId: number;
  personNickname: string;
  personProfileImage: string;
  lastMessage: string;
  lastChattedAt: string;
}[];

export default function Chats() {
  const router = useRouter();
  const [isMyChats, setIsMyChats] = useState<boolean>(false);
  const [chats, setChats] = useState<ChatList>([
    {
      chatRoomId: 0,
      buyerId: 0,
      nickName: '',
      buyerProfileImg: '',
      productId: 0,
      productImage: '',
      lastMessage: '',
      lastCreatedAt: '',
    },
  ]);

  const [myChats, setMyChats] = useState<MyChatList>([
    {
      chatRoomId: 0,
      productId: 0,
      productImage: '',
      productStatus: '',
      personId: 0,
      personNickname: '',
      personProfileImage: '',
      lastMessage: '',
      lastChattedAt: '',
    },
  ]);
  const [myId, setMyId] = useState<number>();
  const path = usePathname();
  const id: number | null = parseInt(path.split('/')[2]) || null;
  useEffect(() => {
    const fetchData = async () => {
      const my = await getMyInfo();
      setMyId(my.data.id);
      try {
        if (id) {
          const res: AXIOSResponse<ChatList> = await getProductChatList(id);
          if (res.statusCode === 200) {
            setChats(
              res.data.sort(
                (a, b) =>
                  new Date(b.lastCreatedAt).getTime() -
                  new Date(a.lastCreatedAt).getTime(),
              ),
            );
          } else {
            console.log(res);
          }
        } else {
          const res: AXIOSResponse<MyChatList> = await getMyChatList();
          if (res.statusCode === 200) {
            setMyChats(
              res.data.sort(
                (a, b) =>
                  new Date(b.lastChattedAt).getTime() -
                  new Date(a.lastChattedAt).getTime(),
              ),
            );
            setIsMyChats(true);
          } else {
            console.log(res);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      setChats([]);
      setMyChats([]);
      setIsMyChats(false);
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

      {isMyChats
        ? myChats.map((chat, index) => {
            return (
              <div
                onClick={() =>
                  router.push(
                    `/chat/${chat.chatRoomId}?productId=${chat.productId}&userId=${myId}&nickName=${chat.personNickname}`,
                  )
                }
                key={index}
                id="chat-list">
                <div className="chat-list">
                  <div>
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
                      </div>
                      <p>{chat.lastMessage}</p>
                    </div>
                  </div>

                  <div className="chat-list__thumnail">
                    <img src={chat.productImage} alt="thumnail" />
                  </div>
                </div>
              </div>
            );
          })
        : chats.map((chat, index) => (
            <div
              onClick={() =>
                router.push(
                  `/chat/${chat.chatRoomId}?productId=${chat.productId}&userId=${myId}&nickName=${chat.nickName}`,
                )
              }
              key={index}
              id="chat-list">
              <div className="chat-list">
                <div>
                  <div>
                    <img
                      className="chat-list__profile"
                      src={chat.buyerProfileImg}
                      alt="profile"
                    />
                  </div>
                  <div className="chat-list__content">
                    <div className="chat-list__desc">
                      <span>{chat.nickName}</span>
                    </div>
                    <p>{chat.lastMessage}</p>
                  </div>
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
