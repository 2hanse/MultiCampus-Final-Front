import React from "react";
import styled from "styled-components";
import Header from "../../layout/header/user/Header";
import PasswordResult from "../../find-password/findresult-password/PasswordResult";

function ChangePasswordResultPage() {
  return (
    <PageWrapper>
        <main>
            <Header navigatePath="/user/me/changePassword" title="비밀번호 변경"/>
            <PasswordResult />
        </main>
    </PageWrapper>

  );
}

const PageWrapper = styled.div`
  background-color: #fff4d2;
  display: flex;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  max-width: 430px;
  width: 100%;
  height: 450px;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 340px;
`;

export default ChangePasswordResultPage;