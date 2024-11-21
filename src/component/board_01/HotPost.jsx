import React, { useEffect, useState } from "react";
import styled from "styled-components";
import hot_post from "./asset/hot_post.png"; // 핫게시물 아이콘
import thumbs_up from "./asset/thumbs_up.png"; // 좋아요 아이콘
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function HotPost(category) {
  const navigate = useNavigate();
  const [hotpost, sethotpost] = useState();
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    api.get(`/boards/hot-posts`)
    .then((res) => {
      if (res.data) {
        sethotpost(res.data[0]);
        api.get(`/boards/${res.data[0]?.board_id}`)
        .then((res) => {
          setLikes(res.data.likes);
        })
        .catch(() => {
          console.log("no hot post data");
        });
      }
    });
  }, []);

  const handleTitleClick = () => {
    navigate(`/board/PostPage/${hotpost.board_id}`);
  };

  return (
    <HotPostContainer onClick={handleTitleClick}>
      <HotIcon src={hot_post} alt="Hot Post Icon" />
      <HotPostContent>
        {hotpost ? (
          <>
            <HotPostTitle>{hotpost.title}</HotPostTitle>
            <LikeInfo>
              <LikeIcon src={thumbs_up} alt="Thumbs Up Icon" />
              <LikeCount>{likes}</LikeCount>
            </LikeInfo>
          </>
        ) : (
          <span>Loading...</span>
        )}
      </HotPostContent>
    </HotPostContainer>
  );
}

const HotPostContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 356px;
  height: 40px;
  background-color: #ffd966;
  border-radius: 20px;
  padding: 0 10px;
  margin: 20px auto 5px auto;
  gap: 10px;
  cursor: pointer;
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
  font-size: 13px;
`;

const HotPostTitle = styled.h2`
  font-size: 13x;
  margin: 0;
`;

const LikeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LikeIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const LikeCount = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-right: 10px;
`;

export default HotPost;
