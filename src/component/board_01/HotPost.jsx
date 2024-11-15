import React from "react";
import styled from "styled-components";
import hot_post from "./asset/hot_post.png"; // 핫게시물 아이콘
import thumbs_up from "./asset/thumbs_up.png"; // 좋아요 아이콘
import { useNavigate } from "react-router-dom";

function HotPost() {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate("/board/PostPage");
  };

  return (
    <HotPostContainer>
      <HotIcon src={hot_post} alt="Hot Post Icon" />
      <HotPostContent>
        <HotPostTitle onClick={handleTitleClick}>(핫게시물 제목)</HotPostTitle>
        <LikeInfo>
          <LikeIcon src={thumbs_up} alt="Thumbs Up Icon" />
          <LikeCount>좋아요 수</LikeCount>
        </LikeInfo>
      </HotPostContent>
    </HotPostContainer>
  );
}

const HotPostContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 356px;
  height: 31px;
  background-color: #ffd966;
  border-radius: 15px;
  padding: 0 10px;
  margin: 20px auto 5px auto;
  gap: 10px;
`;

const HotIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const HotPostContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
  color: #ffffff;
  font-size: 12px;
`;

const HotPostTitle = styled.h2`
  font-size: 12px;
  margin: 0;
  cursor: pointer; // 클릭 가능한 스타일
  &:hover {
    text-decoration: underline; // 호버 시 강조 효과
  }
`;

const LikeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LikeIcon = styled.img`
  width: 12px;
  height: 12px;
`;

const LikeCount = styled.span`
  font-size: 12px;
  color: #ffffff;
`;

export default HotPost;
