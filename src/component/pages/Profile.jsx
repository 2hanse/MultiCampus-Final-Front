import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅을 임포트
import Footer from '../layout/footer/Footer';
// ProfileImage 컴포넌트
const ProfileImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="profile-image" />;
};

// ProfileStats 컴포넌트
const ProfileStats = () => {
  const stats = [
    { label: '게시물', value: 'N' },
    { label: '팔로우', value: 'N' },
    { label: '팔로워', value: 'N' },
  ];

  return (
    <div className="profile-stats">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/17c70c46cd6bb71b05cd93581bc2d83c1e7bb0955516a7b4f5baa99723121b6b?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="stats-icon" />
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            {stat.value}<br />{stat.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// ProfileHeader 컴포넌트
const ProfileHeader = ({ nickname, statusMessage }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 처리

  // back-button 클릭 시 myprofilepage로 이동
  const handleBackButtonClick = () => {
    navigate(-1); // 'myprofilepage'로 이동
  };

  // notifications-button 클릭 시 memberinfo로 이동
  const handleNotificationsButtonClick = (e) => {
    e.stopPropagation();
    navigate('/memberinfo'); // 'memberinfo'로 이동
  };

  return (
    <header className="profile-header">
      
      <div className="back-button" onClick={handleBackButtonClick}> {/* 클릭 이벤트 추가 */}
        <ProfileImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="Profile" />
        <h1 className="profile-nickname">{nickname}</h1>
        <button className="notifications-button" aria-label="Edit profile" onClick={(e)=>{handleNotificationsButtonClick(e)}}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/75a8b4cc620548771893340c85cf407976981dbfdc941c79c0a38b05d9f27b4e?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="edit-icon" />
        </button>
      </div>
      <hr className="divider" />
      <ProfileStats />
      <p className="profile-status">{statusMessage}</p>
      
    </header>
  );
};

// ProfileActions 컴포넌트
const ProfileActions = () => {
  const actions = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/89b61b15b519fe221e92df692e5820956878259d34838bb629e95066ac325275?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4", alt: "Action 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/596b40e055c6c3096f41336ca0531e628e401ac369dec262300bba7467721588?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4", alt: "Action 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b18b77b5d6ce2798eaa729bc37d9585e29111b1ff6db2012daebed19d8146a53?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4", alt: "Action 3" },
  ];

  return (
    <div className="profile-actions">
      {actions.map((action, index) => (
        <button key={index} className="action-button">
          <img src={action.src} alt={action.alt} className="action-icon" />
        </button>
      ))}
    </div>
  );
};

const reviewData = [
  { timestamp: "n분 전", title: "[동네주민] 게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "n분 전", title: "[동네주민] 게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "n분 전", title: "게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "n분 전", title: "게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "yy.mm.dd", title: "게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "yy.mm.dd", title: "게시글 제목", content: "게시글 본문(20자)" },
];

// ReviewListItem 컴포넌트
function ReviewListItem({ timestamp, title, content }) {
  return (
    <article className="review-item">
      <hr className="divider" />
      <time className="timestamp">{timestamp}</time>
      <h2 className="title">{title}</h2>
      <p className="description">{content}</p>
    </article>
  );
}

// ProfileContent 컴포넌트
const ProfileContent = () => {
  return (
    <main className="profile-content">
      <ProfileActions />
      <section className="review-list">
        {reviewData.map((review, index) => (
          <ReviewListItem key={index} {...review} />
        ))}
      </section>
      <Footer/>
    </main>
  );
};

// Profile 컴포넌트
const Profile = () => {
  return (
    <div className="profile-page">
      <ProfileHeader nickname="닉네임" statusMessage="상태 메시지" />
      <ProfileContent />
      <style jsx>{`
        .profile-page {
          background-color: #fff4d2;
          width: 430px;
          margin: 0 auto;
          padding-top: 49px;
          overflow: hidden;
          border: 1px solid gray;
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
        .profile-actions {
          display: flex;
          justify-content: center;
          gap: 30px; 
          margin-bottom: 12px;
        }
        .action-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .action-icon {
          width: 30px;
          height: 30px;
          object-fit: contain;
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
