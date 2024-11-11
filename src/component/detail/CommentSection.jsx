import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

// 댓글 데이터
const commentData = [
  {
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/7aa049a63a49daa442338f6c073ab1f0320563ac11d891cd30878f236c18bb24?placeholderIfAbsent=true&apiKey=075d8221b0dd488ba40080c6fa3dd46a",
    name: "닉네임 (회원등급)",
    content: "댓글 내용",
    timestamp: "yyyy.mm.dd hh:mm",
    isReply: false,
  },
  {
    avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/189580bfb42be8f316e1f742717deafb02a42128446703ebcd48e0accaafcda5?placeholderIfAbsent=true&apiKey=075d8221b0dd488ba40080c6fa3dd46a",
    name: "닉네임 (회원등급)",
    content: "댓글 내용",
    timestamp: "yyyy.mm.dd hh:mm",
    isReply: true,
  },
];

function CommentSection() {
  return (
    <CommentSectionWrapper>
      <Divider />
      <CommentCount>댓글 {commentData.length}</CommentCount>
      {commentData.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </CommentSectionWrapper>
  );
}

// 스타일 정의
const CommentSectionWrapper = styled.section`
  display: flex;
  margin-top: 107px;
  width: 100%;
  flex-direction: column;
  font-family: Roboto, sans-serif;
  line-height: 1;
  padding: 0 16px;
`;

const Divider = styled.hr`
  background: #cac4d0;
  height: 1px;
  border: none;
`;

const CommentCount = styled.h3`
  color: #000;
  font-size: 18px;
  text-align: center;
  align-self: start;
  margin: 23px 0 0 16px;
`;

export default CommentSection;
