import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../ProfilePage/ImageComponent';

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
        <button
          className="back-button"
          aria-label="Go back"
          onClick={() => navigate("/myprofilepage")}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt="Back"
            className="back-icon"
          />
        </button>
        <h1 className="header-title">회원 정보</h1>
        <button
          className="home-button"
          aria-label="Go to home"
          onClick={() => navigate("/")}
        >
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
          <ImageComponent />
          <h2 className="profile-title">닉네임</h2>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a92bd132d3651207a6eb45b208decca53f8afd70fea0116e5b917a1f5ec0c4c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt="Edit"
            className="edit-icon"
          />
        </div>
      </section>

      <section className="account-section">
        <h2 className="section-title">계정</h2>
        <div className="account-info">
          <div className="info-row">
            <span className="info-label">
              비밀번호 변경
              <br />
              이메일
            </span>
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
                <span key={index} className="setting-label">
                  {notification.label}
                </span>
              ))}
            </div>
            <div className="switches">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`switch ${
                    notification.enabled ? "enabled" : "disabled"
                  }`}
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
          display: flex;
          overflow: hidden;
          flex-direction: column;
          align-items: flex-start;
          width: 430px;
          max-height: 932px;
          min-height: 632px;
          height: auto;
          background: #fff4d2;
          margin: 0 auto;
          padding: 62px 0px 100px 0px;
          border: 0.5px solid #cac4d0;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          color: #000;
          white-space: nowrap;
          text-align: center;
          font: 400 10px/1 Roboto, sans-serif;
        }
        .back-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          margin-left: 30px;
        }

        .home-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          margin-right: 30px;
        }
        .back-icon,
        .home-icon {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        .header-title {
          border-color: #000;
          text-align: center;
          margin: 0 auto; /* 가운데 정렬 */
          margin-top: -3%;
          margin-bottom: 4%;
        }
        .divider {
          display: flex;
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
        .account-section,
        .notification-section {
          width: 100%; /* 부모의 너비에 맞추기 */
          max-width: 400px; /* 최대 너비 설정 (필요 시 조정 가능) */
          margin: 0 auto; /* 중앙 정렬 */
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
        .labels,
        .switches {
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
          background-color: #e0e0e0;
          border-radius: 50px;
          position: relative;
          margin-bottom: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
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
          background-color: #ff5c5c;
        }
        .footer {
          display: flex;
          justify-content: center; /* 가로 중앙 정렬 */
          align-items: center; /* 세로 중앙 정렬 */
          width: 100%;
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
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default MemberInfo;
