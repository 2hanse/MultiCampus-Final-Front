import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchActions from '../ProfilePage/SearchActions';
import Footer from '../layout/footer/Footer'; // Import Footer component
import Header from '../layout/header/Header';
import api from '../api/axios';

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

function LikedPosts() {
  const navigate = useNavigate();
  useEffect( ()=> {getUserInfo()}, []);

  
  const [boardList, setBoardList] = useState([]);

  const getUserInfo = async () => {
    try {
      const response = await api.get('/users/me/liked-boards');
      console.log(response.data);
      setBoardList(response.data);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <main className="liked-posts-page">
      <Header color="#fff4d2" title="좋아요 누른 게시글" actions={
      <SearchActions/>
      }/>
      <div className="sort-container">
        <button className="filter-button">
          <span className="sort-text">등록순</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt=""
            className="sort-icon"
          />
        </button>
      </div>
      <section className="post-list">
        {boardList.map((post, index) => (
          <PostItem
            key={index}
            time={post.created_time}
            title={post.title}
            content={post.content}
          />
        ))}
      </section>
      <Footer /> {/* Add Footer component here */}
      <style jsx>{`
        .liked-posts-page {
          display: flex;
          overflow: hidden;
          flex-direction: column;
          align-items: flex-start;
          width: 430px;
          background: #ffffff;
          margin: 0 auto;
          border: 0.5px solid #cac4d0;
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

export default LikedPosts;