import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import api from '../api/axios';
import ReceiptCard from '../myreceipts/ReceiptCard';
import Footer from '../layout/footer/Footer';

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
      <header className="collection-header">
        <button onClick={() => navigate(-1)} className="back-icon">
          {' '}
          {/* back-icon 클릭 시 이전 페이지로 이동 */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt=""
          />
        </button>
        <h1 className="collection-title">영수증 모음집</h1>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt=""
          className="header-icon"
        />
      </header>

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

      <Footer />

      <style jsx>{`
        .receipt-collection {
          background: rgba(255, 244, 210, 1);
          max-width: 430px;
          max-height; auto;
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
          flex-wrap: wrap;  
          justify-content: space-between;  
          gap: 15px;
          width: 100%;
          max-width: 396px;
        }

        .receipt-row {
          display: flex;
          justify-content: space-between;
        }

      `}</style>
    </main>
  );
}

export default ReceiptCollection;
