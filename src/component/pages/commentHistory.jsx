import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트

function CommentItem({ timestamp, content, postTitle }) {
  return (
    <article className="comment-item">
      <div className="comment-content">
        <time className="timestamp">{timestamp}</time>
        <p className="comment-text">{content}</p>
        <p className="post-title">{postTitle}</p>
      </div>
      <div className="divider" />

      <style jsx>{`
        .comment-item {
          background-color: #fff;
          position: relative;
          display: flex;
          min-height: 72px;
          width: 100%;
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
    </article>
  );
}

export default function CommentHistory() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성

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
      <header className="header-section">
        <div className="header-content">
          <div className="back-button" onClick={() => navigate(-1)}> {/* 클릭 시 이전 페이지로 이동 */}
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="icon" />
          </div>
          <div className="header-title">
            <h1 className="title">남긴 댓글</h1>
          </div>
          <div className="search-button">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="icon" />
          </div>
        </div>
      </header>

      <div className="sort-section">
        <button className="filter-button">
          <span className="sort-text">등록순</span>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="sort-icon" />
        </button>
      </div>

      <section className="comment-list">
        {comments.map((comment, index) => (
          <CommentItem
            key={index}
            timestamp={comment.timestamp}
            content={comment.content}
            postTitle={comment.postTitle}
          />
        ))}
      </section>

      <footer>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb717e0c0f0cfa324931c379390c6d597d7e19a8ae52107e48c0c335177a4d41?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="footer-image" />
      </footer>

      <style jsx>{`
        .comment-history-page {
          background-color: #fff;
          display: flex;
          max-width: 430px; /* 너비를 430px로 조정 */
          width: 100%;
          max-height: 932px; /* 최대 높이 932px */
          min-height: 632px; /* 최소 높이 632px */
          height: auto;
          flex-direction: column;
          overflow: hidden;
          align-items: center;
          margin: 0 auto;
        }

        .header-section {
          background-color: #fff4d2;
          width: 100%;
          padding: 62px 26px 25px;
        }

        .header-content {
          gap: 20px;
          display: flex;
        }

        .back-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          padding-right: 50px;
          margin-left: 20px;
        }

        .header-title {
          width: 60%;
        }

        .search-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          padding-left: 50px;
          margin-right: 30px;
        }

        .icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 24px;
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
          width: 100%;
          max-width: 395px;
        }

        .footer-image {
          aspect-ratio: 4.29;
          object-fit: contain;
          object-position: center;
          width: 100%;
          align-self: stretch;
          margin-top: 82px;
        }

        @media (max-width: 991px) {
          .header-content {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }

          .back-button,
          .header-title,
          .search-button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
