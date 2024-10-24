import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

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

const BackButton = styled.img`
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

function ChatHeader(props) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <HeaderWrapper>
      <BackButton onClick={handleGoBack} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" alt="Chat logo" />
      <Title>{props.title}</Title>
    </HeaderWrapper>
  );
}

export default ChatHeader;