import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
import UserListItem from "../../chat/user/UserListItem";
import { getUserIdFromToken } from "../../api/jwt";
import api from "../../api/axios";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/header/Header";


function ChatInvitePage() {
  const localUserId = getUserIdFromToken(); // userId를 동적으로 가져옴
  const [stompClient, setStompClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [roomTitle, setRoomTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localUserId) {
      console.error("User ID not found in token");
      return;
    }

    // STOMP 클라이언트 설정
    const socket = new SockJS(api.defaults.baseURL + "ws");
    const stomp = Stomp.over(socket);

    // 연결 설정 및 구독
    stomp.connect(
      { Authorization: `Bearer ${localStorage.getItem('token')}` },
      (frame) => {
        console.log("Connected: " + frame);

        // /sub/chat/room/list/{userId} 구독
        stomp.subscribe(`/sub/chat/search/${localUserId}`, (message) => {
          const receivedUsers = JSON.parse(message.body);
          console.log(receivedUsers);
          setSearchResults(receivedUsers);
        });

        // /sub/chat/room/list/{userId} 구독
        stomp.subscribe(`/sub/chat/room/create/${localUserId}`, (message) => {
          console.log('room create done');
          navigate(-1);
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (stompClient && searchTerm.trim()) {
      stompClient.send(`/pub/chat/search`, {}, JSON.stringify({ searchNickname: searchTerm }));
    }
  };

  const handleCheckUser = (user) => {
    const isChecked = checkedUsers.some((checkedUser) => checkedUser.user_id === user.user_id);

    if (isChecked) {
      // 이미 체크된 유저라면 목록에서 제거
      setCheckedUsers(checkedUsers.filter((checkedUser) => checkedUser.user_id !== user.user_id));
    } else {
      // 체크되지 않은 유저라면 목록에 추가
      setCheckedUsers([...checkedUsers, user]);
    }

    // 체크 후 검색 결과 초기화
    setSearchResults([]);
  }

  const handleAddUser = () => {
    if (stompClient && checkedUsers.length) {
      const inviteUserIds = checkedUsers
        .filter((user) => user.user_id !== localUserId) // 본인 제외
        .map((user) => user.user_id); // user_id만 추출

      stompClient.send(`/pub/chat/room/create`, {}, JSON.stringify({ roomTitle: roomTitle, inviteUsers: inviteUserIds }));
    }
  }

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <Main>
      <Header title="채팅방 개설" />
      <InviteContainer>
        <Title>대화상대 추가</Title>
        <SearchBar>
          <SearchInput onKeyDown={handleKeyPress} onChange={(e) => setSearchTerm(e.target.value)} stompClient={stompClient} id="searchInput" type="text" placeholder="유저 닉네임으로 검색" />
          <SearchIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" alt="검색" />
        </SearchBar>

        {checkedUsers.map((user) => (
          <UserListItem
            key={user.user_id}
            user={user}
            onCheck={handleCheckUser}
            isChecked={checkedUsers.some((checkedUser) => checkedUser.user_id === user.user_id)}
          />
        ))}

        {searchResults.map((user) => (
          <UserListItem
            key={user.user_id}
            user={user}
            onCheck={handleCheckUser}
            isChecked={checkedUsers.some((checkedUser) => checkedUser.user_id === user.user_id)}
          />
        ))}

      </InviteContainer>
      <ButtonGroup>
        <RoomTitleInput 
            type="text" 
            placeholder="대화방 이름 지정"
            value={roomTitle} 
            onChange={(e) => setRoomTitle(e.target.value)} 
          />
        <ActionButton onClick={handleAddUser}>확인</ActionButton>
        <ActionButton onClick={handleCancel}>취소</ActionButton>
      </ButtonGroup>
      <Footer />
    </Main>
  );
}

const Main = styled.main`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    background: #ffffff;
    margin: 0 auto;
    border: 0.5px solid #CAC4D0;
`;

const InviteContainer = styled.main`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: calc(100vh - 216px - 106px);
  flex-direction: column;
  align-items: center;
  color: #000;
  padding: 28px;
  font: 400 18px Inter, sans-serif;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE 및 Edge */
  scrollbar-width: none;  /* Firefox */
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
  width: 90%;
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
  display: flex;
  padding: 28px;
  position: sticky;
  bottom: 0px;
  width: 100%;
  gap: 16px;
  font-family: Roboto, sans-serif;
  white-space: nowrap;
  text-align: center;
  line-height: 1;
  box-sizing: border-box;
`;

const RoomTitleInput = styled.input`
  flex: 1;
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 15px;
  border: 1px solid #DFA67B;
  font-size: 16px;
  outline: none;
  &::placeholder {
    color: #96908C;
  }
`;

const ActionButton = styled.button`
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
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