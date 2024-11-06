import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../post-board/restaurant-board/Header';
import ReceiptUpload from '../post-board/restaurant-board/ReceiptUpload';

import LocationSearch from '../post-board/restaurant-board/LocationSearch';
import RatingSection from '../post-board/restaurant-board/RatingSection';
import ActionButtons from '../post-board/restaurant-board/ActionButtons';
import Editor from '../post-board/Editor';
import api from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const RestorantBoardPostingPage = () => {
  const category = '식당';
  const navigate = useNavigate();

  useEffect(() => {
    getReceipts();
  }, []);

  // 1. 영수증
  const [receipts, setReceipts] = useState([]);
  // 2. 타이틀
  const [title, setTitle] = useState('');
  // 3. 내용
  const [content, setContent] = useState('');
  // 4. 가게 주소(보여주기용)
  const location = useLocation();
  const selectedReceipt = location.state?.receipt; // 옵셔널 체이닝 사용
  // 5. 리뷰(별점)
  const [ratings, setRatings] = useState({
    rate_flavor: 0,
    rate_price: 0,
    rate_mood: 0,
    rate_kind: 0,
    rate_clean: 0,
  });

  // 게시글 작성 버튼 관련
  const handleSubmit = () => {
    // if (title.length < 1) {
    //   titleRef.current.focus();
    //   return;
    // }

    const data = {
      board: { title, content },
      review: { ...ratings },
      receipt: { selectedReceipt },
    };

    api.post(`/boards/${category}`, data).then((res) => {
      if (res.status === 200) {
        navigate('/', { replace: true });
        return;
      } else {
        alert('업로드 실패.');
        return;
      }
    });
  };

  // 백엔드에 uri 생성 후 반한해오는 코드
  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append('file', file);
            api
              .post('http://localhost:8000/mutifile', formData)
              .then((res) => {
                console.log(res.data); // 응답 로그
                resolve({
                  default: res.data.data.uri,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  // 이미지 업로드시 메서드 작동
  const uploadPlugin = (editor) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  };

  // 1-1 영수증 리스트 불러오기
  const getReceipts = async () => {
    try {
      const response = await api.get(`/receipt`);
      setReceipts(response.data);
      console.log('영수증 리스트 불러오기', response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 1-2 카메라 불러오기 버튼 클릭 이벤트
  const handleCameraButtonClick = () => {};

  // 5-1 리뷰 점수 관리
  const handleRatingChange = (categoryId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [categoryId]: rating,
    }));
  };

  return (
    <PageContainer>
      <Header />
      <main>
        <ReceiptUpload receipts={receipts} />
        <Editor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          uploadPlugin={uploadPlugin}
        />
        <LocationSearch selectedReceipt={selectedReceipt} />
        <RatingSection ratings={ratings} onRatingChange={handleRatingChange} />
        <ActionButtons handleSubmit={handleSubmit} />
      </main>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background-color: #fff;
  display: flex;
  width: 430px;

  min-height: 100vh;
  flex-direction: column;
  overflow-y: auto;
  font-family: Roboto, sans-serif;
  line-height: 1;
  margin: 0 auto;
  border: 0.5px solid #cac4d0;
`;

export default RestorantBoardPostingPage;
