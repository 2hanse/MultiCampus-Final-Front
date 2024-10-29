import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatHeader from "../../chat/ChatHeader";
import ChatActions from "../../chat/ChatActions";
import ChatListItem from "../../chat/ChatListItem";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../../api/jwt";

function ChatListPage() {
  const localUserId = getUserIdFromToken(); // userId를 동적으로 가져옴
  const [chatRooms, setChatRooms] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localUserId) {
      console.error("User ID not found in token");
      return;
    }

    // STOMP 클라이언트 설정
    const socket = new SockJS("http://localhost:8000/ws");
    const stomp = Stomp.over(socket);

    // 연결 설정 및 구독
    stomp.connect(
      {Authorization: `Bearer ${localStorage.getItem('token')}`},
      (frame) => {
        console.log("Connected: " + frame);

        // /sub/chat/room/list/{userId} 구독
        stomp.subscribe(`/sub/chat/room/list/${localUserId}`, (message) => {
          const receivedRooms = JSON.parse(message.body);
          console.log(receivedRooms);
          setChatRooms(receivedRooms); // 받은 채팅방 리스트를 state에 저장
        });

        stomp.subscribe(`/sub/chat/room/refresh/${localUserId}`, (message) => {
          console.log('refreshed');
          stomp.send(`/pub/chat/room/list`);
        });

        // /pub/chat/list로 채팅방 목록 요청
        stomp.send(`/pub/chat/room/list`, {});
      }
    );

    setStompClient(stomp);

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stomp) {
        stomp.disconnect();
      }
    };
  }, [localUserId]);

  const handleRoomClick = (room) => {
    navigate(`/user/chat/room`, {state: { room }});
  };

  return (
    <div>
    <ChatListContainer>
      <ChatListContent>
        <ChatHeader title="채팅 목록" />
        <ChatActions />
      </ChatListContent>
    </ChatListContainer>
      {chatRooms.length > 0 ? (
        chatRooms.map((room) => (
          <ChatListItem key={room.roomId}
                        room={room}
                        userId={localUserId}
                        stompClient={stompClient}
                        onClick={() => handleRoomClick(room)} />
        ))
      ) : (
        <p>No Chat Rooms Available</p>
      )}
    </div>

  );
}

const ChatListContainer = styled.section`
  background-color: #ffd966;
  width: 100%;
  padding: 62px 26px 25px;
`;

const ChatListContent = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
`;

export default ChatListPage;