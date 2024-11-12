import React from "react";
import styled from "styled-components";
import Header from "../../../layout/header/user/Header";
import EmailDisplay from "../../../find-email/findresult-email/EmailDisplay";

function FindResultEmailPage() {
  return (
    <EmailFinderWrapper>
        <Header navigatePath="/user/find-email" title="이메일 찾기"/>
        <hr />
        <EmailDisplay />
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
  padding: 62px 0 378px;
`;

export default FindResultEmailPage;