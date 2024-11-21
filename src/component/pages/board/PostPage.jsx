import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../layout/header/Header';
import PostContent from '../../detail/PostContent';
import DetailActions from '../../detail/DetailActions';
import Footer from '../../layout/footer/Footer';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

function PostPage() {
  const [detail, setDetail] = useState([]);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const { board_id } = useParams();
  const [bookmark_id, setBookmark_id] = useState(undefined);
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    if (bookmark_id) {
      getBookmark();
    }
  }, [bookmark_id]);

  const getBookmark = async () => {
    const bookmarkRes = await api.get(`/bookmarks/${bookmark_id}`);
    setBookmark(bookmarkRes.data);
    console.log('북마크 데이터 : ', bookmarkRes.data);
  };

  const fetchdetail = () => {
    api
      .get(`/boards/${board_id}`)
      .then((res) => {
        setPost(res.data.board);
        setComments(res.data.comments);
        setDetail(res.data);
        setBookmark_id(res.data.board.bookmark_id);
        console.log('게시글 아이디 출력:', board_id);
        console.log(res.data);
        console.log('북마크 아이디 출력 : ', res.data.board.bookmark_id);
      })
      .catch((error) => {
        console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
        alert('게시글 데이터를 불러올 수 없습니다.');
      });
  };

  const fetchComments = () => {
    api
      .get(`/boards/${board_id}`)
      .then((res) => {
        console.log('댓글 가져오기 :', res.data.comments);
        setComments(res.data.comments);
      })
      .catch((error) => {
        console.error('댓글 데이터를 불러오는 중 오류 발생:', error);
        alert('댓글 데이터를 불러올 수 없습니다.');
      });
  };

  useEffect(() => {
    fetchdetail();
  }, []);

  return (
    <PageContainer>
      <Header
        title={`${detail?.user?.nickname} 님의 게시글`}
        color="#f4b183"
        actions={<DetailActions post={post} category={post.category} />}
      />
      <ContentContainer>
        <PostContent
          post={post}
          category={post.category}
          detail={detail}
          comments={comments}
          fetchComments={fetchComments}
          bookmark={bookmark}
        />
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  height: auto;
  min-height: 100vh;
  margin: 0 auto; /* 가운데 정렬 */
  border: 0.5px solid #cac4d0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto; /* 스크롤 가능 */
  margin-top: 10px;
  padding: 0 px;
  height: calc(932px - 200px);
`;

export default PostPage;
