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

  // 1. 영수증
  const [receipts, setReceipts] = useState([]);
  // 2. 타이틀
  const [title, setTitle] = useState('');
  // 3. 내용
  const [content, setContent] = useState('');
  // 4. 가게 주소(보여주기용)
  // const location = useLocation();
  // const selectedReceipt = location.state?.receipt; // 옵셔널 체이닝 사용
  const [selectedReceipt, setSelectedReceipt] = useState('');

  // 토글형식
  const [isListVisible, setIsListVisible] = useState(false);

  const [uploadedReceipt, setUploadedReceipt] = useState('');
  // 값이 변경될 때마다 현재 선택된 영수증 값 설정
  const [currentReceipt, setCurrentReceipt] = useState(
    selectedReceipt || uploadedReceipt
  );
  // 5. 리뷰(별점)
  const [ratings, setRatings] = useState({
    rate_flavor: 0,
    rate_price: 0,
    rate_mood: 0,
    rate_kind: 0,
    rate_clean: 0,
  });

  useEffect(() => {
    getReceipts();

    const savedDraft = localStorage.getItem('draftPost');
    if (savedDraft) {
      const { title, content, uploadedReceipt, currentReceipt, ratings } =
        JSON.parse(savedDraft);
      setTitle(title);
      setContent(content);
      setUploadedReceipt(uploadedReceipt);
      setCurrentReceipt(currentReceipt || uploadedReceipt); // savedDraft에서 currentReceipt가 없다면 uploadedReceipt로 설정
      setRatings(ratings);
    }

    // selectedReceipt와 uploadedReceipt 값이 변할 때마다 currentReceipt 업데이트
    if (selectedReceipt) {
      setCurrentReceipt(selectedReceipt); // selectedReceipt 우선 적용
    } else if (uploadedReceipt) {
      setCurrentReceipt(uploadedReceipt); // uploadedReceipt가 있을 경우 적용
    }
  }, [selectedReceipt, uploadedReceipt]);

  // 임시저장
  const handleDraftSave = () => {
    const draft = {
      title,
      content,
      uploadedReceipt,
      currentReceipt,
      ratings,
    };

    console.log('임시저장 데이터', draft);
    localStorage.setItem('draftPost', JSON.stringify(draft));
    alert('게시글이 임시저장되었습니다.');
  };

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
        // 게시물 작성 후 로컬스토리지에서 임시 저장된 데이터 삭제
        localStorage.removeItem('draftPost');

        // 페이지 이동
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
              .post('/media/upload', formData)
              .then((res) => {
                console.log('response ' + JSON.stringify(res.data)); // 응답 로그

                const baseUrl = 'http://localhost:8000';
                const mediaUrl = baseUrl + res.data.mediaUrl;
                const mediaThumbUrl = baseUrl + res.data.mediaThumbUrl;

                resolve({
                  default: mediaUrl,
                  mediaThumbUrl: mediaThumbUrl,
                });
              })
              .catch((err) => {
                console.log('response error ' + err); // 응답 로그
                reject(err);
              });
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
            const receipt_id = await api.post('/receipt', formData);
            // 5. 저장된 영수증에서 주소가져오기
            const restorant_address = await api.get(`/receipt/${receipt_id}`);
            console.log(restorant_address.data);
            // 5. 주소 저장
            // setUploadedReceipt(restorant_address);
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
            const receipt_id = await api.post('/receipt', formData);
            // 5. 저장된 영수증에서 주소가져오기
            const restorant_address = await api.get(`/receipt/${receipt_id}`);
            console.log(restorant_address.data);
            // 5. 주소 저장
            // setUploadedReceipt(restorant_address);
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

  // 5-1 리뷰 점수 관리
  const handleRatingChange = (categoryId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [categoryId]: rating,
    }));
  };

  const handleReceiptClick = (receipt) => {
    console.log('개별 영수증 클릭' + receipt);
    setSelectedReceipt(receipt); // 선택한 데이터를 저장

    setIsListVisible(false); // 목록닫기
  };

  const toggleList = () => {
    setIsListVisible((prev) => !prev);
  };

  return (
    <PageContainer>
      <Header />
      <main>
        <ReceiptUpload
          receipts={receipts}
          handleCameraButtonClick={handleCameraButtonClick}
          handleReceiptClick={handleReceiptClick}
          toggleList={toggleList}
          isListVisible={isListVisible}
        />
        <Editor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          uploadPlugin={uploadPlugin}
        />
        <LocationSearch selectedReceipt={selectedReceipt || uploadedReceipt} />
        <RatingSection ratings={ratings} onRatingChange={handleRatingChange} />
        <ActionButtons
          handleDraftSave={handleDraftSave}
          handleSubmit={handleSubmit}
        />
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
