import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function PostList ({ selectedSort, category, address, distance }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postlist, setpostlist] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBoards = () => {
    api.get(`/boards/list/${category}/${currentPage - 1}?address=${address}&radius=${distance}`)
      .then((res) => {
        console.log(res.data.boards);
        setpostlist(res.data.boards || []);
        setTotalPages(res.data.pageCount);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  };

  useEffect(() => {
    fetchBoards();
    console.log(address);
  }, [category, currentPage, address, distance]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageButtons = () => {
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageButton
          key={i}
          onClick={() => handlePageChange(i)}
          isActive={currentPage === i}
        >
          {i}
        </PageButton>
      );
    }
    return pageNumbers;
  };
  

  const extractFirstImage = (content) => {
    const imgTagMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgTagMatch ? imgTagMatch[1] : null;
  };  

  const handleTitleClick = (post) => {
    // 백엔드에서 조회수 증가 api가 없으면 로컬에서 밖에 수정이 안됨 <-매번 view_cnt값이 초기화됨
    
    // 페이지 이동
    console.log(post);
    navigate(`/board/PostPage/${post.board_id}`);
  };

  function truncateContent(content, length = 20) {
    return content.length > length ? content.slice(0, length) + "..." : content;
  }

  return (
    <PostListContainer>
      <ScrollableContent>
        {postlist.map((post) => {
          const firstImageUrl = extractFirstImage(post.content);
          let membership = "빈공기";
          if (post.member_score >= 10 && post.member_score < 30) {
            membership = "한공기";
          } else if (post.member_score >= 30 && post.member_score < 50) {
            membership = "두공기";
          } else if (post.member_score >= 50 && post.member_score < 100) {
            membership = "세공기";
          } else if (post.member_score >= 100) {
            membership = "네공기";
          }

          return (
            <PostItem key={post.board_id}>
              <PostMeta>
                {post.created_time} | {post.nickname} ({membership}) | 조회수: {post.view_cnt}
              </PostMeta>
              {firstImageUrl && <PreviewImage src={firstImageUrl} alt="게시글 미리보기 이미지" onClick={() => handleTitleClick(post)} />}
              <PostTitle onClick={() => handleTitleClick(post)}>{post.title}</PostTitle>
              <PostContent>{truncateContent(post.content)}</PostContent>
            </PostItem>
          );
        })}
      </ScrollableContent>
      <PaginationContainer>
        <PageButton onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          &lt;&lt;
        </PageButton>
        <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </PageButton>
        {renderPageButtons()}
        <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </PageButton>
        <PageButton onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
          &gt;&gt;
        </PageButton>
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

const PreviewImage = styled.img`
  max-height: 100px;
  object-fit: cover;
  cursor: pointer;
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
