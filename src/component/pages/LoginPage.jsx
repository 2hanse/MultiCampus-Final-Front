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
  max-width: 430px;
  max-height: 932px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 62px 0 235px;
  overflow-y: scroll; /* 세로 스크롤 허용 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
  -ms-overflow-style: none;  /* Internet Explorer 10 이상 */
  &::-webkit-scrollbar { 
    display: none;  /* Safari와 Chrome에서 스크롤바 숨기기 */
  }
`;

export default LoginPage;