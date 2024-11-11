import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  // 상태 아이콘 클릭 시 memberinfo 페이지로 이동
  const handleStatusIconClick = () => {
    navigate('/memberinfo');
  };

  // 뒤로가기 아이콘 클릭 시 MapPage로 이동
  const handleBackIconClick = () => {
    navigate('/'); // MapPage로 이동
  };

  return (
    <header className="profile-header">
      <div className="top-row">
        <div className="profile-info">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt="뒤로 가기"
            className="back-icon"
            onClick={handleBackIconClick} // 클릭 시 MapPage로 이동
          />
        </div>
        <div className="member-status">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c96d0a0fed167040fbf4ecdb8a40ffb17a61a4ff3159243d2df2d99c7e8f1c6?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt="상태 아이콘"
            className="status-icon"
            onClick={handleStatusIconClick}
            style={{ cursor: 'pointer' }} // 클릭 가능 표시
          />
        </div>
      </div>
      
      <style jsx>{`
        .profile-header {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: -30px;
        }
        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .profile-info {
          display: flex;
          align-items: center;
        }
        .back-icon {
          aspect-ratio: 1;
          object-fit: cover;
          width: 24px;
          margin-right: 10px;
          cursor: pointer; // 클릭 가능 표시
        }
        .nickname-container {
          white-space: nowrap;
        }
        .nickname {
          font-size: 20px;
        }
        .member-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .status-icon {
          aspect-ratio: 1;
          object-fit: cover;
          width: 20px;
        }
        .member-level {
          margin-top: 5px;
        }
        
      `}</style>
    </header>
  );
}
