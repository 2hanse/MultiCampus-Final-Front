import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatHeader from "../../chat/ChatHeader";
import ChatActions from "../../chat/ChatActions";
import ChatListItem from "../../chat/ChatListItem";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function ChatListPage() {
  const [chatRooms, setChatRooms] = useState([]);
  const userId = 1004; // 예시로 User ID를 하드코딩하였지만, 실제로는 인증 토큰 등을 이용해 가져옴.

  useEffect(() => {
    // STOMP 클라이언트 설정
    const socket = new SockJS("http://localhost:8000/ws");
    const stompClient = Stomp.over(socket);

    // 연결 설정 및 구독
    stompClient.connect({Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDA0LCJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwicm9sZSI6IiIsImlhdCI6MTcyOTY2NDM0NywiZXhwIjoxODE2MDY0MzQ3fQ.bP8T4L31GW0dVKZyRAI3gxMoNoqHZJxn5IhdIHL-6to"}, (frame) => {
      console.log("Connected: " + frame);

      // /sub/chat/room-list/{userId} 구독
      stompClient.subscribe(`/sub/chat/room-list/${userId}`, (message) => {
        const receivedRooms = JSON.parse(message.body);
        setChatRooms(receivedRooms); // 받은 채팅방 리스트를 state에 저장
      });

      stompClient.subscribe(`/sub/chat/room-invite/${userId}`, (message) => {
        stompClient.send(`/pub/chat/list`, {});
      });

      // /pub/chat/list로 채팅방 목록 요청
      stompClient.send(`/pub/chat/list`, {});
    });

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [userId]);

  return (
    <ChatListContainer>
      <ChatListContent>
        <ChatHeader />
        <ChatActions />
      </ChatListContent>
      {chatRooms.length > 0 ? (
        chatRooms.map((room) => (
          <ChatListItem key={room.roomId} room={room} />
        ))
      ) : (
        <p>No Chat Rooms Available</p>
      )}
    </ChatListContainer>
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