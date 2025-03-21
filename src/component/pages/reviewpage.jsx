import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchActions from "../ProfilePage/SearchActions";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import api from '../api/axios';

// ReviewListItem 컴포넌트
function ReviewListItem({ timestamp, title, content, onClick }) {
  return (
    <article className="review-item" onClick={onClick}>
      <div className="review-content">
        <time className="timestamp">{timestamp}</time>
        <h2 className="title">{title}</h2>
        <p className="description">{content}</p>
      </div>
      <div className="divider" />
    </article>
  );
}

// ReviewHistory 컴포넌트
function ReviewHistory() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleBackButtonClick = () => {
    navigate(-1); // 루트 경로로 이동
  };

  useEffect( ()=> {getUserInfo()}, []);

  
  const [boardList, setBoardList] = useState([]);

  const getUserInfo = async () => {
    try {
      const response = await api.get('/users/me/reviews');
      console.log(response.data);
      setBoardList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const stripHtmlTags = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const truncateContent = (content, length = 20) => {
    const textContent = stripHtmlTags(content);
    return textContent.length > length
      ? textContent.slice(0, length) + '...'
      : textContent;
  };

  return (
    <>
      <main className="review-history-page">
        <Header color="#fff4d2" title="남긴 리뷰" actions={<SearchActions />} />

        {/* <section className="sort-section">
          <button className="filter-button">
            <span className="sort-text">등록순</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
              alt=""
              className="sort-icon"
            />
          </button>
        </section> */}

        <section className="review-list">
          {boardList.map((post, index) => (
            <ReviewListItem onClick={() => navigate(`/board/PostPage/${post.board_id}`)}
              key={index}
              time={post.created_time}
              title={post.title}
              content={truncateContent(post.content)}
            />
          ))}
        </section>

        {/* Footer 추가 */}
        <Footer />
      </main>
      <style jsx>{`
        .review-history-page {
          display: flex;
          overflow: hidden;
          flex-direction: column;
          align-items: flex-start;
          width: 430px;
          background: #ffffff;
          margin: 0 auto;
          border: 0.5px solid #CAC4D0;
        }

        .sort-section {
          align-self: flex-end;
          margin: 27px 38px 0 0;
        }

        .sort-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .sort-text {
          color: #000;
          font: 400 13px/1 Roboto, sans-serif;
          margin-right: 4px;
        }

        .review-list {
          width: 100%;
          height: calc(100vh - 216px);  /* 화면 높이에 맞춰 계산된 높이 */
          padding: 20px;
          box-sizing: border-box;
          overflow-y: auto;  /* 세로 스크롤 추가 */
        }

        .review-list::-webkit-scrollbar {
          display: none;  /* 스크롤바 숨기기 */
        }

        .review-list {
          -ms-overflow-style: none;  /* IE 및 Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .review-item {
          background-color: #fff;
          margin-top: 11px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .review-content {
          padding: 4px 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .timestamp {
          color: #49454f;
          letter-spacing: 0.5px;
          font: 500 12px/16px Roboto, sans-serif;
        }

        .title {
          color: #1d1b20;
          letter-spacing: 0.5px;
          font: 16px/24px Roboto, sans-serif;
          margin: 4px 0;
        }

        .description {
          color: #49454f;
          letter-spacing: 0.25px;
          font: 14px/20px Roboto, sans-serif;
          margin: 0;
        }

        .divider {
          height: 1px;
          margin: 0 16px;
          background-color: #cac4d0;

        @media (max-width: 991px) {
          .review-header {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}

export default ReviewHistory;
