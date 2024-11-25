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
  placeName
}) {
  console.log(placeName);
  return (
    <PostContentWrapper>
      <MainHeader post={post} category={category} detail={detail} />
      <Divider />
      <PostBody className="ck-content">
        {post?.content ? parse(post.content) : '게시글 본문'}

        {/* placeName이 유효할 때만 PlaceInfo 렌더링 */}
        {placeName?.placeName && placeName?.placeAddress && (
          <PlaceInfo>
            <SearchIcon
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fcb252fdc47c3a89bcef31a8dab9e2e588ee15370a4f80e9e91bff0c23c4df2?placeholderIfAbsent=true&apiKey=96b0aafc0bca4efc865afcf9a032943c"
              alt="Location"
            />
            {placeName.placeName}
            <br />
            {placeName.placeAddress}
          </PlaceInfo>
        )}
      </PostBody>

      {/* bookmark가 null 또는 undefined가 아닐 때만 SelectedBookmark 렌더링 */}
      {bookmark && <SelectedBookmark bookmark={bookmark} />}
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

const PlaceInfo = styled.div`
  color: #555555; /* 약간 회색 톤의 색상 */
  font-size: 14px; /* 읽기 좋은 크기 */
  font-weight: 500; /* 중간 굵기 */
  margin-top: 10px;
  line-height: 1.6; /* 줄 간격 조정 */
  text-align: left; /* 왼쪽 정렬 */
`;

const SearchIcon = styled.img`
  margin-top: 5px;
  width: 12px;
  height: 12px;
  object-fit: contain;
`;

export default PostContent;
