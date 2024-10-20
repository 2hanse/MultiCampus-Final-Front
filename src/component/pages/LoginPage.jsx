import React from "react";
import styled from "styled-components";
import Header from "../login/Header";
import LoginForm from "../login/LoginForm";
import Footer from "../login/Footer";

function LoginPage() {
  return (
    <Main>
      <Header />
      <LoginForm />
      <Footer />
    </Main>
  );
}

const Main = styled.main`
  background-color: #fff4d2;
  display: flex;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  max-width: 480px;
  max-height: 932px;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 298px;
`;

export default LoginPage;