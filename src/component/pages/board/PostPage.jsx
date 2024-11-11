import React from "react";
import styled from "styled-components";
import Header from "../../detail/Header";
import PostContent from "../../detail/PostContent";
import CommentSection from "../../detail/CommentSection";
import CommentInput from "../../detail/CommentInput";
import Footer from "../../layout/footer/Footer";

function PostPage() {
    return (
      <PostContainer>
        <Header />
        <PostContent />
        <CommentSection />
        <CommentInput />
        <Footer/>
      </PostContainer>
    );
  }
  
  const PostContainer = styled.main`
    background-color: #fff;
    display: flex;
    width: 430px;
    height: 932px;
    flex-direction: column;
    overflow-y: auto;
    font-weight: 400;
    margin: 0 auto;
    border: 0.5px solid #CAC4D0;
  `;
  
  export default PostPage;