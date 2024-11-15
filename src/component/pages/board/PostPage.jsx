import React from "react";
import styled from "styled-components";
import Header from "../../layout/header/Header";
import PostContent from "../../detail/PostContent";
import DetailActions from "../../detail/DetailActions";
import Footer from "../../layout/footer/Footer";
import { useLocation } from "react-router-dom";

function PostPage() {
  const location = useLocation();
  const { post, category } = location.state || {};

  return (
    <PageContainer>
      <Header title={`${post ? post.nickname : "(닉네임)"} 님의 게시글`} color="#f4b183"actions={
        <DetailActions />
      }/>
      <ContentContainer>
        <PostContent post={post} category={category} />
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  height: auto;
  min-height: 100vh;
  margin: 0 auto; /* 가운데 정렬 */
  border: 0.5px solid #CAC4D0;
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
