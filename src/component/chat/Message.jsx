import * as React from "react";
import styled from "styled-components";

function Message({ msgId, content, time, isSentByMe }) {
  return (
    <MessageWrapper isSentByMe={isSentByMe}>
      <MessageTime>{time}</MessageTime>
      <MessageBubble isSentByMe={isSentByMe}>{content}</MessageBubble>
    </MessageWrapper>
  );
}

const MessageWrapper = styled.div`
  display: flex;
  margin-top: 19px;
  gap: 7px;
  align-self: ${props => props.isSentByMe ? 'end' : 'start'};
  width: ${props => props.isSentByMe ? '194px' : 'auto'};
  max-width: 100%;
`;

const MessageBubble = styled.p`
  border-radius: 5px;
  background-color: #fff;
  font-size: 16px;
  color: #000;
  padding: 15px 12px;
  ${props => props.isSentByMe ? '' : 'flex-grow: 1;'}
  width: fit-content;
`;

const MessageTime = styled.time`
  color: #757575;
  font-size: 12px;
  align-self: end;
  margin-top: ${props => props.isSentByMe ? '31px' : '18px'};
`;

export default Message;