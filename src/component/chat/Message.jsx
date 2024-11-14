import * as React from "react";
import styled from "styled-components";

function Message({ msg, displayTime, displayProfile, isSentByMe }) {
  const handleMediaClick = () => {
    if (msg.mediaUrl) {
      window.open("http://localhost:8000" + msg.mediaUrl, "_blank"); // 새 창으로 원본 이미지 열기
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      hour12: false,
      minute: '2-digit'
    });
  }

  return (
    <MessageWrapper isSentByMe={isSentByMe}>
      {!isSentByMe && (
        <ProfileContainer displayProfile={displayProfile}>
          <ProfileImg src={msg.profileImgUrl} alt={`${msg.nickname}'s profile`} />
          <Nickname>{msg.nickname}</Nickname>
        </ProfileContainer>
      )}
      {isSentByMe && (
        <MessageTime>{displayTime ? formatTime(msg.messageTimestamp) : ""}</MessageTime>
      )}
      <MessageBubble isSentByMe={isSentByMe}>
        {msg.mediaId && (
          <MediaImage src={"http://localhost:8000" + msg.mediaThumbUrl} onClick={handleMediaClick} />
        )}
        {msg.message}
      </MessageBubble>
      {!isSentByMe && (
        <MessageTime>{displayTime ? formatTime(msg.messageTimestamp) : ""}</MessageTime>
      )}
    </MessageWrapper>
  );
}

const MessageWrapper = styled.div`
  display: flex;
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

const MessageBubble = styled.div`
  border-radius: 5px;
  ${props => props.isSentByMe ? 'background-color: #ffeeff;' : 'background-color: #eeffff;'}
  font-size: 16px;
  color: #000;
  padding: 15px 12px;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageTime = styled.time`
  color: #757575;
  font-size: 12px;
  align-self: end;
  margin-top: ${props => props.isSentByMe ? '31px' : '18px'};
`;

const MediaImage = styled.img`
  max-width: 100%;
  border-radius: 5px;
`;

export default Message;
