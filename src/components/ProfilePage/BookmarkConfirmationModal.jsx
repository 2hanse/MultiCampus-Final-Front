import React from 'react';

const BookmarkConfirmationModal = ({ nickname }) => {
  const handleCloseModal = (confirmed) => {
    if (confirmed) {
      // 북마크 저장 로직 추가 (필요한 경우)
    }
    // 모달 닫기
    setIsBookmarkModalOpen(false);
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
          position: fixed; /* 화면에 고정 */
          top: 50%; /* 수직 중앙 */
          left: 50%; /* 수평 중앙 */
          transform: translate(-50%, -50%); /* 정확히 중앙에 위치 */
          background: rgba(0, 0, 0, 0.5); /* 배경색 반투명 */
          z-index: 9999; /* 다른 요소들 위에 표시 */
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
          justify-content: space-between;
          gap: 20px;
          margin-top: 23px;
          width: 145px;
        }
        .modal-button {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          color: inherit;
        }
      `}</style>
    </section>
  );
};

export default BookmarkConfirmationModal;
