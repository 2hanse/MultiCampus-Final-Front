import React, { useState } from "react";
import styled from "styled-components";
import avatarImage from "./asset/avatar.png";
import likeicon from "./asset/like_button.png"

function Comment({ name, membership, content, timestamp }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [likeCount, setLikeCount] = useState(0); // Like count 상태 추가

  const handleReplyButtonClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      setReplies([...replies, {
        id: replies.length + 1,
        name: "User", // 고정 값, 필요시 동적으로 변경
        content: replyContent,
        timestamp: new Date().toLocaleString(),
      }]);
      setReplyContent(""); // 입력 필드 초기화
      setShowReplyInput(false); // 입력창 닫기
    }
  };

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1); // Like count 증가
  };

  return (
    <CommentWrapper>
      <Avatar src={avatarImage} alt="User avatar" />
      <CommentBody>
        <CommentHeader>
          <CommentName>{name} <Membership>({membership})</Membership></CommentName>
          <CommentContent>{content}</CommentContent>
        </CommentHeader>
        <CommentFooter>
          <CommentTimestamp>{timestamp}</CommentTimestamp>
          <ReplyButton onClick={handleReplyButtonClick}>답글쓰기</ReplyButton>
          <LikeContainer>
            <LikeIcon src={likeicon} alt="likeicon" onClick={handleLikeClick}/>
            <LikeCount>{likeCount}</LikeCount>
          </LikeContainer>
        </CommentFooter>
        {showReplyInput && (
          <ReplyInputContainer>
            <ReplyInput
              type="text"
              placeholder="답글을 입력하세요..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <SubmitReplyButton onClick={handleReplySubmit}>입력</SubmitReplyButton>
          </ReplyInputContainer>
        )}
        {replies.map((reply) => (
          <Reply key={reply.id}>
            <ReplyName>{reply.name} <ReplyMembership>({reply.membership})</ReplyMembership></ReplyName>
            <ReplyContent>{reply.content}</ReplyContent>
            <ReplyTimestamp>{reply.timestamp}</ReplyTimestamp>
          </Reply>
        ))}
      </CommentBody>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentName = styled.span`
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const Membership = styled.span`
  font-size: 12px;
  color: #777;
  margin-left: 4px;
`;

const CommentContent = styled.p`
margin: 5px 0 0;
font-size: 15px;
`;

const CommentFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-size: 12.5px;
  color: #777;
`;

const CommentTimestamp = styled.span`
  margin-right: 10px;
  font-size: 12.5px;
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  margin-right: 10px;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LikeIcon = styled.img`
  cursor: pointer;
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const LikeCount = styled.span`
  font-size: 12px;
  color: #777;
`;

const ReplyInputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ReplyInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 5px;
`;

const SubmitReplyButton = styled.button`
  padding: 5px 10px;
  background-color: #ED6000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Reply = styled.div`
  margin-top: 10px;
  padding-left: 10px;
  border-left: 1px solid #ddd;
`;

const ReplyName = styled.span`
  font-weight: bold;
  font-size: 11px;
  display: flex;
  align-items: center;
`;

const ReplyMembership = styled.span`
  font-size: 11px;
  color: #777;
  margin-left: 4px;
`;

const ReplyContent = styled.p`
margin: 5px 0 0;
font-size: 13px;
`;

const ReplyTimestamp = styled.span`
  margin-right: 10px;
  font-size: 11px;
`;


export default Comment;
