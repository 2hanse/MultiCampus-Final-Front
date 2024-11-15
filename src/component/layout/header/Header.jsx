import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 991px) {
    width: 100%;
  }
  padding: 62px 28px 28px 28px;
  box-sizing: border-box;
  background-color: ${(props) => props.color?? "#ffd966"};
`;

const BackButton = styled.img`
  cursor: pointer;
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  text-align: center;
  border-color: #000;
  font: 400 18px/1 Roboto, sans-serif;
  font-weight: bold;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function Header(props) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <HeaderWrapper color={props.color}>
      <BackButton onClick={handleGoBack} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" alt="Chat logo" />
      <Title>{props.title}</Title>
      <ActionsWrapper>{props.actions}</ActionsWrapper>
    </HeaderWrapper>
  );
}

export default Header;