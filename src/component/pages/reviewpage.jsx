import * as React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/footer/Footer";

// ReviewListItem 컴포넌트
function ReviewListItem({ timestamp, title, content }) {
  return (
    <article className="review-item">
      <div className="review-content">
        <time className="timestamp">{timestamp}</time>
        <h2 className="title">{title}</h2>
        <p className="description">{content}</p>
      </div>
      <div className="divider" />
      
      <style jsx>{`
        .review-item {
          background-color: #fff;
          min-height: 72px;
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
        }
      `}</style>
    </article>
  );
}

// 리뷰 데이터
const reviewData = [
  {
    timestamp: "n분 전",
    title: "[동네주민] 게시글 제목",
    content: "게시글 본문(20자)"
  },
  {
    timestamp: "n분 전",
    title: "[동네주민] 게시글 제목",
    content: "게시글 본문(20자)"
  },
  {
    timestamp: "n분 전",
    title: "게시글 제목",
    content: "게시글 본문(20자)"
  },
  {
    timestamp: "n분 전",
    title: "게시글 제목",
    content: "게시글 본문(20자)"
  },
  {
    timestamp: "yy.mm.dd",
    title: "게시글 제목",
    content: "게시글 본문(20자)"
  },
  {
    timestamp: "yy.mm.dd",
    title: "게시글 제목",
    content: "게시글 본문(20자)"
  },
  {
    timestamp: "yy.mm.dd",
    title: "게시글 제목",
    content: "게시글 본문(20자)"
  }
];

// ReviewHistory 컴포넌트
function ReviewHistory() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleBackButtonClick = () => {
    navigate(-1); // 루트 경로로 이동
  };

  return (
    <>
      <main className="review-history-page">
        <header className="review-header">
          <button className="back-button" aria-label="Go back" onClick={handleBackButtonClick}>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="back-icon" />
          </button>
          <h1 className="review-title">남긴 리뷰</h1>
          <button className="search-button" aria-label="Close">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="close-icon" />
          </button>
        </header>
        
        <section className="sort-section">
          <button className="filter-button">
            <span className="sort-text">등록순</span>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="sort-icon" />
          </button>
        </section>

        <section className="review-list">
          {reviewData.map((review, index) => (
            <ReviewListItem key={index} {...review} />
          ))}
        </section>

        {/* Footer 추가 */}
        <Footer />

      </main>
      <style jsx>{`
        .review-history-page {
          background-color: #fff;
          display: flex;
          max-width: 430px;
          max-height: 932px;
          width: 100%;
          flex-direction: column;
          overflow: hidden;
          align-items: center;
          margin: 0 auto;
        }

        .review-header {
          background-color: #fff4d2;
          width: 100%;
          padding: 62px 26px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .back-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          padding-right: 50px; /* 기존 100px에서 50px로 줄임 */
          margin-left: 20px; /* 추가된 왼쪽 마진 */
        }

        .search-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          padding-left: 50px;
          margin-right: 30px;
        }

        .back-icon,
        .close-icon {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        .review-title {
          color: #000;
          text-align: center;
          font: 400 18px/1 Roboto, sans-serif;
          margin: 0;
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
          max-width: 395px;
        }


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
