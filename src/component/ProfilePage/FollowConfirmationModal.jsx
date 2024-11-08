import React from 'react';

const ConfirmationButton = ({ text, action }) => {
  const handleClick = () => {
    console.log(`${text} 버튼 클릭됨`); // 로그 추가
    action();
  };

  return (
    <button className="confirmation-button" onClick={handleClick}>
      {text}
      <style jsx>{`
        .confirmation-button {
          background: none;
          border: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          padding: 0;
        }
      `}</style>
    </button>
  );
};

const FollowConfirmationModal = ({ username, closeModal }) => {
  const buttons = [
    { text: '예', action: () => closeModal(true) }, // 예 버튼: 팔로잉 상태로 변경
    { text: '아니오', action: () => closeModal(false) }, // 아니오 버튼: 모달 닫기
  ];

  return (
    <>
      <div className="overlay"></div>

      <section className="follow-confirmation">
        <div className="confirmation-dialog">
          <p className="confirmation-message">{username} 님을 팔로우 하시겠습니까?</p>
          <div className="button-container">
            {buttons.map((button, index) => (
              <ConfirmationButton key={index} {...button} />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .follow-confirmation {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 10px;
          display: flex;
          max-width: 306px;
          flex-direction: column;
          color: #000;
          text-align: center;
          font: 400 16px Inter, sans-serif;
          z-index: 1000;
        }

        .confirmation-dialog {
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
          display: flex;
          width: 100%;
          flex-direction: column;
          padding: 43px 26px;
          border: 1px solid #dfa67b;
        }

        .confirmation-message {
          margin: 0;
        }

        .button-container {
          align-self: center;
          display: flex;
          margin-top: 34px;
          width: 145px;
          max-width: 100%;
          gap: 20px;
          white-space: nowrap;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

export default FollowConfirmationModal;
