import React from "react";
import styled from "styled-components";
import SearchButton from "./SearchButton";
import backbutton from "./asset/arrow_back.png";
import menubutton from "./asset/menu.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function gotoBackPage() {
    navigate(-1);
  }

  function gotoMenuBar() {
    navigate(-1);
  }

  return (
    <HeaderContainer>
      <BackButton
        src={backbutton}
        alt="backbutton"
        onClick={gotoBackPage}
      />
      <BoardTitle>지역 게시판</BoardTitle>
      <HeaderActions>
        <SearchButton />
        <MenuButton
          src={menubutton}
          alt="menubutton"
          onClick={gotoMenuBar}
        />
      </HeaderActions>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 430px;
  height: 120px;
  top: 0;
  background-color: #f4b183;
  padding: 0 16px;
  border-bottom: 1px solid #cac4d0;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; // 헤더의 z-index 설정
`;


const BackButton = styled.img`
  background-size: contain;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const BoardTitle = styled.h1`
  flex-grow: 1;
  text-align: center;
  font-size: 18px;
  margin: 0;
  color: #000;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; // 아이콘 사이 간격
`;

const MenuButton = styled.img`
  background-size: contain;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default Header;
