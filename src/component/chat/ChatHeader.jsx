import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 60%;
  margin-left: 0;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Logo = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  border-color: #000;
  margin-top: 15px;
  font: 400 18px/1 Roboto, sans-serif;
`;

function ChatHeader() {
  return (
    <HeaderWrapper>
      <Logo loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" alt="Chat logo" />
      <Title>채팅 목록</Title>
    </HeaderWrapper>
  );
}

export default ChatHeader;