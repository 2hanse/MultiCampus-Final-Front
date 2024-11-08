import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostItem({ time, title, content }) {
  return (
    <article className="post-item">
      <div className="post-content">
        <time className="post-time">{time}</time>
        <h2 className="post-title">{title}</h2>
        <p className="post-text">{content}</p>
      </div>
      <div className="post-divider" />
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/afbd365bb089aef0de187cc1a61c97cb2f9dd2b0f57d1dc9ae9adcd161da17f1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
        alt=""
        className="like-icon"
      />
    </article>
  );
}

export default function LikedPosts() {
  const navigate = useNavigate();
  const posts = [
    { time: 'n분 전', title: '[동네주민] 게시글 제목', content: '게시글 본문(20자)' },
    { time: 'n분 전', title: '[동네주민] 게시글 제목', content: '게시글 본문(20자)' },
    { time: 'n분 전', title: '게시글 제목', content: '게시글 본문(20자)' },
    { time: 'n분 전', title: '게시글 제목', content: '게시글 본문(20자)' },
    { time: 'yy.mm.dd', title: '게시글 제목', content: '게시글 본문(20자)' },
    { time: 'yy.mm.dd', title: '게시글 제목', content: '게시글 본문(20자)' },
    { time: 'yy.mm.dd', title: '게시글 제목', content: '게시글 본문(20자)' },
  ];

  return (
    <main className="liked-posts-page">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
            alt=""
          />
        </button>
        <h1 className="header-title">좋아요 누른 게시글</h1>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
          alt=""
          className="search-button" 
        />
      </header>

      <div className="sort-container">
        <button className="filter-button">
          <span className="sort-text">등록순</span>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="sort-icon" />
        </button>
      </div>

      <section className="post-list">
        {posts.map((post, index) => (
          <PostItem
            key={index}
            time={post.time}
            title={post.title}
            content={post.content}
          />
        ))}
      </section>

      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb717e0c0f0cfa324931c379390c6d597d7e19a8ae52107e48c0c335177a4d41?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
        alt=""
        className="navigation-bar"
      />
      <style jsx>{`
        .liked-posts-page {
          background: #fff;
          display: flex;
          max-width: 430px;
          width: 100%;
          flex-direction: column;
          overflow: hidden;
          align-items: center;
          margin: 0 auto;
        }

        .page-header {
          background: #fff4d2;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 62px 26px 25px;
          justify-content: space-between;
        }

        .back-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          padding-right: 50px;
          margin-left: 20px;
        }

        .search-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          padding-left: 50px;
          margin-right: 30px;
        }

        .header-title {
          color: #000;
          font: 400 18px/1 Roboto, sans-serif;
          text-align: center;
          margin-top: 15px;
        }

        .sort-container {
          display: flex;
          align-items: center;
          margin: 27px 38px 0 0;
          align-self: flex-end;
        }

        .sort-text {
          color: #000;
          font: 400 13px/1 Roboto, sans-serif;
          white-space: nowrap;
          text-align: center;
          z-index: 10;
        }

        .post-list {
          width: 100%;
          max-width: 395px;
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-top: 9px;
        }

        .navigation-bar {
          width: 100%;
          aspect-ratio: 4.29;
          object-fit: contain;
          margin-top: 82px;
        }

        .post-item {
          display: flex;
          width: 100%;
          background: #fff;
          padding: 4px 16px;
          min-height: 72px;
          position: relative;
        }

        .post-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 240px;
          overflow: hidden;
        }

        .post-time {
          color: #49454f;
          font: 500 12px/16px Roboto;
          letter-spacing: 0.5px;
        }

        .post-title {
          color: #1d1b20;
          font: 16px/24px Roboto;
          letter-spacing: 0.5px;
        }

        .post-text {
          color: #49454f;
          font: 14px/20px Roboto;
          letter-spacing: 0.25px;
        }

        .post-divider {
          width: 100%;
          height: 1px;
          background: #cac4d0;
          margin: 0 16px;
        }

        .like-icon {
          width: 25px;
          aspect-ratio: 1;
          object-fit: contain;
          margin-top: 23px;
        }
      `}</style>
    </main>
  );
}
