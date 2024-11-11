import React from "react";
import styled from "styled-components";

function PostList({ posts }) {
  return (
    <PostListContainer>
      <SortInfo>
        <SortText>등록순</SortText>
        <SortIcon aria-hidden="true" />
      </SortInfo>
      {posts.map((post, index) => (
        <PostItem key={index}>
          <PostMeta>{post.time} | {post.nickname} ({post.grade})</PostMeta>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
        </PostItem>
      ))}
    </PostListContainer>
  );
}

const PostListContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 395px;
  margin-top: 9px;
`;

const SortInfo = styled.div`
  align-self: flex-end;
  display: flex;
  margin-top: 9px;
  font-size: 13px;
  color: #000000;
  line-height: 1;
`;

const SortText = styled.span`
  margin-right: 5px;
`;

const SortIcon = styled.span`
  background: url("https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=075d8221b0dd488ba40080c6fa3dd46a") no-repeat center;
  background-size: contain;
  width: 13px;
  height: 13px;
`;

const PostItem = styled.article`
  background-color: #ffffff;
  min-height: 72px;
  margin-top: 11px;
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
`;

const PostContent = styled.p`
  color: #49454f;
  letter-spacing: 0.25px;
  font: 14px/20px Roboto, sans-serif;
`;

export default PostList;