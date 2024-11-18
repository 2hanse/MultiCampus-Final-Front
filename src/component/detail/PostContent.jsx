import React, { useState } from "react";
import styled from "styled-components";
import CommentSection from "./CommentSection";
import CommentInput from "./CommentInput";
import MainHeader from "./MainHeader";

function PostContent({ post, category, detail }) {
  const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <PostContentWrapper>
      <MainHeader post={post} category={category} detail={detail}/>
      <Divider />
      <PostBody>{post ? post.content : "게시글 본문"}</PostBody>
      <CommentSection comments={comments} />
      <CommentInput onAddComment={handleAddComment} />
    </PostContentWrapper>
  );
}

const PostContentWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 430px;
  max-width: 430px;
  position: relative;
  height: auto;
  max-height: calc(100vh - 290px);
  box-sizing: border-box;
  margin-bottom: 100px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE 및 Edge */
  scrollbar-width: none;  /* Firefox */
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
