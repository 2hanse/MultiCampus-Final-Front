import React from "react";
import styled from "styled-components";
import UserAvatar from "./user/UserAvatar";
import UserInfo from "./user/UserInfo";
import LeaveButton from "./LeaveButton";

const ChatListItem = () => {
  return (
    <ChatItemWrapper>
      <UserSection>
        <UserAvatar src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" />
        <UserInfo nickname="닉네임" lastMessage="마지막 메시지 내용" />
      </UserSection>
      <LeaveButton />
    </ChatItemWrapper>
  );
};

const ChatItemWrapper = styled.article`
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-top: 20px;
  width: 100%;
  max-width: 391px;
  gap: 20px;
  justify-content: space-between;
  padding: 13px 21px;
  border: 1px solid #dfa67b;
`;

const UserSection = styled.div`
  display: flex;
  gap: 15px;
  font-family: Inter, sans-serif;
  font-weight: 400;
`;

export default ChatListItem;