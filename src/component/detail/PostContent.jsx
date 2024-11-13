import React from "react";
import styled from "styled-components";

function PostContent() {
  return (
    <PostContentWrapper>
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
  font-family: Inter, sans-serif;
  overflow: auto;
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
  margin-top: 10px;
  font-size: 20px;
`;

export default PostContent;
