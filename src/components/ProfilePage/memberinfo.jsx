import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent'; // 정확한 경로를 확인하여 임포트


const MemberInfo = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { label: '게시물 알람', enabled: true },
    { label: '댓글 알람', enabled: true },
    { label: '좋아요 알람', enabled: false },
    { label: '구독 알람', enabled: false },
  ]);

  const toggleNotification = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification, idx) =>
        idx === index
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  return (
    <div className="member-info">
      <header className="header">
        <button className="back-button" aria-label="Go back" onClick={() => navigate('/')}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt="Back"
            className="back-icon"
          />
        </button>
        <h1 className="header-title">회원 정보</h1>
        <button className="home-button" aria-label="Go to home">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4671849f740627d3c98e72408b2f2d3f3f06c041bf32bb9316b1e960e12b0e6?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt="Menu"
            className="home-icon"
          />
        </button>
      </header>

      <div className="divider">
        <hr />
      </div>

      <section className="profile-section">
        <div className="profile-content">
          <ImageComponent /> {/* ImageComponent로 대체 */}
          <h2 className="profile-title">닉네임</h2>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a92bd132d3651207a6eb45b208decca53f8afd70fea0116e5b917a1f5ec0c4c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt="Edit"
            className="edit-icon"
          />
        </div>
      </section>

      {/* Account Section */}
      <section className="account-section">
        <h2 className="section-title">계정</h2>
        <div className="account-info">
          <div className="info-row">
            <span className="info-label">비밀번호 변경<br />이메일</span>
            <span className="info-value">####@#####</span>
          </div>
        </div>
      </section>

      <section className="notification-section">
        <h2 className="section-title">알림 설정</h2>
        <div className="notification-settings">
          <div className="settings-container">
            <div className="labels">
              {notifications.map((notification, index) => (
                <span key={index} className="setting-label">{notification.label}</span>
              ))}
            </div>
            <div className="switches">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`switch ${notification.enabled ? 'enabled' : 'disabled'}`}
                  onClick={() => toggleNotification(index)}
                >
                  <div className="switch-handle" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <button className="unsubscribe-button">회원 탈퇴</button>
      </footer>

      {/* Styles */}
      <style jsx>{`
  .member-info {
    background-color: #fff4d2;
    display: flex;
    max-width: 480px;
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    margin: 0 auto;
    padding: 30px;
  }
  .header {
    display: flex;
    width: 100%;
    max-width: 376px;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }
  .back-button, .home-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  .back-icon, .home-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  .header-title {
    color: #000;
    font: 400 18px/1 Roboto, sans-serif;
  }
  .divider {
    display: flex;
    margin-top: 24px;
    width: 100%;
  }
  hr {
    background-color: #cac4d0;
    height: 1px;
    width: 100%;
    border: none;
  }
  .profile-section {
    display: flex;
    margin-top: 25px;
    width: 100%;
    padding: 0 15px;
  }
  .profile-content {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-left: 13px;
  }
  .profile-image {
    width: 85px;
    height: 80px;
    background-color: #f0f0f0;
    border-radius: 50%;
  }
  .profile-title {
    color: #000;
    font: 400 20px Inter, sans-serif;
  }
  .edit-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  .account-section {
    margin-top: 20px;
    border-radius: 20px;
    padding: 16px;
  }
  .section-title {
    color: #000;
    font: 400 24px Inter, sans-serif;
    margin-left: 13px;
    margin-bottom: 11px;
  }
  .account-info {
    background-color: #fffbfb;
    border-radius: 30px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
    padding: 26px 29px;
  }
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .info-label {
    color: #dfa67b;
    font: 400 17px Inter, sans-serif;
  }
  .info-value {
    color: #757575;
    font: 400 17px Inter, sans-serif;
  }
  .notification-section {
    margin-top: 40px;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 20px;
  }
  .notification-settings {
    background-color: #fffbfb;
    border-radius: 30px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
    padding: 27px 30px;
  }
  .settings-container {
    display: flex;
    justify-content: space-between;
  }
  .labels, .switches {
    display: flex;
    flex-direction: column;
  }
  .setting-label {
    color: #dfa67b;
    font: 400 17px Inter, sans-serif;
    margin-bottom: 10px;
  }
  .switch {
    width: 40px;
    height: 22px;
    background-color: #e0e0e0; /* 기본 색상 */
    border-radius: 50px;
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* 배경 색상 변화 애니메이션 */
  }
  .switch-handle {
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    transition: transform 0.3s ease;
  }
  .enabled .switch-handle {
    transform: translateX(18px);
  }
  .enabled {
    background-color: #ff5c5c; /* 스위치 활성화 시 배경을 붉은색으로 변경 */
  }
  .enabled .switch-handle {
    background-color: white; /* 핸들 색상은 그대로 유지 */
  }
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .unsubscribe-button {
    background-color: #ce9971;
    color: white;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
`}</style>
    </div>
  );
};

export default MemberInfo;
