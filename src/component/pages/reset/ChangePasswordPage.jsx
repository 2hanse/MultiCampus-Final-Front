import React from "react";
import styled from "styled-components";
import Header from "../../layout/header/user/Header";
import ResetPasswordForm from "../../change-password/ResetPasswordForm";


function ChangePasswordPage() {
  return (
    <PageWrapper>
      <Header navigatePath="/" title="비밀번호 변경"/>
      <main>
        <ResetPasswordForm />
      </main>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: #fff4d2;
  display: flex;
  border: 0.5px solid #CAC4D0;
  width: 430px;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 396px;
`;

export default ChangePasswordPage;