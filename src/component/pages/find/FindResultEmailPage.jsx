import React from "react";
import styled from "styled-components";
import Header from "../../find-email/findresult-email/Header";
import EmailDisplay from "../../find-email/findresult-email/EmailDisplay";

function FindResultEmailPage() {
  return (
    <main className="email-finder">
      <EmailFinderWrapper>
        <Header />
        <hr />
        <EmailDisplay />
      </EmailFinderWrapper>
    </main>
  );
}

const EmailFinderWrapper = styled.div`
  background-color: #fff4d2;
  display: flex;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  max-width: 480px;
  max-height: 566px;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 268px;
`;

export default FindResultEmailPage;