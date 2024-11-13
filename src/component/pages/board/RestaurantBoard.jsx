import React from "react";
import styled from "styled-components";
import Header from "../../board_01/Header";
import PostList from "../../board_01/PostList";
import MainHeader from "../../board_01/MainHeader";
import CreatePostButton from "../../board_01/CreatePostButton";
import Footer from "../../layout/footer/Footer";


function RestaurantBoard() {  
  return (
    <BoardContainer>
      <Header />
      <MainContent>
        <MainHeader/>
        <PostList/>
      </MainContent>
      <CreatePostButton />
      <Footer />
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  height: 932px;
  margin: 0 auto;
  border: 1px solid #cac4d0;
  background-color: #ffffff;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1; // 남은 공간을 차지하도록 설정
  padding-top: 120px; // Header의 높이만큼 패딩
  padding-bottom: 80px; // Footer의 높이만큼 패딩
  overflow: hidden;
`;

export default RestaurantBoard;
