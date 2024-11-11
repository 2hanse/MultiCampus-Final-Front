import React from "react";
import styled from "styled-components";

function Comment({ avatar, name, content, timestamp, isReply }) {
  return (
    <CommentWrapper isReply={isReply}>
      <CommentAvatar src={avatar} alt="User avatar" isReply={isReply} />
      <CommentContent isReply={isReply}>
        <CommentHeader>
          <CommentAuthor isReply={isReply}>{name}</CommentAuthor>
          <CommentText isReply={isReply}>{content}</CommentText>
          <CommentTimestamp isReply={isReply}>{timestamp}</CommentTimestamp>
        </CommentHeader>
        <ReplyButton isReply={isReply}>답글쓰기</ReplyButton>
      </CommentContent>
      <MoreOptionsIcon
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/049ce5aae964490809f62051848847bf7be80fa164658f0a051bb357cb865f3c?placeholderIfAbsent=true&apiKey=075d8221b0dd488ba40080c6fa3dd46a"
        alt="More options"
        isReply={isReply}
      />
    </CommentWrapper>
  );
}

const CommentWrapper = styled.article`
  display: flex;
  width: ${props => props.isReply ? "215px" : "239px"};
  max-width: 100%;
  align-items: start;
  gap: ${props => props.isReply ? "7px" : "6px"};
  margin: ${props => props.isReply ? "21px 0 0 auto" : "23px 0 0 16px"};
  font-size: ${props => props.isReply ? "11px" : "inherit"};
`;

const CommentAvatar = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: ${props => props.isReply ? "44px" : "50px"};
`;

const CommentContent = styled.div`
  display: flex;
  margin-top: ${props => props.isReply ? "9px" : "10px"};
  align-items: flex-start;
`;

const CommentHeader = styled.div`
  align-self: start;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: #000;
`;

const CommentAuthor = styled.div`
  font-size: ${props => props.isReply ? "11px" : "12px"};
  text-align: center;
`;

const CommentText = styled.p`
  font-size: ${props => props.isReply ? "13px" : "15px"};
  margin-top: ${props => props.isReply ? "4px" : "5px"};
`;

const CommentTimestamp = styled.time`
  color: #757575;
  font-size: ${props => props.isReply ? "11px" : "13px"};
  align-self: stretch;
`;

const ReplyButton = styled.button`
  color: #757575;
  font-size: 13px;
  align-self: end;
  margin-top: ${props => props.isReply ? "31px" : "34px"};
  background: none;
  border: none;
  cursor: pointer;
`;

const MoreOptionsIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: ${props => props.isReply ? "13px" : "15px"};
  align-self: end;
  margin-top: ${props => props.isReply ? "38px" : "43px"};
`;

export default Comment;
