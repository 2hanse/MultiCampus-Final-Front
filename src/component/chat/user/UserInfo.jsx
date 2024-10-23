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

const Nickname = styled.h3`
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