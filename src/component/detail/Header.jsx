import React from "react";
import styled from "styled-components";
import backbutton from "./asset/arrow_back.png";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    function gotoBackPage() {
        navigate(-1);
    }
    
  return (
    <HeaderContainer>
      <BackButton 
        src={backbutton}
        alt='backbutton'
        onClick={gotoBackPage}
      />
      <HeaderText>(닉네임) 님의 게시글</HeaderText>
    </HeaderContainer>
  );
}


const HeaderContainer = styled.header`
  position: fixed;
    display: flex;
    transform: translateX(-0.2%);
    width: 430px;
    height: 120px;
    align-items: center;
    top: 0px;
    background-color: #f4b183;
    justify-content: space-between;
    border: 0.5px solid #CAC4D0;
`;

const BackButton = styled.img`
  background-size: contain;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
`;

const HeaderText = styled.h1`
  flex-grow: 1;
  text-align: center;
  font-size: 18px;
  margin: 0;
  color: #000;
`;

export default Header;
