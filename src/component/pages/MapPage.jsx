import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../map/Header';
import Map from '../map/Map';
import { Sheet } from 'react-modal-sheet';
import BookmarkList from '../bookmark/BookmarkList';
import CreateBookmark from '../bookmark/CreateBookmark';
import Footer from '../layout/footer/Footer';

function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (location.state?.openBookmarkSheet) {
      setOpen(true);
    }
  }, [location.state]);

  const handleBackPageClick = () => {
    navigate(-1, { state: { openBookmarkSheet: true } });
  };

  return (
    <Main>
      <Header onClickBookmark={() => setOpen(true)} />
      <Map />
      <CustomSheet
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
          navigate('/homepage', { replace: true });
        }}
        snapPoints={[700, 400, 0]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <BookmarkList
              onOpenCreate={() => {
                setOpen(false);
                setCreateOpen(true);
              }}
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onClick={() => {
            setOpen(false);
            navigate('/homepage', { replace: true });
          }}
        />
      </CustomSheet>
      <CustomSheet
        isOpen={isCreateOpen}
        onClose={() => {
          setCreateOpen(false);
          setOpen(true);
        }}
        snapPoints={[500, 500, 0]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <CreateBookmark
              onCancel={() => {
                setCreateOpen(false);
                setOpen(true);
              }}
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop
          onClick={() => {
            setCreateOpen(false);
            setOpen(true);
          }}
        />
      </CustomSheet>
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
  max-height: 932px;
  min-height: 732px;
  background: #fff4d2;
  margin: 0 auto;
  border: 0.5px solid #cac4d0;
`;

const CustomSheet = styled(Sheet)`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  margin-bottom: 102px;
  max-width: 430px;
  z-index: 5;

  /* sheet 라이브러리 css 덮어 쓰려면 !important 끝에 들어가야합니다 */
  .react-modal-sheet-backdrop {
    position: absolute !important;
    width: 430px !important;
    margin-bottom: 100px !important;
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
  .react-modal-sheet-container {
    background-color: #ffffff !important;
    border-radius: 20px 20px 0px 0px !important;
    padding-top: 10px !important;
  }
  .react-modal-sheet-header {
    cursor: pointer !important;
  }
  .react-modal-sheet-drag-indicator {
    background: #999 !important;
    border-radius: 5px !important;
    cursor: grab;
  }
  .react-modal-sheet-content {
    margin: 10px 20px !important;
  }
`;

export default MapPage;
