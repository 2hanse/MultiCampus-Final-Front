import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const examplePosts = [
  { time: "2023-11-12", nickname: "User1", grade: "Gold", title: "첫 번째 게시글", content: "이것은 첫 번째 게시글의 내용입니다." },
  { time: "2023-11-11", nickname: "User2", grade: "Silver", title: "두 번째 게시글", content: "두 번째 게시글의 내용입니다." },
  { time: "2023-11-10", nickname: "User3", grade: "Bronze", title: "세 번째 게시글", content: "세 번째 게시글의 내용입니다." },
  { time: "2023-11-09", nickname: "User4", grade: "Platinum", title: "네 번째 게시글", content: "네 번째 게시글의 내용입니다." },
  { time: "2023-11-08", nickname: "User5", grade: "Diamond", title: "다섯 번째 게시글", content: "다섯 번째 게시글의 내용입니다." },
  { time: "2023-11-07", nickname: "User6", grade: "Gold", title: "여섯 번째 게시글", content: "이것은 여섯 번째 게시글의 내용입니다." },
  { time: "2023-11-06", nickname: "User7", grade: "Silver", title: "일곱 번째 게시글", content: "일곱 번째 게시글의 내용입니다." },
  { time: "2023-11-05", nickname: "User8", grade: "Bronze", title: "여덟 번째 게시글", content: "여덟 번째 게시글의 내용입니다." },
  { time: "2023-11-04", nickname: "User9", grade: "Platinum", title: "아홉 번째 게시글", content: "아홉 번째 게시글의 내용입니다." },
  { time: "2023-11-03", nickname: "User10", grade: "Diamond", title: "열 번째 게시글", content: "열 번째 게시글의 내용입니다." }
];

function PostList ({ selectedSort, category }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [posts, setPosts] = useState(examplePosts);
  const [postlist, setpostlist] = useState([]);

  useEffect(() => {
    api.get(`/boards/list/${category}/0`)
    .then((res) => {
      console.log(res.data);
      setpostlist(res.data);
      console.log(postlist);
    });
  }, []);

  useEffect(() => {
    let sortedPosts = [...posts];
    if (selectedSort === '등록 순') {
      sortedPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else if (selectedSort === '좋아요 순') {
      sortedPosts.sort((a, b) => b.likes - a.likes || new Date(b.time) - new Date(a.time));
    } else if (selectedSort === '조회수 순') {
      sortedPosts.sort((a, b) => b.views - a.views || new Date(b.time) - new Date(a.time));
    }
    setPosts(sortedPosts);
  }, [selectedSort]);

  // 계산된 페이지 수
  const totalPages = Math.ceil(examplePosts.length / postsPerPage);

  // 현재 페이지에 해당하는 게시글 가져오기
  const currentPosts = examplePosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleTitleClick = (category) => {
    navigate("/board/PostPage", { state: { category } });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PostListContainer>
      <ScrollableContent>
        {currentPosts.map((post, index) => (
          <PostItem key={index}>
            <PostMeta>
              {post.time} | {post.nickname} ({post.grade}) | 조회수: {post.views || 0}
            </PostMeta>
            <PostTitle onClick={() => handleTitleClick(category)}>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
          </PostItem>
        ))}
      </ScrollableContent>
      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            isActive={currentPage === i + 1}
          >
            {i + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </PostListContainer>
  );
}

const PostListContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 430px;
  max-width: 430px;
  position: relative;
  height: auto;
  max-height: calc(100vh - 335px);;
  box-sizing: border-box;
  margin-bottom: 100px;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE 및 Edge */
  scrollbar-width: none;  /* Firefox */
`;

const ScrollableContent = styled.div`
  width: 100%;
  margin: 0;
`;

const PostItem = styled.article`
  background-color: #ffffff;
  width: 100%;
  min-height: 72px;
  margin-top: 0;
  padding: 4px 16px;
  border-bottom: 1px solid #cac4d0;
`;

const PostMeta = styled.p`
  color: #49454f;
  letter-spacing: 0.5px;
  font: 500 12px/16px Roboto, sans-serif;
`;

const PostTitle = styled.h3`
  color: #1d1b20;
  letter-spacing: 0.5px;
  font: 16px/24px Roboto, sans-serif;
  padding: 0 16px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PostContent = styled.p`
  color: #49454f;
  letter-spacing: 0.25px;
  font: 14px/20px Roboto, sans-serif;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const PageButton = styled.button`
  margin: 0 4px;
  padding: 4px 8px;
  background-color: ${({ isActive }) => (isActive ? "#ED6000" : "#ffffff")};
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#ED6000")};
  border: 1px solid #ED6000;
  border-radius: 4px;
  cursor: pointer;
  bottom: 160px

  &:hover {
    background-color: #F4B183;
    color: #ffffff;
  }
`;

export default PostList;
