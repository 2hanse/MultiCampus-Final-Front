import React from "react";
import styled from "styled-components";
import chatbutton from "./asset/send.png";


function CommentInput() {
  return (
    <CommentInputWrapper>
      <CommentInputField placeholder="댓글을 입력하세요..." />
      <SendButton 
        src={chatbutton} alt='chatbutton'
      />
    </CommentInputWrapper>
  );
}

const CommentInputWrapper = styled.form`
  position: fixed;
    display: flex;
    transform: translateX(-0.2%);
    width: 430px;
    height: 63px;
    align-items: center;
    bottom: 100px;
    background-color: #FFF2CC;
    justify-content: space-between;
    border: 0.5px solid #CAC4D0;
`;

const CommentInputField = styled.input`
  border-radius: 10px;
  background-color: #fff;
  flex-grow: 1;
  width: fit-content;
  padding: 13px 16px;
  border: none;
  font: inherit;
  color: inherit;
`;

const SendButton = styled.img`
  background-size: contain;
  width: 28px;
  height: 25px;
  border: none;
  cursor: pointer;
`;

export default CommentInput;
