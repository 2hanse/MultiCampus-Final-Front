import WriteBoardButton from './WriteBoardButton';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function formatPhoneNumber(phoneNumber) {
  // 숫자만 남기기
  const cleaned = phoneNumber.replace(/\D/g, '');

  // 지역번호 목록
  const areaCodes = [
    '02',
    '031',
    '032',
    '033',
    '041',
    '042',
    '043',
    '044',
    '051',
    '052',
    '053',
    '054',
    '055',
    '061',
    '062',
    '063',
    '064',
    '070',
    '080',
    '0505',
  ];

  // 전화번호 길이 확인 (10자리 또는 11자리)
  if (cleaned.length === 10) {
    // 10자리 번호는 '02' 지역번호 또는 3자리 지역번호로 구별
    if (cleaned.startsWith('02')) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      for (let code of areaCodes) {
        if (cleaned.startsWith(code)) {
          return cleaned.replace(
            new RegExp(`(\\d{${code.length}})(\\d{4})(\\d{4})`),
            '$1-$2-$3'
          );
        }
      }
    }
  } else if (cleaned.length === 11) {
    // 11자리 번호는 대부분 '010'으로 시작
    if (cleaned.startsWith('010')) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
  }

  // 기본적으로 11자리 핸드폰 번호 형식
  return cleaned.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
}

function ReceiptCard({ receipt }) {
  const navigate = useNavigate();

  const imageSrc =
    'https://cdn.builder.io/api/v1/image/assets/TEMP/360565f156e9ad8a3276b3f9172cb6dcc9e5bacf793c159c7537fa552a7650e9?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4';

  // 전화번호 포맷 함수 호출
  const formattedPhoneNumber = formatPhoneNumber(receipt.restaurant_tele);

  const handleCameraButtonClick = () => {
    navigate('/boardpost/restaurant');
  };

  return (
    <article className="receipt-card">
      <div className="receipt-content">
        <h3>{receipt.restaurant_name}</h3>
        <p className="phone">
          * 전화번호
          <br />
          <span>{formattedPhoneNumber}</span>
        </p>
        <p className="address">
          * 주소
          <br />
          <span>{receipt.restaurant_address}</span>
        </p>
        <p className="time">
          * 결제 시각
          <br />
          <span>{receipt.pay_time}</span>
        </p>
        <p className="upload-time">
          * 업로드 시각
          <br />
          <span>{receipt.upload_time}</span>
        </p>
        {receipt.writed_board ? (
          <PhotoButton>
            이미 게시글이 작성된
            <br />
            영수증입니다
          </PhotoButton>
        ) : (
          <WriteBoardButton handleCameraButtonClick={handleCameraButtonClick} />
        )}
      </div>
      <img src={imageSrc} alt="식당 배경" className="receipt-background" />
      <style jsx>{`
        .receipt-card {
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
          aspect-ratio: 0.61;
          width: 160px;
          padding: 25px 13px 67px;
          color: #000;
          font: 400 15px/15px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        .receipt-background {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .receipt-content {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </article>
  );
}

const PhotoButton = styled.button`
  border-radius: 5px;
  background-color: #dcf6aa;
  width: 160px;
  height: 35px;
  border: 2px solid #dcf6aa;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export default ReceiptCard;
