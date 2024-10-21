import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Header() {
  return (
    <Wrapper>
    <HeaderWrapper>
        <NavLink to={"/"}>
        <Logo loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" alt="Logo" />
        </NavLink>
    </HeaderWrapper>
   
    <Title>맛잘알이 되는 길</Title>
    <Subtitle>나만의 맛집을 공유해보세요</Subtitle>
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
  text-align: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  cursor: pointer;
`;

const Title = styled.h1`
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