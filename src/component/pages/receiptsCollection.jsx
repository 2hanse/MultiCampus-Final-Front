import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api/axios';
import ReceiptCard from '../myreceipts/ReceiptCard';
import Header from '../layout/header/Header';
import SearchActions from '../ProfilePage/SearchActions';
import Footer from '../layout/footer/Footer';

const ReceiptCollection = () => {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);

  const getReceipts = async () => {
    try {
      const response = await api.get(`/receipt`);
      setReceipts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReceipts();
  }, []);

  return (
    <MainContainer>
      <Header color="#fff4d2" title="영수증 모음집" actions={<SearchActions />} />
      <Divider />
      <ReceiptGrid>
        {receipts.map((receipt) => (
          <ReceiptRow key={receipt.receipt_id}>
            <ReceiptCard receipt={receipt} />
          </ReceiptRow>
        ))}
      </ReceiptGrid>
      <Footer />
    </MainContainer>
  );
};

// 스타일 정의
const MainContainer = styled.main`
  background: #fff4d2;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 430px;
  border: 0.5px solid #cac4d0;
`;


const Divider = styled.hr`
  width: 100%;
  background: #cac4d0;
  height: 1px;
  border: none;
  margin: 24px 0;
`;

const ReceiptGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  max-width: 396px;
  overflow-y: auto;
  width: 100%;
  height: calc(100vh - 216px);
  padding: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;

const ReceiptRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ReceiptCollection;
