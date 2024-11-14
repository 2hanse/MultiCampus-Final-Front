import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅을 임포트
import Footer from '../layout/footer/Footer';
import Header from '../layout/header/Header';

// ProfileImage 컴포넌트
const ProfileImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="profile-image" />;
};

// ProfileStats 컴포넌트
const ProfileStats = ({ stats, userImage }) => {
  return (
    <div className="profile-stats">
      <img src={userImage} alt="" className="stats-icon" />
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            {stat.value}
            <br />
            {stat.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// ProfileHeader 컴포넌트
const ProfileHeader = ({ userImage, stats, nickname, statusMessage }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 처리

  // back-button 클릭 시 myprofilepage로 이동
  const handleBackButtonClick = () => {
    navigate(-1); // 'myprofilepage'로 이동
  };

  // notifications-button 클릭 시 memberinfo로 이동
  const handleNotificationsButtonClick = (e) => {
    e.stopPropagation();
    navigate('/myprofilepage'); // 'memberinfo'로 이동
  };

  return (
    <header className="profile-header">
      <div className="back-button" onClick={handleBackButtonClick}>
        {' '}
        {/* 클릭 이벤트 추가 */}
        <ProfileImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="Profile"
        />
        <h1 className="profile-nickname">{nickname}</h1>
        <button
          className="notifications-button"
          aria-label="Edit profile"
          onClick={(e) => {
            handleNotificationsButtonClick(e);
          }}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/75a8b4cc620548771893340c85cf407976981dbfdc941c79c0a38b05d9f27b4e?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt=""
            className="edit-icon"
          />
        </button>
      </div>
      <hr className="divider" />
      <ProfileStats userImage={userImage} stats={stats} />
      <p className="profile-status">{statusMessage}</p>
    </header>
  );
};



// ReviewListItem 컴포넌트
function ReviewListItem({ created_time, title, content }) {
  return (
    <article className="review-item">
      <hr className="divider" />
      <time className="timestamp"> 작성일 : {created_time}</time>
      <h2 className="title"> {title}</h2>
      <p className="description">{content.slice(0, 20)} ... </p>
    </article>
  );
}

// ProfileContent 컴포넌트
const ProfileContent = ({ reviewData }) => {
  return (
    <main className="profile-content">
      <section className="review-list">
        {reviewData.map((review, index) => (
          <ReviewListItem key={index} {...review} />
        ))}
      </section>
      <Footer />
    </main>
  );
};

// Profile 컴포넌트
const Profile = () => {
  useEffect(() => {
    getUserInfo();
    getReviewBoard();
  }, []);

  const [nickname, setNickname] = useState('닉네임');
  const [userImage, setUserImage] = useState(
    'https://cdn.builder.io/api/v1/image/assets/TEMP/17c70c46cd6bb71b05cd93581bc2d83c1e7bb0955516a7b4f5baa99723121b6b?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4'
  );

  const [countBoard, setCountBoard] = useState(0);
  const [countFollow, setCountFollow] = useState(0);
  const [countFoller, setCountFoller] = useState(0);
  const [statusMessage, setStatusMessage] = useState('상태 메시지');

  const [reviewData, setReviewData] = useState([]);

  const stats = [
    { label: '게시물', value: countBoard },
    { label: '팔로우', value: countFollow },
    { label: '팔로워', value: countFoller },
  ];

  const getUserInfo = async () => {
    try {
      const response = await api.get('/users/me/stats');
      console.log(response.data);
      setCountBoard(response.data.boardCount);
      setCountFollow(response.data.followerCount);
      setCountFoller(response.data.followingCount);
      setNickname(response.data.nickname);
      setUserImage(response.data.profileImgUrl);
      setStatusMessage(response.data.bio_msg);
    } catch (err) {
      console.log(err);
    }
  };

  const getReviewBoard = async () => {
    try {
      const response = await api.get(`/users/me/writed-boards`);
      console.log(response.data);
      setReviewData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profile-page">
      <ProfileHeader
        stats={stats}
        nickname={nickname}
        statusMessage={statusMessage}
        userImage={userImage}
      />
      <ProfileContent reviewData={reviewData} />
      <style jsx>{`
        .profile-page {
          overflow: hidden;
          flex-direction: column;
          align-items: flex-start;
          width: 430px;
          max-height: 932px;
          min-height: 732px;
          background: #fff4d2;
          margin: 0 auto;
          border: 0.5px solid #cac4d0;
        }
        .profile-header {
          padding: 0 28px;
          color: #000;
          font: 400 17px Inter, sans-serif;
        }
        .back-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
          cursor: pointer;
        }
        .profile-image {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        .profile-nickname {
          font: 18px/1 Roboto, sans-serif;
          margin: 0;
        }
        .divider {
          border: 0;
          height: 1px;
          background-color: #ddd; /* 구분선 색상 */
          margin: 20px 0; /* 위아래 여백 추가 */
        }
        .notifications-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .edit-icon {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        .profile-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
        }
        .stats-icon {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }
        .stats-container {
          display: flex;
          gap: 35px;
          align-items: center;
        }
        .stat-item {
          text-align: center;
          width: 56px;
        }
        .profile-status {
          margin: 0;
        }
        .profile-content {
          background-color: #fff;
          padding: 16px 0;
          margin-top: 86px;
        }

        .content-image {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .review-list {
          width: 100%;
          max-width: 395px;
          padding-top: 20px;
        }
        .review-item {
          background-color: #fff;
          min-height: 72px;
          margin-top: 11px;
          padding: 4px 16px;
          display: flex;
          flex-direction: column;
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
      `}</style>
    </div>
  );
};

export default Profile;
