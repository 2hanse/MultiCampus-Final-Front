import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import api from '../api/axios';
import ReceiptCard from '../myreceipts/ReceiptCard';
import Header from '../layout/header/Header';
import SearchActions from '../ProfilePage/SearchActions'
import Footer from '../layout/footer/Footer';

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
  const [receipts, setReceipts] = useState([]);
  const getReceipts = async () => {
    const response = await api.get(`/receipt`);
    console.log(response.data);
    setReceipts(response.data);
  };

  useEffect(() => {
    getReceipts();
  }, []);

  return (
    <main className="receipt-collection">
      <Header color="" title="영수증 모음집" actions={
        <SearchActions/>
      } />
      <div className="divider-container">
        <hr className="divider" />
      </div>
      <section className="receipt-grid">
        {receipts.map((receipt) => (
          <div className="receipt-row" key={receipt.receipt_id}>
            <ReceiptCard receipt={receipt} />
          </div>
        ))}
      </section>
      <Footer /> {/* Footer 추가 */}
      <style jsx>{`
        .receipt-collection {
          background: rgba(255, 244, 210, 1);
          max-width: 430px;
          height:932px;
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
          flex-wrap: wrap;  
          justify-content: space-between;  
          gap: 15px;
          width: 100%;
          max-width: 396px;
          overflow-y: auto;
          flex-grow: 1;
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
        }
        .receipt-grid::-webkit-scrollbar {
          display: none;
        }
        .receipt-grid {
          -ms-overflow-style: none;  /* IE 및 Edge에서 스크롤바 숨기기 */
          scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
        }
      `}</style>
    </main>
  );
}

export default ReceiptCollection;