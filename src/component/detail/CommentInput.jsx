import React, { useState } from "react";
import styled from "styled-components";
import chatbutton from "./asset/send.png";
import { getUserIdFromToken } from "../api/jwt";
import api from "../api/axios";

function CommentInput({ detail, fetchComments }) {
  const [inputvalue, setInputValue] = useState('');
  const localUserId = getUserIdFromToken();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await api.post('/comments', {
        board_id: detail.board.board_id,
        user_id: localUserId,
        comment: inputvalue,
        parant_id: null
      });
      
      setInputValue('');

      if (fetchComments) {
        fetchComments();
      }

    } catch (error) {
      console.error('댓글 생성 중 오류 발생:', error);
      alert('댓글 생성에 실패했습니다.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <CommentInputWrapper>
      <CommentInputField
        placeholder={localUserId ? "댓글을 입력하세요..." : "로그인 후 이용해 주세요..."}
        value={inputvalue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <SendButton
        src={chatbutton}
        alt="send"
        onClick={() => {
          if (localUserId) {
            handleSubmit();
          } else {
            alert("로그인 후 이용해 주세요.");
          }
        }}
      />
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
  bottom: 100px;
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
