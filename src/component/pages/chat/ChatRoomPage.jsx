import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatHeader from "../../chat/ChatHeader";
import ChatActions from "../../chat/ChatActions";
import ChatListItem from "../../chat/ChatListItem";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserListItem from "../../chat/user/UserListItem";


function ChatRoomPage() {
    const localUserId = 1004; // 예시로 User ID를 하드코딩하였지만, 실제로는 인증 토큰 등을 이용해 가져옴.
    const {roomId} = useParams();
    const [stompClient, setStompClient] = useState(null);
    
    useEffect(() => {
        // STOMP 클라이언트 설정
        const socket = new SockJS("http://localhost:8000/ws");
        const stomp = Stomp.over(socket);

        // 연결 설정 및 구독
        stomp.connect(
            { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDA0LCJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwicm9sZSI6IiIsImlhdCI6MTcyOTY2NDM0NywiZXhwIjoxODE2MDY0MzQ3fQ.bP8T4L31GW0dVKZyRAI3gxMoNoqHZJxn5IhdIHL-6to" },
            (frame) => {
                console.log("Connected: " + frame);

                // /sub/chat/room/list/{userId} 구독
                stomp.subscribe(`/sub/chat/search/${localUserId}`, (message) => {
                    const receivedUsers = JSON.parse(message.body);
                    console.log(receivedUsers);
                });
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

    return (
        <div>
            <ChatListContainer>
                <ChatListContent>
                    <ChatHeader title={"대화방" + roomId} />
                </ChatListContent>
            </ChatListContainer >
            <Container>
               
            </Container>
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

const Container = styled.main`
  display: flex;
  margin-top: 22px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  color: #000;
  padding: 0 28px;
  font: 400 18px Inter, sans-serif;
`;


export default ChatRoomPage;