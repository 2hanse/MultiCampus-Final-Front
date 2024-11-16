import React from 'react';
import styled from 'styled-components';
import api from '../api/axios';
import camera from '../post-board/asset/camera.png';

const GetReceiptButton = () => {
  // 1-2 카메라 불러오기 버튼 클릭 이벤트
  const handleCameraButtonClick = async () => {
    console.log('카메라 버튼 클릭');
    try {
      // 1. PC와 모바일을 구분하기 위한 userAgent 체크
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // 2. 모바일이면 카메라 앱 실행을 위한 input 생성
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment'; // 후면 카메라 기본 설정

        input.onchange = async (event) => {
          const file = event.target.files[0];
          console.log('파일이름' + file.name);

          if (file) {
            const formData = new FormData();
            formData.append('file', file);

            // 4. 선택된 파일을 서버에 POST 요청으로 전송(영수증 저장)
            await api.post('/receipt', formData);
            console.log('이미지 업로드 성공');
          }
        };
        // input을 클릭하여 카메라를 실행
        input.click();
      } else {
        // 3. PC면 파일 업로드 창 열기
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (event) => {
          const file = event.target.files[0];
          console.log('파일이름' + file.name);

          if (file) {
            const formData = new FormData();
            formData.append('file', formData.get('file'));
            console.log('폼데이터' + file);

            // 4. 선택된 파일을 서버에 POST 요청으로 전송(영수증 저장)
            await api.post('/receipt', formData);
            console.log('이미지 업로드 성공');
          }
        };

        // input을 클릭하여 파일 업로드 창 열기
        input.click();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UploadButton onClick={handleCameraButtonClick}>
      <UploadIcon src={camera} alt="Upload" />

      <UploadText>추가하기</UploadText>
    </UploadButton>
  );
};
const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  background-color: #fff;
  padding: 5px 7px;
  border: 1px solid #dfa67b;
  cursor: pointer;
  position: relative; /* 위치 기준 */
`;

const UploadIcon = styled.img`
  width: 10px;
  height: 10px;
  object-fit: contain;
`;

const UploadText = styled.span`
  font-size: 10px;
  color: #dfa67b;
  font-weight: bold; /* 폰트 굵게 설정 */
`;

export default GetReceiptButton;
