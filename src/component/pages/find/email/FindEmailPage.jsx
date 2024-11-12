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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  max-width: 430px;
  max-height: 932px;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 386px;
`;


export default FindEmailPage;