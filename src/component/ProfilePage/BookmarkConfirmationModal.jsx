import React from 'react';

const BookmarkConfirmationModal = ({ nickname, closeModal }) => {
  const handleCloseModal = (confirmed) => {
    if (confirmed) {
      // 북마크 저장 로직 추가 (필요한 경우)
    }
    // 부모로부터 받은 closeModal 함수 호출
    closeModal(confirmed);
  };

  return (
    <section className="bookmark-confirmation-modal">
      <div className="modal-content">
        <h2 className="modal-title">
          {nickname} 님의 북마크를 <br /> 저장하시겠습니까?
        </h2>
        <div className="button-group">
          <button className="modal-button" onClick={() => handleCloseModal(true)}>예</button>
          <button className="modal-button" onClick={() => handleCloseModal(false)}>아니오</button>
        </div>
      </div>
      <style jsx>{`
        .bookmark-confirmation-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          overflow: auto;
        }
        .modal-content {
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
          padding: 37px 61px;
          border: 1px solid #dfa67b;
          width: 306px;
          text-align: center;
          color: #000;
          font: 400 16px Inter, sans-serif;
        }
        .modal-title {
          line-height: 23px;
          margin: 0;
          font-size: 16px;
          font-weight: 400;
        }
        .button-group {
          display: flex;
          justify-content: center; /* 버튼을 중앙에 배치 */
          gap: 40px; /* 간격을 더 넓히기 위해 40px로 설정 */
          margin-top: 23px;
        }
        .modal-button {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          color: inherit;
          text-align: center; /* 버튼 텍스트 중앙 정렬 */
        }
      `}</style>
    </section>
  );
};

export default BookmarkConfirmationModal;
