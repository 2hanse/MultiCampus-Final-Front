import React, { useState, useEffect } from "react";
import styled from "styled-components";
import chatbutton from "./asset/chat.png";
import likebutton from "./asset/like_button.png";
import { useNavigate } from "react-router-dom";

function PostContent() {
    const navigate = useNavigate();

    function gotoChatPage() {
        navigate(-1);
    };

    var likecount = 0 ;

    const likecountup = () => {
        likecount = likecount++;
    };
    

  return (
    <PostContentWrapper>
      <PostHeader>
        <BoardName>OO 게시판</BoardName>
        <PostTitle>게시글 제목</PostTitle>
        <AuthorInfo>
          <AuthorAvatar 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=075d8221b0dd488ba40080c6fa3dd46a" 
            alt="Author avatar" 
          />
          <AuthorDetails>
            <AuthorNameAndChat>
              <AuthorName>닉네임 (회원등급)</AuthorName>
              <ChatButton
                src={chatbutton}
                alt='chatbutton'
                onclick = {gotoChatPage}
              />   
            </AuthorNameAndChat>
            <PostMeta>yyyy.mm.dd hh:mm 조회 N</PostMeta>
          </AuthorDetails>
        </AuthorInfo>
      </PostHeader>
      <PostActions>
        <LikeSection>
          <LikeButton
            src={likebutton}
            alt="likebutton"
            onclick = {likecountup}
          />
          <span>{likecount}</span>
        </LikeSection>
        <SubscribeButton>
          <SubscribeIcon 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2adc3b6c26367a623b8d948e596acbc7158d6518862440d011583816c631e2b4?placeholderIfAbsent=true&apiKey=075d8221b0dd488ba40080c6fa3dd46a" 
            alt="Subscribe icon" 
          />
          <span>구독</span>
        </SubscribeButton>
      </PostActions>
      <Divider />
      <PostBody>게시글 본문</PostBody>
    </PostContentWrapper>
  );
}

const PostContentWrapper = styled.article`
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 430px;
  top: 120px;
  margin-top: 25px;
  font-family: Inter, sans-serif;
`;

const PostHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const BoardName = styled.div`
  color: #dfa67b;
  font-size: 18px;
`;

const PostTitle = styled.h2`
  color: #000;
  margin-top: 14px;
  font-size: 27px;
`;

const AuthorInfo = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
`;

const AuthorAvatar = styled.img`
  width: 60px;
  aspect-ratio: 1;
  object-fit: contain;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AuthorNameAndChat = styled.div`
  display: flex;
  gap: 11px;
`;

const AuthorName = styled.div`
  color: #000;
  font-size: 20px;
`;

const ChatButton = styled.img`
  background-size: contain;
  width: 42px;
  height: 15px;
  border: none;
  cursor: pointer;
`;

const PostMeta = styled.div`
  color: #757575;
  font-size: 15px;
  margin-top: 4px;
`;

const PostActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 32px;
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
`

const LikeButton = styled.img`
  background-size: contain;
  width: 25px;
  height: 25px;
  border: none;
  cursor: pointer;
`;

const SubscribeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 29px;
  padding: 11px 10px;
  font-size: 17px;
  color: #fff;
  background-color: #ffd966;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SubscribeIcon = styled.img`
  width: 13px;
  aspect-ratio: 1;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin-top: 22px;
  background-color: #cac4d0;
  border: none;
`;

const PostBody = styled.p`
  color: #000;
  text-align: center;
  margin-top: 106px;
  font-size: 20px;
`;

export default PostContent;
