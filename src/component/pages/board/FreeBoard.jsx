import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../layout/header/board/Header";
import PostList from "../../board_01/PostList";
import MainHeader from "../../board_01/MainHeader";
import CreatePostButton from "../../board_01/CreatePostButton";
import Footer from "../../layout/footer/Footer";
import BoardActions from "../../board_01/BoardActions";
import logo from "../../board_01/asset/free.png";
import { getUserIdFromToken } from "../../api/jwt";

function RestaurantBoard() {  
  const [selectedSort, setSelectedSort] = useState("등록 순");
  const category = "free";
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState('');
  const localUserId = getUserIdFromToken();

  const handleReceiveAddress = (receivedAddress) => {
    setAddress(receivedAddress);
    console.log('Address from MainHeader:', receivedAddress);
  };

  const handleReceiveDistance = (receivedDistance) => {
    setDistance(receivedDistance);
    console.log('Distance from MainHeader:', receivedDistance);
  };

  return (
    <BoardContainer>
      <Header 
        title={
          <TitleContainer>
            <Logo src={logo} alt="로고" /> 자유 게시판
          </TitleContainer>
        } 
        color="#FFF4D2" 
        actions={<BoardActions category={category} />}
      />
      <MainContent>
        <MainHeader category={category} onSortChange={setSelectedSort} onReceiveAddress={handleReceiveAddress} onReceiveDistance={handleReceiveDistance}/>
        <PostList selectedSort={selectedSort} category={category} address={address} distance={distance} />
      </MainContent>
      {
        localUserId == null ? null : <CreatePostButton category={category} />
      }
      <Footer />
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  height: auto;
  min-height: 100vh;
  margin: 0 auto;
  border: 0.5px solid #CAC4D0;
  background-color: #ffffff;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1; // 남은 공간을 차지하도록 설정
  padding-top: 120px; // Header의 높이만큼 패딩
  padding-bottom: 80px; // Footer의 높이만큼 패딩
  overflow: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 60px;
  height: auto;
  margin-right: 10px;
`;

export default RestaurantBoard;
