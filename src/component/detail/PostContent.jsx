import React, { useRef } from 'react';
import styled from 'styled-components';
import CommentSection from './CommentSection';
import CommentInput from './CommentInput';
import MainHeader from './MainHeader';
import parse from 'html-react-parser';
import SelectedBookmark from './SelectedBookmark';

function PostContent({
  post,
  category,
  detail,
  comments,
  fetchComments,
  bookmark,
}) {
  return (
    <PostContentWrapper>
      <MainHeader post={post} category={category} detail={detail} />
      <Divider />
      <PostBody className="ck-content">
        {post?.content ? parse(post.content) : '게시글 본문'}
      </PostBody>

      <SelectedBookmark bookmark={bookmark} />
      <Divider />
      <CommentCnt>댓글 {comments.length}</CommentCnt>
      <CommentSection
        comments={comments}
        detail={detail}
        fetchComments={fetchComments}
      />
      <CommentInput detail={detail} fetchComments={fetchComments} />
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

  -ms-overflow-style: none; /* IE 및 Edge */
  scrollbar-width: none; /* Firefox */
`;

const Divider = styled.hr`
  width: 100%;
  height: 2px;
  background-color: #fff;
  border: none;
  margin: 10px 0;
`;

const PostBody = styled.div`
  padding: 12px;
`;

const CommentCnt = styled.p`
  color: #000;
  text-align: left;
  margin-top: 10px;
  margin-left: 25px;
  font-size: 17px;
  font-weight: bold;
`;

export default PostContent;
