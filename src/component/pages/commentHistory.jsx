import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import SearchActions from '../ProfilePage/SearchActions';
import api from '../api/axios';

function CommentItem({ timestamp, content, postTitle }) {
  return (
    <article className="comment-item">
      <div className="comment-content">
        <time className="timestamp">{timestamp}</time>
        <p className="comment-text">{content}</p>
        <p className="post-title">{postTitle}</p>
      </div>
      <div className="divider" />
    </article>
  );
}

export default function CommentHistory() {
  const navigate = useNavigate();

  useEffect( ()=> {getUserInfo()}, []);

  
  const [boardList, setBoardList] = useState([]);

  const getUserInfo = async () => {
    try {
      const response = await api.get('/users/me/comments');
      console.log(response.data);
      setBoardList(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const comments = [
    { timestamp: 'n분 전', content: '댓글 내용', postTitle: '게시글 제목' },
    { timestamp: 'n분 전', content: '댓글 내용', postTitle: '게시글 제목' },
    { timestamp: 'n분 전', content: '댓글 내용', postTitle: '게시글 제목' },
    { timestamp: 'n분 전', content: '댓글 내용', postTitle: '게시글 제목' },
    { timestamp: 'yy.mm.dd', content: '댓글 내용', postTitle: '게시글 제목' },
    { timestamp: 'yy.mm.dd', content: '댓글 내용', postTitle: '게시글 제목' },
    { timestamp: 'yy.mm.dd', content: '댓글 내용', postTitle: '게시글 제목' }
  ];

  return (
    <main className="comment-history-page">
      <Header color="#fff4d2" title="남긴 댓글" actions={
        <SearchActions/>
      } />
      <div className="sort-section">
        <button className="filter-button">
          등록순
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt=""
            className="sort-icon"
          />
        </button>
      </div>
      <section className="comment-list">
        {boardList.map((comments, index) => (
          <CommentItem
            key={index}
            time={comments.created_time}
            title={comments.title}
            content={comments.content}
          />
        ))}
      </section>
      <Footer /> {/* Footer 추가 */}
      <style jsx>{`
        .comment-history-page {
          display: flex;
          flex-direction: column;
          width: 430px;
          height: 932px;
          margin: 0 auto;
          border: 0.5px solid #CAC4D0;
          background: #ffffff;
          overflow: hidden;
          
          
        }

        .header-content {
          gap: 20px;
          display: flex;
          justify-content: space-between; /* 요소들을 가로로 배치 */
          max-width: 430px;
          align-items: center; /* 세로 중앙 정렬 */
        }

        .header-title {
          width: 60%;
        }

      
        .title {
          color: #000;
          text-align: center;
          margin-top: 15px;
          font: 400 18px/1 Roboto, sans-serif;
        }

        .sort-section {
          display: flex;
          color: #000;
          text-align: center;
          margin: 27px 38px 0 0;
          font: 400 13px/1 Roboto, sans-serif;
          align-self: flex-end;
        }

        .sort-text {
          flex-grow: 1;
          margin: auto 0;
        }

        .comment-list {
          width: 100%; /* 리스트 너비도 Footer에 맞춰서 조정 */
        }

        .comment-item {
          background-color: #fff;
          position: relative;
          display: flex;
          width: 100%; /* Footer에 맞추어 width를 100%로 설정 */
          flex-direction: column;
          justify-content: center;
          margin-top: 11px;
        }

        .comment-content {
          padding: 4px 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .timestamp {
          color: #49454f;
          letter-spacing: 0.5px;
          font: 500 12px/16px Roboto;
        }

        .comment-text {
          color: #1d1b20;
          letter-spacing: 0.5px;
          font: 16px/24px Roboto;
        }

        .post-title {
          color: #49454f;
          letter-spacing: 0.25px;
          font: 14px/20px Roboto;
        }

        .divider {
          padding: 0 16px;
          border-bottom: 1px solid #cac4d0;
        }

      `}</style>
    </main>
  );
}
