import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchActions from '../ProfilePage/SearchActions';
import Footer from '../layout/footer/Footer';
import Header from '../layout/header/Header';
import api from '../api/axios';

function PostItem({ time, title, content }) {
  return (
    <StyledPostItem>
      <PostContent>
        <time className="post-time">{time}</time>
        <h2 className="post-title">{title}</h2>
        <p className="post-text">{content}</p>
      </PostContent>
      <PostDivider />
      <LikeIcon 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/afbd365bb089aef0de187cc1a61c97cb2f9dd2b0f57d1dc9ae9adcd161da17f1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
        alt=""
      />
    </StyledPostItem>
  );
}

function LikedPosts() {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await api.get('/users/me/liked-boards');
      setBoardList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Main>
      <Header
        color="#fff4d2"
        title="좋아요 누른 게시글"
        actions={<SearchActions />}
      />
      <SortContainer>
        <FilterButton>
          <span className="sort-text">등록순</span>
          <SortIcon
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt=""
          />
        </FilterButton>
      </SortContainer>
      <PostList>
        {boardList.map((post, index) => (
          <PostItem
            key={index}
            time={post.created_time}
            title={post.title}
            content={post.content}
          />
        ))}
      </PostList>
      <Footer />
    </Main>
  );
}

// Styled Components
const Main = styled.main`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  width: 430px;
  background: #ffffff;
  margin: 0 auto;
  border: 0.5px solid #CAC4D0;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 27px 38px 0 0;
  align-self: flex-end;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  .sort-text {
    color: #000;
    font: 400 13px/1 Roboto, sans-serif;
    white-space: nowrap;
    text-align: center;
    z-index: 10;
  }
`;

const SortIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const PostList = styled.section`
 width: 100%;
  height: calc(100vh - 216px);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE 및 Edge */
  scrollbar-width: none;  /* Firefox */
`;

const StyledPostItem = styled.article`
  display: flex;
  width: 100%;
  background: #fff;
  padding: 4px 16px;
  min-height: 72px;
  position: relative;
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 240px;
  overflow: hidden;

  .post-time {
    color: #49454f;
    font: 500 12px/16px Roboto;
    letter-spacing: 0.5px;
  }

  .post-title {
    color: #1d1b20;
    font: 16px/24px Roboto;
    letter-spacing: 0.5px;
  }

  .post-text {
    color: #49454f;
    font: 14px/20px Roboto;
    letter-spacing: 0.25px;
  }
`;

const PostDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #cac4d0;
  margin: 0 16px;
`;

const LikeIcon = styled.img`
  width: 25px;
  aspect-ratio: 1;
  object-fit: contain;
  margin-right: 20px;
`;

export default LikedPosts;
