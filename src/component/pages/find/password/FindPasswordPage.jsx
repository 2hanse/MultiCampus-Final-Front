import React from "react";
import styled from "styled-components";
import Header from "../../../find-password/Header";
import PasswordRecoveryForm from "../../../find-password/PasswordRecoveryForm";

function FindPasswordPage() {
  return (
    <PageWrapper>
      <Header />
      <main>
        <PasswordRecoveryForm />
      </main>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: #fff4d2;
  display: flex;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  max-width: 480px;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 340px;
`;

export default FindPasswordPage;