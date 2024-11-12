import React from 'react';

const membershipLevels = [
  { name: '한공기', points: 10 },
  { name: '두공기', points: 30 },
  { name: '세공기', points: 50 },
  { name: '네공기', description: '상위 10% 달성시 등업' }
];

const pointsInfo = [
  { action: '출석시', points: 1 },
  { action: '게시글 작성', points: 3, note: '(일일 최대 15점)' },
  { action: '구독/팔로워 당', points: 1 }
];

function MembershipInfoModal({ closeModal }) {
    const handleConfirm = () => {
      closeModal();
    };
  
    return (
      <section className="membership-modal">
        <div className="membership-content">
          <h2 className="visually-hidden">회원 등급 안내</h2>
          <div className="membership-levels">
            <h3>회원 등급 안내</h3>
            <ul>
              {membershipLevels.map((level, index) => (
                <li key={index}>
                  {level.name} : {level.points ? `${level.points}점 달성시 등업` : level.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="points-info">
            <h3>점수 획득 방법</h3>
            <ul>
              {pointsInfo.map((info, index) => (
                <li key={index}>
                  {info.action}: +{info.points}점 {info.note}
                </li>
              ))}
            </ul>
          </div>
          <button className="confirm-button" onClick={handleConfirm}>
            확인
          </button>
        </div>
        <style jsx>{`
          .membership-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
          }
          .membership-content {
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
            width: 100%;
            max-width: 400px;
            padding: 15px 28px 25px;
            border: 1px solid #dfa67b;
            text-align: center; /* 내용 중앙 정렬 */
          }
          .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
          .membership-levels {
            margin-bottom: 20px;
          }
          .membership-levels h3 {
            margin-bottom: 10px;
          }
          .membership-levels ul {
            list-style-type: none;
            padding: 0;
          }
          .membership-levels li {
            margin-bottom: 5px;
          }
          .points-info {
            margin-top: 20px;
          }
          .points-info h3 {
            margin-bottom: 10px;
          }
          .points-info ul {
            list-style-type: none;
            padding: 0;
          }
          .points-info li {
            margin-bottom: 5px;
          }
          .confirm-button {
            margin: 0 auto;
            padding: 10px 20px;
            background-color: #dfa67b;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }
          .confirm-button:hover {
            background-color: #c98f66;
          }
          .confirm-button:focus {
            outline: 2px solid #c98f66;
            outline-offset: 2px;
          }
        `}</style>
      </section>
    );
  }
  
  export default MembershipInfoModal;
  