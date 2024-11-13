import React, { useState } from "react";
import styled from "styled-components";
import chatbutton from "./asset/send.png";
import avatarImage from "./asset/avatar.png";

function CommentInput({ onAddComment }) {
  const [inputValue, setInputValue] = useState("");
  const [commentId, setCommentId] = useState(1);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (inputValue.trim()) {
      const newComment = {
        id: commentId, // 자동 증가 ID
        name: "작성자", // 기본 작성자 이름
        avatar: avatarImage,
        content: inputValue,
        likes: 0, // 초기 좋아요 수
        timestamp: new Date().toLocaleString(), // 작성 시간 추가
      };

      onAddComment(newComment);
      setInputValue(""); // 입력 필드 초기화
      setCommentId(commentId + 1); // ID 증가
    }
  };

  return (
    <CommentInputWrapper>
      <CommentInputField
        placeholder="댓글을 입력하세요..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <SendButton src={chatbutton} alt="send" onClick={handleCommentSubmit} />
    </CommentInputWrapper>
  );
}

const CommentInputWrapper = styled.form`
  position: fixed;
  display: flex;
  transform: translateX(-0.2%);
  width: 432px;
  height: 63px;
  align-items: center;
  top: 770px; /* 푸터 위에 위치 */
  background-color: #FFF2CC;
  justify-content: space-between;
  border: 0.5px solid #CAC4D0;
  box-sizing: border-box; /* 내부 패딩이 전체 너비에 포함되도록 */
  margin-top: 0; /* 위 마진 제거 */
`;

const CommentInputField = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  margin-left: 10px;
`;

const SendButton = styled.img`
  cursor: pointer;
  width: 24px; /* 기존 크기를 유지 */
  height: 24px; /* 기존 크기를 유지 */
  margin-left: 10px;
  margin-right: 10px;
`;

export default CommentInput;
