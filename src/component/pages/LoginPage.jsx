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
  border: 0.5px solid #CAC4D0;
  width: 430px;
  height: 100vh;
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