import React from "react";
import styled from "styled-components";
import UserInfo from "./user/UserInfo";
import LeaveButton from "./LeaveButton";

const ChatListItem = (props) => {
  const { room, userId, stompClient } = props;

  // 나 자신을 제외한 다른 유저들 필터링
  const otherUsers = room.users.filter((user) => user.user_id !== userId);

  // 채팅방 이름 결정 (1:1일 경우 상대방 닉네임, 단체일 경우 모든 유저 닉네임 취합)
  const roomName = room.roomTitle
    ? room.roomTitle
    : otherUsers.length === 1
      ? otherUsers[0].nickname
      : otherUsers.map((user) => user.nickname).join(", ");

  // 단체방일 경우 여러 아바타 이미지를 버블로 처리
  const avatarSrc = otherUsers.length === 1
    ? otherUsers[0].profile_img_url
    : otherUsers.map((user) => user.profile_img_url);

  return (
    <ChatItemWrapper>
      <UserSection>
        <AvatarBubble images={avatarSrc} />
        <RoomInfo>
          <UserInfo nickname={roomName} lastMessage="마지막 메시지 내용" />
        </RoomInfo>
      </UserSection>
      <LeaveButton roomId={room.roomId} stompClient={stompClient} />
    </ChatItemWrapper>
  );
};

// 단체방일 경우 여러 아바타를 버블 형식으로 처리하는 컴포넌트 (최대 3명 표시)
const AvatarBubble = ({ images }) => {
  const visibleImages = Array.isArray(images) ? images.slice(0, 3) : [images]; // 최대 3명까지만 표시

  return (
    <BubbleContainer numImages={visibleImages.length}>
      {visibleImages.map((src, index) => (
        <BubbleAvatar key={index} src={src} alt="Avatar" numImages={visibleImages.length} />
      ))}
    </BubbleContainer>
  );
};

// 스타일링 부분
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

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// 단체방에서 여러 아바타 이미지를 배치하는 컨테이너 (최대 3명 표시)
const BubbleContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #dfa67b;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 2px solid #cf9b74;

  ${({ numImages }) =>
    numImages === 1 &&
    `
    & > img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  `}

  ${({ numImages }) =>
    numImages === 2 &&
    `
    & > img:nth-child(1) {
      position: absolute;
      width: 70%;
      height: 70%;
      top: 0;
      left: 0;
      z-index: 2;
    }
    & > img:nth-child(2) {
      position: absolute;
      width: 50%;
      height: 50%;
      bottom: 0;
      right: 0;
      z-index: 1;
    }
  `}

  ${({ numImages }) =>
    numImages === 3 &&
    `
    & > img:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 60%;
    }
    & > img:nth-child(2) {
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 50%;
    }
    & > img:nth-child(3) {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40%;
      height: 40%;
    }
  `}
`;

const BubbleAvatar = styled.img`
  border-radius: 50%;
  object-fit: cover; /* 이미지가 뭉개지지 않게 1:1 비율로 크롭 */
`;

export default ChatListItem;
