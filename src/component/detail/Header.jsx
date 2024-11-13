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
  align-items: center;
  justify-content: space-between;
  width: 430px;
  height: 100px; /* 기존 120px에서 줄임 */
  top: 0;
  background-color: #f4b183;
  padding: 8px 16px; /* 상하 8px 패딩 추가 */
  border-bottom: 1px solid #cac4d0;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; // 헤더의 z-index 설정
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
