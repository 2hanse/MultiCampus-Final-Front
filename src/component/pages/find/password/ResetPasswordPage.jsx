import React from "react";
import styled from "styled-components";
import Header from "../../../layout/header/user/Header";
import PasswordForm from "../../../find-password/findresult-password/PasswordForm";

function ResetPasswordPage() {
  return (
    <PageWrapper>

      <Header navigatePath="/user/phone-identification" title="비밀번호 찾기"/>
      <PasswordForm />
    </PageWrapper>

  );
}

const PageWrapper = styled.main`
  background-color: #fff4d2;
  display: flex;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  max-width: 430px;
  max-height:932px;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 340px;
`;

export default ResetPasswordPage;