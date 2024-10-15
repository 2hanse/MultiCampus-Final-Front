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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  max-width: 480px;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  align-items: flex-start;
  font-family: Inter, sans-serif;
  font-weight: 400;
  margin: 0 auto;
  padding: 62px 28px 313px;
  border: 1px solid #000;
`;

export default LoginPage;