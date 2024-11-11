import React from "react";
import styled from "styled-components";
import backbutton from "./asset/arrow_back.png";
import searchbutton from "./asset/search.png";
import menubutton from "./asset/menu.png";
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
      <BoardTitle>지역 게시판</BoardTitle>
      <HeaderActions>
        <SearchButton src={searchbutton} alt='searchbutton' />
        <ProfileButton src={menubutton} alt='menubutton' />
      </HeaderActions>
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
`

const BackButton = styled.img`
  background-size: contain;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
`;

const BoardTitle = styled.h1`
  color: #000000;
  text-align: center;
  font: 400 18px/1 Roboto, sans-serif;
  margin-top: 18px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 17px;
`;

const SearchButton = styled.img`
  background-size: contain;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
`;

const ProfileButton = styled.img`
  background-size: contain;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
`;

export default Header;