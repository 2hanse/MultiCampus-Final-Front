import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../layout/header/Header';
import ActionButtons from '../../post-board/restaurant-board/ActionButtons';
import Editor from '../../post-board/Editor';
import api from '../../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PutActionButtons from './PutActionButtons';

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

  // 7. 수정하는 상태인지 작성하는 상태인지 확인
  const [putState, setPutState] = useState(false);
  // 8. 게시물 수정하기 눌렀을때 어떤 게시물인지 확인하는 board_id
  const { board_id } = useParams();

  useEffect(() => {
    const fetchBoardData = async () => {
      if (board_id) {
        setPutState(true);
        const res = await api.get(`/boards/${board_id}`);
        console.log('res : ', res.data);
        setTitle(res.data.board.title);
        setContent(res.data.board.content);
      } else {
        setPutState(false);
      }
    };
    fetchBoardData();
  }, [board_id, putState]); // board_id나 putState가 변경될 때마다 실행됩니다.

  // 임시저장
  const handleDraftSave = () => {
    console.log('handlesubmit : ', content);
    setContent(handleContentChange(content));
    console.log('changedhandlesubmit : ', content);

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

    console.log('handlesubmit : ', content);
    setContent(handleContentChange(content));
    console.log('changedhandlesubmit : ', content);

    const data = {
      board: { title, content },
    };

    await api.post(`/boards/${category}`, data).then((res) => {
      if (res.status === 200) {
        // 게시물 작성 후 로컬스토리지에서 임시 저장된 데이터 삭제
        localStorage.removeItem('draftPost');

        // 페이지 이동
        navigate(-1, { replace: true });

        return;
      } else {
        alert('업로드 실패.');
        return;
      }
    });
  };

  const handleContentChange = (data) => {
    const plainTextContent = removeHtmlTags(data); // HTML 태그 제거
    return plainTextContent;
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

  const haederProps = {
    color: '#f4b183',
    title: '게시글 작성',
  };

  return (
    <PageContainer>
      {putState ? (
        <>
          <Header {...haederProps} />
          <ContentContainer>
            <Editor
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              uploadPlugin={uploadPlugin}
            />
            <PutActionButtons
              handleDraftSave={handleDraftSave}
              handleSubmit={handleSubmit}
            />
          </ContentContainer>
        </>
      ) : (
        <>
          <Header {...haederProps} />
          <ContentContainer>
            <Editor
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              uploadPlugin={uploadPlugin}
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
export default FreeBoardPostingPage;
