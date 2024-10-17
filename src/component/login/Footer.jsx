import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Footer() {
  return (

    <FooterWrapper>
      <NavStyle to='/user/join'>회원가입</NavStyle><br />
      <NavStyle to='/user/find-email'>아이디 찾기</NavStyle> | 
      <NavStyle to='/user/find-password'> 비밀번호 찾기</NavStyle>


    </FooterWrapper>

  );
}

const FooterWrapper = styled.footer`
  color: #ce9971;
  font-size: 17px;
  text-align: center;
  align-self: center;
  margin-top: 32px;
  width: 300px;
  cursor: pointer;
  :hover {
    background: #F4B183;
    color: white;
  }
`;

const NavStyle = styled(NavLink)`
  color: #ce9971;
  font-size: 17px;
  text-decoration: none;
  :hover {
    color: lightgrey;
  }
  &.active {
    color: #ce9971;
  }
`

const Font = styled.p`
  cursor: pointer;
  :hover {
    background: lightgrey;
  }
`;

export default Footer;