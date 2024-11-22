import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../mylocation/Header';
import SearchForm from '../mylocation/SearchForm';
import CompleteButtonForm from '../mylocation/CompleteButtonForm';
import Footer from '../layout/footer/Footer';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function MyLocationPage() {
  const navigate = useNavigate();
  const [outputValue, setOutputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    const isConfirmed = window.confirm(
      '현재 위치를 저장하시겠습니까? 자신의 동네 위치 변경은 한 달에 한 번만 가능합니다.'
    );

    if (isConfirmed) {
      // 유효성 검사
      if (!outputValue.lat || !outputValue.lng) {
        alert('유효한 위치를 선택하세요.');
        return;
      }

      try {
        console.log('위치 저장 요청 데이터:', {
          verified_lat: outputValue.lat,
          verified_lng: outputValue.lng,
        });

        const response = await api.put('/users/geolocation', {
          verified_lat: outputValue.lat,
          verified_lng: outputValue.lng,
        });

        console.log('서버 응답 데이터:', response.data);

        alert('위치가 성공적으로 저장되었습니다.');
        navigate(-1); // 이전 페이지로 이동
      } catch (error) {
        console.error('위치 저장 중 오류 발생:', error);
        alert('서버 요청 중 문제가 발생했습니다.');
      }
    } else {
      alert('취소되었습니다.');
    }
  };

  return (
    <Main>
      <Header />
      <SearchForm setOutputValue={setOutputValue} />
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>
              현재 위치를 저장하시겠습니까?
              <br />
              <br />
              자신의 동네 위치 변경은 한 달에 한 번만 가능합니다.
            </p>
            <ButtonGroup>
              <ConfirmButton
                onClick={() => {
                  setIsModalOpen(false);
                  handleSubmit();
                }}
              >
                확인
              </ConfirmButton>
              <CancelButton onClick={() => setIsModalOpen(false)}>
                취소
              </CancelButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
      <CompleteButtonForm
        outputValue={outputValue}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Footer />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  width: 430px;
  height: 100vh;
  background: #fff4d2;
  margin: 0 auto;
  padding: 119px 0px 100px 0px;
  border: 0.5px solid #cac4d0;
`;

// Modal의 스타일을 중앙에 맞추는 방법
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); // 반투명 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ConfirmButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 7px;
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 7px;
`;

export default MyLocationPage;
