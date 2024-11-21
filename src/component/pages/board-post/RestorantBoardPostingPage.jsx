import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../layout/header/Header';
import ReceiptUpload from '../../post-board/restaurant-board/ReceiptUpload';
import PutActionButtons from './PutActionButtons';
import LocationSearch from '../../post-board/restaurant-board/LocationSearch';
import RatingSection from '../../post-board/restaurant-board/RatingSection';
import ActionButtons from '../../post-board/restaurant-board/ActionButtons';
import Editor from '../../post-board/Editor';
import api from '../../api/axios';
import { useParams } from 'react-router-dom';
import ReceiptList from './ReceiptList';
import LocationView from './LocationView';
import { useNavigate } from 'react-router-dom';

const RestorantBoardPostingPage = () => {
  const navigate = useNavigate();
  const category = 'restaurant';

  // 1. 영수증
  const [receipts, setReceipts] = useState([]);
  // 2. 타이틀
  const [title, setTitle] = useState('');
  // 3. 내용
  const [content, setContent] = useState('');
  // 4. 영수증 불러오기에서 선택된 영수증 정보
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  // 5. 카메라에서 선택한 영수증 정보
  const [uploadedReceipt, setUploadedReceipt] = useState('');
  // 6. 이미지
  const [image_url, setUpImage_url] = useState('');

  // 7. 수정하는 상태인지 작성하는 상태인지 확인
  const [putState, setPutState] = useState(false);
  // 8. 게시물 수정하기 눌렀을때 어떤 게시물인지 확인하는 board_id
  const { board_id } = useParams();
  // 영수증 리스트 토글관리
  const [isListVisible, setIsListVisible] = useState(false);

  // 값이 변경될 때마다 현재 선택된 영수증 값 설정
  const [currentReceipt, setCurrentReceipt] = useState(
    selectedReceipt || uploadedReceipt
  );

  useEffect(() => {
    const fetchBoardData = async () => {
      if (board_id) {
        setPutState(true);
        const res = await api.get(`/boards/${board_id}`);
        console.log('res : ', res.data);
        setTitle(res.data.board.title);
        setContent(res.data.board.content);
        setRatings(res.data.review);
        setUploadedReceipt(res.data.place.placeAddress);
        setCurrentReceipt(res.data.place.placeAddress);
        setSelectedReceipt(res.data.place.placeAddress);
      } else {
        setPutState(false);
      }
    };

    fetchBoardData();
  }, [board_id, putState]); // board_id나 putState가 변경될 때마다 실행됩니다.

  useEffect(() => {
    getReceipts();

    const savedDraft = localStorage.getItem('draftPost');
    if (savedDraft) {
      const { title, content, currentReceipt, ratings } =
        JSON.parse(savedDraft);
      setTitle(title);
      setContent(content);
      setUploadedReceipt(uploadedReceipt);
      setCurrentReceipt(currentReceipt); // savedDraft에서 currentReceipt가 없다면 uploadedReceipt로 설정
      setRatings(ratings);
    }

    // selectedReceipt와 uploadedReceipt 값이 변할 때마다 currentReceipt 업데이트
    if (selectedReceipt) {
      setCurrentReceipt(selectedReceipt); // selectedReceipt 우선 적용
    } else if (uploadedReceipt) {
      setCurrentReceipt(uploadedReceipt); // uploadedReceipt가 있을 경우 적용
    }
  }, [selectedReceipt, uploadedReceipt]);

  // 5. 리뷰(별점)
  const [ratings, setRatings] = useState({
    rate_flavor: 0,
    rate_price: 0,
    rate_mood: 0,
    rate_kind: 0,
    rate_clean: 0,
  });

  // 임시저장
  const handleDraftSave = () => {
    const draft = {
      title,
      image_url,
      content,
      currentReceipt,
      ratings,
    };

    console.log('임시저장 데이터', draft);
    localStorage.setItem('draftPost', JSON.stringify(draft));
    alert('게시글이 임시저장되었습니다.');
  };

  // 게시글 작성 버튼 관련
  const handleSubmit = async () => {
    if (title.length < 1) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (content.length < 1) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (!currentReceipt) {
      alert('영수증을 선택해주세요.');
      return;
    }

    const data = {
      board: { title, content },
      review: { ...ratings },
      receipt: currentReceipt,
    };

    await api.post(`/boards/${category}`, data).then((res) => {
      if (res.status === 200) {
        // 게시물 작성 후 로컬스토리지에서 임시 저장된 데이터 삭제
        localStorage.removeItem('draftPost');
        alert('게시글이 정상적으로 등록되었습니다.');
        // 페이지 이동
        navigate(-1, { replace: true });

        return;
      } else {
        alert('업로드 실패.');
        return;
      }
    });
  };

  // 게시글 수정 버튼 관련
  const handleModifi = async () => {
    // if (title.length < 1) {
    //   titleRef.current.focus();
    //   return;
    // }

    const data = {
      board: { title, content, image_url, category },
      review: { ...ratings },
    };

    await api.put(`/boards/${board_id}`, data).then((res) => {
      if (res.status === 200) {
        alert('게시글이 정상적으로 수정되었습니다.');
        // 페이지 이동
        navigate(-1);
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
                const baseUrl = 'http://211.225.141.117:8000'; //TODO: cdn 서버로 변경
                const mediaUrl = baseUrl + res.data.mediaUrl;
                const mediaThumbUrl = baseUrl + res.data.mediaThumbUrl;
                setUpImage_url(mediaUrl);
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

  const toggleList = () => {
    setIsListVisible((prev) => !prev);
  };

  // 영수증 선택
  const handleReceiptClick = (receipt) => {
    setSelectedReceipt(receipt); // 선택한 데이터를 저장
    setIsListVisible(false); // 목록닫기
  };

  const haederProps = {
    color: '#f4b183',
    title: '게시글 작성',
  };

  return (
    <PageContainer>
      {/* 수정하기 모드 */}
      {putState ? (
        <>
          <Header {...haederProps} />
          <ContentContainer>
            <ReceiptList
              receipts={receipts}
              isListVisible={isListVisible}
              toggleList={toggleList}
              handleReceiptClick={handleReceiptClick}
            />
            <Editor
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              uploadPlugin={uploadPlugin}
            />
            <LocationView
              selectedReceipt={selectedReceipt || uploadedReceipt}
            />
            <RatingSection
              ratings={ratings}
              onRatingChange={handleRatingChange}
            />
            <PutActionButtons handleModifi={handleModifi} />
          </ContentContainer>
        </>
      ) : (
        // 글 작성하는 모드
        <>
          <Header {...haederProps} />
          <ContentContainer>
            <ReceiptUpload
              receipts={receipts}
              handleCameraButtonClick={handleCameraButtonClick}
              isListVisible={isListVisible}
              toggleList={toggleList}
              handleReceiptClick={handleReceiptClick}
            />
            <Editor
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              uploadPlugin={uploadPlugin}
            />
            <LocationSearch
              selectedReceipt={selectedReceipt || uploadedReceipt}
            />
            <RatingSection
              ratings={ratings}
              onRatingChange={handleRatingChange}
            />
            <ActionButtons
              handleDraftSave={handleDraftSave}
              handleSubmit={handleSubmit}
            />
          </ContentContainer>
        </>
      )}
    </PageContainer>
  );
};

const PageContainer = styled.main`
  background-color: #fff;
  display: flex;
  width: 430px;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  font-family: Roboto, sans-serif;
  line-height: 1;
  margin: 0 auto;
  border: 0.5px solid #cac4d0;
`;

const ContentContainer = styled.div`
  width: 430px;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE 및 Edge */
  scrollbar-width: none; /* Firefox */
`;

export default RestorantBoardPostingPage;
