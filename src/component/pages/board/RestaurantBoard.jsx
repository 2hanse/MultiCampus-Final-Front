import React from "react";
import styled from "styled-components";
import Header from "../../board_01/Header";
import CategoryTabs from "../../board_01/CategoryTabs";
import HotPost from "../../board_01/HotPost";
import PostList from "../../board_01/PostList";
import CreatePostButton from "../../board_01/CreatePostButton";
import Footer from "../../layout/footer/Footer";

function RestaurantBoard() {
  const posts = [
    {
      time: "n분 전",
      nickname: "닉네임",
      grade: "회원등급",
      title: "[동네주민] 게시글 제목",
      content: "게시글 본문(20자)"
    },
    {
      time: "n분 전",
      nickname: "닉네임",
      grade: "회원등급",
      title: "[동네주민] 게시글 제목",
      content: "게시글 본문(20자)"
    },
    {
      time: "n분 전",
      nickname: "닉네임",
      grade: "회원등급",
      title: "게시글 제목",
      content: "게시글 본문(20자)"
    },
    {
      time: "n분 전",
      nickname: "닉네임",
      grade: "회원등급",
      title: "게시글 제목",
      content: "게시글 본문(20자)"
    },
    {
      time: "yy.mm.dd",
      nickname: "닉네임",
      grade: "회원등급",
      title: "게시글 제목",
      content: "게시글 본문(20자)"
    },
    {
      time: "yy.mm.dd",
      nickname: "닉네임",
      grade: "회원등급",
      title: "게시글 제목",
      content: "게시글 본문(20자)"
    },
    {
      time: "yy.mm.dd",
      nickname: "닉네임",
      grade: "회원등급",
      title: "게시글 제목",
      content: "게시글 본문(20자)"
    },
  ];

  return (
    <BoardContainer>
      <Header />
      <main>
        <CategoryTabs />
        <HotPost />
        <PostList posts={posts} />
      </main>
      <CreatePostButton />
      <Footer />
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  width: 430px;
  height: 932px;
  flex-direction: column;
  overflow: hidden;
  align-items: flex-start;
  margin: 0 auto;
  border: 0.5px solid #CAC4D0;
`;

export default RestaurantBoard;