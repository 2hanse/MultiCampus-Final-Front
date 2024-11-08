import * as React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

const receiptData = [
  {
    id: 1,
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/360565f156e9ad8a3276b3f9172cb6dcc9e5bacf793c159c7537fa552a7650e9?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4",
    restaurantName: "식당명",
    phoneNumber: "전화번호",
    address: "주소",
    paymentTime: "결제 시각",
    captureTime: "촬영 시각"
  },
  {
    id: 2,
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e68987c8b564fd551739f033d94bc2b6ecc7fb9910198d651638f8d49b79f33?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4",
    restaurantName: "식당명",
    phoneNumber: "전화번호",
    address: "주소",
    paymentTime: "결제 시각",
    captureTime: "촬영 시각"
  },
  {
    id: 3,
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/232325c598ffb79932d967c465626a70b87081792133d36ac1b19f37bdc198b4?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4",
    restaurantName: "식당명",
    phoneNumber: "전화번호",
    address: "주소",
    paymentTime: "결제 시각",
    captureTime: "촬영 시각"
  }
];

function ReceiptCollection() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  
  return (
    <main className="receipt-collection">
      <header className="collection-header">
        <button onClick={() => navigate(-1)} className="back-icon"> {/* back-icon 클릭 시 이전 페이지로 이동 */}
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" />
        </button>
        <h1 className="collection-title">영수증 모음집</h1>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="header-icon" />
      </header>

      <div className="divider-container">
        <hr className="divider" />
      </div>

      <section className="receipt-grid">
        {[...Array(3)].map((_, rowIndex) => (
          <div key={rowIndex} className="receipt-row">
            {receiptData.map((receipt) => (
              <ReceiptCard key={`${rowIndex}-${receipt.id}`} {...receipt} />
            ))}
          </div>
        ))}
      </section>

      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb717e0c0f0cfa324931c379390c6d597d7e19a8ae52107e48c0c335177a4d41?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" className="footer-image" />

      <style jsx>{`
        .receipt-collection {
          background: rgba(255, 244, 210, 1);
          max-width: 430px;
          max-height: 932px;
          width: 100%;
          padding: 62px 0 0;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }

        .collection-header {
          display: flex;
          width: 100%;
          max-width: 375px;
          align-items: center;
          gap: 20px;
          justify-content: space-between;
        }
        
        .back-icon {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          width: 24px;
          aspect-ratio: 1;
          object-fit: contain;
        }

        .header-icon {
          width: 24px;
          aspect-ratio: 1;
          object-fit: contain;
        }

        .collection-title {
          color: #000;
          text-align: center;
          font: 400 18px/1 Roboto, sans-serif;
          margin-top: 15px;
        }

        .divider-container {
          width: 100%;
          margin: 24px 0;
        }

        .divider {
          background: #cac4d0;
          height: 1px;
          border: none;
          margin: 0;
        }

        .receipt-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          max-width: 396px;
        }

        .receipt-row {
          display: flex;
          gap: 15px;
        }

        .footer-image {
          width: 100%;
          aspect-ratio: 4.29;
          object-fit: contain;
          margin-top: 40px;
        }
      `}</style>
    </main>
  );
}

function ReceiptCard({ imageSrc, restaurantName, phoneNumber, address, paymentTime, captureTime }) {
  return (
    <article className="receipt-card">
      <img src={imageSrc} alt="" className="receipt-background" />
      <div className="receipt-content">
        {restaurantName}<br />
        {phoneNumber}<br />
        {address}<br />
        {paymentTime}<br />
        {captureTime}
      </div>

      <style jsx>{`
        .receipt-card {
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
          aspect-ratio: 0.61;
          width: 122px;
          padding: 25px 13px 67px;
          color: #000;
          font: 400 15px/15px Roboto, -apple-system, Roboto, Helvetica, sans-serif;
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

export default ReceiptCollection;

