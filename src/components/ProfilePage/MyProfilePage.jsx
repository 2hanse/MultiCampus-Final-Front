import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import ImageComponent from './ImageComponent';

function Stats() {
  const navigate = useNavigate();

  const stats = [
    { number: "N", label: "게시글", onClick: () => navigate("/user-profile") },
    { number: "N", label: "리뷰", onClick: () => navigate("/review-history") },
    { number: "N", label: "댓글", onClick: () => navigate("/comment-history") },
    { number: "N/N", label: "팔로우/팔로워", onClick: () => navigate("/user-profile") },
    { number: "N", label: "북마크", onClick: () => navigate("/user-profile") },
    { number: "N", label: "좋아요 게시글", onClick: () => navigate("/liked-posts") },
  ];

  return (
    <>
      <section className="stats-container">
        {stats.slice(0, 3).map((stat, index) => (
          <div key={index} className="stat-box" onClick={stat.onClick}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>
      <section className="stats-container">
        {stats.slice(3).map((stat, index) => (
          <div key={index} className="stat-box" onClick={stat.onClick}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>
    </>
  );
}

function Receipts() {
  return (
    <section className="receipts-container">
      <Link to="/receipt-collection" className="stat-box">
        <div className="stat-number">2</div>
        <div className="stat-label">영수증</div>
      </Link>
      <div className="stat-box">
        <div className="stat-number">1</div>
        <div className="stat-label">위치 인증</div>
      </div>
    </section>
  );
}

export default function MyProfilePage() {
  return (
    <main className="profile-page">
      <div className="profile-content">
        <Header />
        
        <div className="bottom-row">
          <div className="nickname-container">
            <ImageComponent />
            <h1 className="nickname">닉네임</h1>
          </div>
          <div className="member-level-container">
            <div className="member-level">(회원 등급)</div>
          </div>
        </div>
        
        <Stats />
        <Receipts />
        <button className="logout-button">로그아웃</button>
      </div>
      <Footer />
      <style jsx>{`
        .profile-page {
          background-color: #fff4d2;
          display: flex;
          flex-direction: column;
          max-width: 100vw;
          height: 100vh;
          padding-top: 62px;
          overflow: hidden;
          font-family: Inter, sans-serif;
          color: #000;
          font-weight: 400;
          margin: 0 auto;
        }

        .profile-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
          padding: 0 28px;
        }

        .logout-button {
          color: #ce9971;
          font-size: 16px;
          text-align: center;
          margin-bottom: 10px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .bottom-row {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          width: 100%;
        }
        .nickname-container {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-grow: 1;
        }
        .nickname {
          font-size: 20px;
          font-weight: bold;
        }
        .member-level-container {
          display: flex;
          justify-content: flex-end;
        }
        .member-level {
          font-size: 16px;
          color: #555;
        }

        .stats-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          gap: 20px;
          width: 100%;
        }

        .stat-box {
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          padding: 10px;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }

        .stat-box:hover {
          background-color: #f0f0f0;
        }

        .stat-number {
          font-size: 20px;
        }

        .stat-label {
          font-size: 14px;
          margin-top: 8px;
        }

        .receipts-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          gap: 30px;
          width: 100%;
          height: auto;
        }
      `}</style>
    </main>
  );
}
