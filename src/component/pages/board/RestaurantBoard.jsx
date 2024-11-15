import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../layout/header/Header";
import PostList from "../../board_01/PostList";
import MainHeader from "../../board_01/MainHeader";
import CreatePostButton from "../../board_01/CreatePostButton";
import Footer from "../../layout/footer/Footer";
import BoardActions from "../../layout/board/BoardActions";

function RestaurantBoard() {  
  const [selectedSort, setSelectedSort] = useState("등록 순");
  const category = "restaurant";

  return (
    <BoardContainer>
      <Header title="식당 게시판" color="#f4b183" actions={
        <BoardActions />
      }/>
      <MainContent>
        <MainHeader onSortChange={setSelectedSort} />
        <PostList selectedSort={selectedSort} category={category} />
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

export default RestaurantBoard;
