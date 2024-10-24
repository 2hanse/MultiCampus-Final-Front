import React from "react";
import styled from "styled-components";

const UserInfo = ({ nickname, lastMessage }) => {
  return (
    <InfoWrapper>
      <Nickname>{nickname}</Nickname>
      <LastMessage>{lastMessage}</LastMessage>
    </InfoWrapper>
  );
};

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;

const RoomName = styled.div`
  max-width: 200px; /* 라벨 크기 고정 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 넘칠 경우 ... 처리 */
  font-size: 16px;
  font-weight: bold;
`;

const Nickname = styled.h3`
  max-width: 220px; /* 라벨 크기 고정 */
  text-overflow: ellipsis; /* 넘칠 경우 ... 처리 */
  white-space: nowrap;
  overflow: hidden;
  color: #000;
  font-size: 18px;
  align-self: start;
  margin: 0;
`;

const LastMessage = styled.p`
  color: #b7b2b2;
  font-size: 17px;
  margin: 7px 0 0;
`;

export default UserInfo;