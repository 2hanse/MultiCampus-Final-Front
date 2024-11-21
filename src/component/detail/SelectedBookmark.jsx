import { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api/axios';
import SelectedPlaceList from './SelectedPlaceList';

const SelectedBookmark = ({ bookmark }) => {
  useEffect(() => {}, []);

  const [isListVisible, setIsListVisible] = useState(false);
  const [placeList, setPlaceList] = useState([]);

  const handleClick = async () => {
    try {
      const res = await api.get(`/bookmarks/place/${bookmark.bookmark_id}`);
      console.log('res 데이터:', res.data); // 응답 데이터
      setIsListVisible(true); // 결과 데이터로 상태 업데이트
      setPlaceList(res.data);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  return (
    <div style={{ border: '1px solid #d3d3d3' }}>
      <ItemWrapper onClick={handleClick}>
        <ItemContent>
          <GroupName>
            {bookmark.bookmark_title}{' '}
            <AuthorName>{bookmark.user_nickname}</AuthorName>
          </GroupName>
        </ItemContent>
        <ExpandIcon
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1541bad3fc27abbfb842592920ca5dba61084f952fe090a89d971ec02a989bf?placeholderIfAbsent=true&apiKey=96b0aafc0bca4efc865afcf9a032943c"
          alt="Expand"
        />
      </ItemWrapper>
      {isListVisible && (
        <Container>
          {placeList.map((place) => (
            <SelectedPlaceList key={place.id} place={place} />
          ))}
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  margin-top: 10px;
  position: relative;
  display: flex;
  flex-direction: column; /* 세로 정렬을 위한 변경 */
  height: 100px;
  max-height: 300px; /* 최대 높이를 설정 */
  width: 370px;

  align-items: center; /* 가로 중앙 정렬 */
  justify-content: flex-start; /* 세로 정렬 (스크롤이 가능하도록 위로 정렬) */
  background-color: #ffffff;
  border-bottom: 0.1px solid #cac4d0;
  cursor: pointer;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 생성 */

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ItemWrapper = styled.li`
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  min-height: 60px;
  width: 377px;
  padding-left: 50px;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-between; /* 좌우 공간 분배 */
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const GroupName = styled.h3`
  color: #757575;
  letter-spacing: 0.5px;
  font: 400 16px/24px Roboto, sans-serif;
  margin: 0;
`;

const AuthorName = styled.span`
  color: #757575;
`;

const GroupCount = styled.p`
  color: #49454f;
  letter-spacing: 0.25px;
  font: 400 14px/20px Roboto, sans-serif;
  margin: 0;
`;

const ExpandIcon = styled.img`
  position: absolute;
  top: 15px;
  left: 16px;
  width: 24px;
  height: 24px;
`;

export default SelectedBookmark;
