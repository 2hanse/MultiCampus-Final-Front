import React from 'react';

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
  return (
    <header className="profile-header">
      <div className="profile-top">
        <ProfileImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="Profile" />
        <h1 className="profile-nickname">{nickname}</h1>
        <button className="edit-profile-button" aria-label="Edit profile">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/75a8b4cc620548771893340c85cf407976981dbfdc941c79c0a38b05d9f27b4e?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="edit-icon" />
        </button>
      </div>
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

// ProfileContent 컴포넌트
const ProfileContent = () => {
  return (
    <main className="profile-content">
      <ProfileActions />
      <hr className="content-divider" />
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb717e0c0f0cfa324931c379390c6d597d7e19a8ae52107e48c0c335177a4d41?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="Profile content" className="content-image" />
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
          max-width: 480px;
          width: 100%;
          margin: 0 auto;
          padding-top: 62px;
          overflow: hidden;
        }
        .profile-header {
          padding: 0 28px;
          color: #000;
          font: 400 17px Inter, sans-serif;
        }
        .profile-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 50px;
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
        .edit-profile-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .edit-icon {
          width: 15px;
          height: 18px;
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
          gap: 20px;
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
        .content-divider {
          border: none;
          height: 1px;
          background-color: #cac4d0;
          margin: 0 0 12px;
        }
        .content-image {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
};

export default Profile;
