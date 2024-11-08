import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../post-board/restaurant-board/Header';

import LocationSearch from '../post-board/restaurant-board/LocationSearch';
import ActionButtons from '../post-board/restaurant-board/ActionButtons';
import Editor from '../post-board/Editor';
import api from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const FreeBoardPostingPage = () => {
  const category = '자유';
  const navigate = useNavigate();

  useEffect(() => {}, []);

  // 2. 타이틀
  const [title, setTitle] = useState('');
  // 3. 내용
  const [content, setContent] = useState('');

  // 게시글 작성 버튼 관련
  const handleSubmit = () => {
    // if (title.length < 1) {
    //   titleRef.current.focus();
    //   return;
    // }

    const data = {
      board: { title, content },
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

  return (
    <PageContainer>
      <Header />
      <main>
        <Editor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          uploadPlugin={uploadPlugin}
        />
        <LocationSearch />
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

export default FreeBoardPostingPage;
