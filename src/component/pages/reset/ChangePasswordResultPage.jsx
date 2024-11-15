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
  border: 0.5px solid #CAC4D0;
  width: 430px;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 419px;
`;

export default ChangePasswordResultPage;