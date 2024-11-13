import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../detail/Header";
import PostContent from "../../detail/PostContent";
import CommentInput from "../../detail/CommentInput";
import CommentSection from "../../detail/CommentSection";
import Footer from "../../layout/footer/Footer";
import MainHeader from "../../detail/MainHeader";

function PostPage() {
  const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <PageContainer>
      <Header />
      <MainHeader />
      <ContentContainer>
        <PostContent />
        <CommentSection comments={comments} />
      </ContentContainer>
      <CommentInput onAddComment={handleAddComment} />
      <Footer />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  height: 932px; 
  margin: 0 auto; /* 가운데 정렬 */
  border: 1px solid #ccc; 
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); 
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto; /* 스크롤 가능 */
  margin-top: 10px;
  padding: 0 px;
  height: calc(932px - 200px);
`;

export default PostPage;
