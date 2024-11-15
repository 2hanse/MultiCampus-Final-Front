import React from "react";
import styled from "styled-components";
import Header from "../../../layout/header/user/Header";
import EmailForm from "../../../find-email/EmailForm";

function FindEmailPage() {
  return (
    <EmailFinderWrapper>
      <Header navigatePath="/" title="이메일 찾기"/>
      <EmailForm />
    </EmailFinderWrapper>
  );
}

const EmailFinderWrapper = styled.main`
  background-color: #fff4d2;
  display: flex;
  border: 0.5px solid #CAC4D0;
  width: 430px;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 386px;
`;


export default FindEmailPage;