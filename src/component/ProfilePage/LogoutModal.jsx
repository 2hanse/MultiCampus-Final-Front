import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    // 로그아웃 처리 로직 (예: 로그아웃 API 호출)
    const token = localStorage.getItem("token");
    if (token)
      localStorage.removeItem("token");
    
    closeModal();  // 모달 닫기
    navigate('/');  
  };

  const handleCancelLogout = () => {
    closeModal();  // 모달 닫기
  };

  return (
    <div className="logout-modal">
      <div className="modal-content">
        <h2 className="modal-title">로그아웃 하시겠습니까?</h2>
        <div className="button-container">
          <button className="modal-button" onClick={handleConfirmLogout}>예</button>
          <button className="modal-button" onClick={handleCancelLogout}>아니오</button>
        </div>
      </div>
      <style jsx>{`
        .logout-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          background-color: rgba(0, 0, 0, 0.5); /* 배경 흐림 효과 */
          width: 100vw;
          height: 100vh;
        }
        .modal-content {
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 43px 61px;
          border: 1px solid #dfa67b;
        }
        .modal-title {
          margin: 0;
          font-size: 16px;
          font-weight: 400;
        }
        .button-container {
          display: flex;
          margin-top: 34px;
          width: 145px;
          max-width: 100%;
          gap: 20px;
          justify-content: space-between;
        }
        .modal-button {
          background: none;
          border: none;
          color: #000;
          font: 400 16px Inter, sans-serif;
          cursor: pointer;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default LogoutModal;
