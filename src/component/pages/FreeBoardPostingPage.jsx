import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../post-board/restaurant-board/Header';
import ActionButtons from '../post-board/restaurant-board/ActionButtons';
import Editor from '../post-board/Editor';
import api from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const FreeBoardPostingPage = () => {
  const category = 'free';
  const navigate = useNavigate();

  useEffect(() => {
    const savedDraft = localStorage.getItem('draftPost');
    if (savedDraft) {
      const { title, content } = JSON.parse(savedDraft);
      setTitle(title);
      setContent(content);
    }
  }, []);

  // 2. 타이틀
  const [title, setTitle] = useState('');
  // 3. 내용
  const [content, setContent] = useState('');

  // 임시저장
  const handleDraftSave = () => {
    const draft = {
      title,
      content,
    };

    console.log('임시저장 데이터', draft);
    localStorage.setItem('draftPost', JSON.stringify(draft));
    alert('게시글이 임시저장되었습니다.');
  };

  // 게시글 작성 버튼 관련
  const handleSubmit = async () => {
    // if (title.length < 1) {
    //   titleRef.current.focus();
    //   return;
    // }

    const data = {
      board: { title, content },
    };

    await api.post(`/boards/${category}`, data).then((res) => {
      if (res.status === 200) {
        // 게시물 작성 후 로컬스토리지에서 임시 저장된 데이터 삭제
        localStorage.removeItem('draftPost');

        // 페이지 이동
        navigate('-1', { replace: true });

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

  // 태그 없애는 메서드
  const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleContentChange = (event, editor) => {
    const rawContent = editor.getData(); // HTML이 포함된 데이터
    const plainTextContent = removeHtmlTags(rawContent); // HTML 태그 제거
    setContent(plainTextContent);
    console.log('테그 제거된 값 ' + plainTextContent); // 태그가 제거된 순수 텍스트 확인
  };

  return (
    <PageContainer>
      <Header />
      <main>
        <Editor
          title={title}
          setTitle={setTitle}
          content={content}
          handleContentChange={handleContentChange}
          uploadPlugin={uploadPlugin}
        />
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

export default FreeBoardPostingPage;
