import * as React from "react";
import styled from "styled-components";

function Message({ msg, displayTime, displayProfile, isSentByMe }) {
  return (
    <MessageWrapper isSentByMe={isSentByMe}>
      {!isSentByMe && (
        <ProfileContainer displayProfile={displayProfile}>
          <ProfileImg src={msg.profileImgUrl} alt={`${msg.nickname}'s profile`} />
          <Nickname>{msg.nickname}</Nickname>
        </ProfileContainer>
      )}
      {isSentByMe && (
        <MessageTime>{displayTime ? msg.messageTimestamp : ""}</MessageTime>
      )}
      <MessageBubble isSentByMe={isSentByMe}>{msg.message}</MessageBubble>
      {!isSentByMe && (
        <MessageTime>{displayTime ? msg.messageTimestamp : ""}</MessageTime>
      )}
    </MessageWrapper>
  );
}

const MessageWrapper = styled.div`
  display: flex;
  margin-top: 19px;
  gap: 7px;
  align-self: ${props => props.isSentByMe ? 'flex-end' : 'flex-start'}; 
  width: 100%;
  justify-content: ${props => props.isSentByMe ? 'flex-end' : 'flex-start'};
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  visibility: ${props => props.displayProfile ? 'visible' : 'hidden'}
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Nickname = styled.span`
  font-size: 12px;
  color: #757575;
  margin-top: 4px;
`;

const MessageBubble = styled.p`
  border-radius: 5px;
  ${props => props.isSentByMe ? 'background-color: #ffeeff;' : 'background-color: #eeffff;'}
  font-size: 16px;
  color: #000;
  padding: 15px 12px;
  max-width: 50%; /* 메시지의 최대 너비를 설정 */
`;

const MessageTime = styled.time`
  color: #757575;
  font-size: 12px;
  align-self: end;
  margin-top: ${props => props.isSentByMe ? '31px' : '18px'};
`;

export default Message;