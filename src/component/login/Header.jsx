import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import 맛있는녀석들_로고   from "./assets/맛있는녀석들_로고.png";

function Header() {
  return (
    <Wrapper>
    <HeaderWrapper>
      <Logo         src={맛있는녀석들_로고} alt="맛있는 녀석들 로고" />
    </HeaderWrapper>
   
    <Title>우리 동네의<br />숨은 맛집</Title>
    <Subtitle>동네 맛집을 공유해요</Subtitle>
    </Wrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  margin-left: 28px;
  width: 220px;
  max-width: 100%;
  align-items: flex-start;
  gap: 20px;
  color: #000;
  white-space: nowrap;
  text-align: center;
  justify-content: space-between;
  font: 400 10px/1 Roboto, sans-serif;
  :hover {
    background: #F4B183;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 220px;
  max-width: 100%;
  white-space: nowrap;

  justify-content: space-between;
`;

const Logo = styled.img`
    position: absolute;
    width: 85px;
    height: 85px;
    left: calc(60% - 85px/2 + 0.5px);
    top: 58px;
    border-radius: 50px;
`

const Title = styled.b`
  color: #e1650f;
  font-size: 40px;
  margin: 54px 0 0 45px;
  
`;

const Subtitle = styled.p`
  color: #ce9971;
  font-size: 24px;
  margin: 14px 0 0 45px;
`;

export default Header;