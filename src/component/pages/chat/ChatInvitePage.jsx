import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatHeader from "../../chat/ChatHeader";
import ChatActions from "../../chat/ChatActions";
import ChatListItem from "../../chat/ChatListItem";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useLocation } from "react-router-dom";
import UserListItem from "../../chat/user/UserListItem";

const mockContacts = [
    { id: 1, nickname: "닉네임", avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" },
    { id: 2, nickname: "닉네임", avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" },
    { id: 3, nickname: "닉네임", avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" },
    { id: 4, nickname: "닉네임", avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" },
    { id: 5, nickname: "닉네임", avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" },
    { id: 6, nickname: "닉네임", avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" },
  ];

function ChatInvitePage() {
    const userId = 1004; // 예시로 User ID를 하드코딩하였지만, 실제로는 인증 토큰 등을 이용해 가져옴.
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
                stomp.subscribe(`/sub/chat/room/list/${userId}`, (message) => {
                    const receivedRooms = JSON.parse(message.body);
                    console.log(receivedRooms);
                });

                stomp.subscribe(`/sub/chat/room/refresh/${userId}`, (message) => {
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
    }, [userId]);

    return (
        <div>
            <ChatListContainer>
                <ChatListContent>
                    <ChatHeader title="채팅방 개설" />
                </ChatListContent>
            </ChatListContainer >
            <Container>
                <Title>대화상대 추가</Title>
                <SearchBar>
                    <SearchInput id="searchInput" type="text" placeholder="유저 닉네임으로 검색" />
                    <SearchIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" alt="검색" />
                </SearchBar>

                    {mockContacts.map((contact) => (
                    <UserListItem
                        key={contact.id}
                        avatar={contact.avatar}
                        nickname={contact.nickname}
                    />
                    ))}

                <ButtonGroup>
                    <ActionButton>확인</ActionButton>
                    <ActionButton>취소</ActionButton>
                </ButtonGroup>
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

const Title = styled.h1`
  font-size: 20px;
`;

const SearchBar = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-top: 7px;
  gap: 40px 100px;
  font-size: 20px;
  color: #96908C;
  padding: 17px;
  border: 1px solid #DFA67B;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 20px;
  width: 100%;
  &::placeholder {
    color: #96908C;
  }
`;

const SearchIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 24px;
`;

// 하단 확인 취소
const ButtonGroup = styled.div`
  align-self: end;
  display: flex;
  margin-top: 37px;
  gap: 15px;
  font-family: Roboto, sans-serif;
  white-space: nowrap;
  text-align: center;
  line-height: 1;
`;

const ActionButton = styled.button`
  border-radius: 10px;
  background: #fff;
  padding: 16px 30px;
  border: 1px solid #DFA67B;
  cursor: pointer;
  
  &:hover {
    background: #f8f8f8;
  }
  
  &:focus {
    outline: 2px solid #DFA67B;
    outline-offset: 2px;
  }
`;

export default ChatInvitePage;