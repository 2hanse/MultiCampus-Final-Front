import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api/axios';
import ReceiptCard from '../myreceipts/ReceiptCard';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import GetReceiptButton from '../myreceipts/GetReceiptButton';

const ReceiptCollection = () => {
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
      <Header
        color="#fff4d2"
        title="영수증 모음집"
        actions={<GetReceiptButton />}
      />

      <Divider />
      <Container>
        <ReceiptGrid>
          {receipts.map((receipt) => (
            <ReceiptRow key={receipt.receipt_id}>
              <ReceiptCard receipt={receipt} />
            </ReceiptRow>
          ))}
        </ReceiptGrid>
      </Container>
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
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 216px);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE 및 Edge */
  scrollbar-width: none; /* Firefox */
`;

const ReceiptGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 40px;
`;

const ReceiptRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ReceiptCollection;
