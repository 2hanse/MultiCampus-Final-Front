import React from "react";
import styled from "styled-components";

function EmailDisplay(props) {
  return (
    <div>
        <EmailDisplayWrapper>
            <p className="email-info">회원님이 가입한 이메일은 다음과 같습니다</p>
            <div className="email-container">{props.data.email}</div>
            <SubmitButton>로그인</SubmitButton>
            <SubmitButton>비밀번호 찾기</SubmitButton>
        </EmailDisplayWrapper>

    </div>
    
  );
}

const EmailDisplayWrapper = styled.section`
  display: flex;
  margin-top: 160px;
  width: 80%;
  flex-direction: column;
  color: #785a00;
  padding: 0 42px;
  font: 400 15px Inter, sans-serif;

  .email-info {
    color: #ce9971;
    align-self: start;
  }

  .email-container {
    border-radius: 10px;
    background-color: #fff;
    margin-top: 8px;
    color: #000;
    white-space: nowrap;
    text-align: center;
    padding: 24px 70px;
    border: 1px solid #ffd966;
  }
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  background-color: #ffd966;
  width: 100%;
  font-size: 19px;
  color: #785a00;
  white-space: nowrap;
  text-align: center;
  margin: 26px 0 0 0px;
  padding: 10px 8px;
  border: none;
  cursor: pointer;
`;

export default EmailDisplay;