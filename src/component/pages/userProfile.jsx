import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProfileStats from '../userprofile/ProfileStats';
import ProfileActions from '../userprofile/ProfileActions';
import ProfileContent from '../userprofile/ProfileContent';
import FollowConfirmationModal from '../ProfilePage/FollowConfirmationModal'; // 팔로우 모달 컴포넌트
import UnfollowConfirmation from '../ProfilePage/UnfollowConfirmation'; // 언팔로우 모달 컴포넌트
import Footer from '../layout/footer/Footer';
import BookmarkConfirmationModal from '../ProfilePage/BookmarkConfirmationModal';
import Header from '../layout/header/Header';
import AlaramActions from '../ProfilePage/AlaramAction';
import styled from 'styled-components';

const styles = {
  statusMessage: {
    marginTop: '25px',
    alignSelf: 'flex-start',
    padding: '0 28px',
  },

  followButton: {
    borderRadius: '5px',
    backgroundColor: 'skyblue',
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
    padding: '9px 36px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  followIcon: {
    width: '20px',
    height: '20px',
    objectFit: 'contain',
  },

  title: {
    color: '#1d1b20',
    letterSpacing: '0.5px',
    font: '16px/24px Roboto, sans-serif',
    margin: '4px 0',
  },
  content: {
    color: '#49454f',
    letterSpacing: '0.25px',
    font: '14px/20px Roboto, sans-serif',
    margin: '0',
  },
};

const UserProfile = () => {
  useEffect(() => {
    getUserInfo();
    getWritedBoards();
  }, []);

  // 선택된 유저 Id
  const { followed_uid } = useParams();
  console.log('선택된 유저 id : ', followed_uid);

  const [nickname, setNickname] = useState('닉네임');
  const [userImage, setUserImage] = useState(
    'https://cdn.builder.io/api/v1/image/assets/TEMP/17c70c46cd6bb71b05cd93581bc2d83c1e7bb0955516a7b4f5baa99723121b6b?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4'
  );

  // 게시물 수
  const [countBoard, setCountBoard] = useState(0);
  // 팔로잉 수
  const [countFollow, setCountFollow] = useState(0);
  // 팔로워 수
  const [countFoller, setCountFoller] = useState(0);
  const [statusMessage, setStatusMessage] = useState('상태 메시지');

  const [writedBoardData, setWritedBoardData] = useState([]);

  const getUserInfo = async () => {
    try {
      const response = await api.get(`/users/stats/${followed_uid}`);
      console.log('리스폰스 데이터 : ', response.data);
      setCountBoard(response.data.boardCount);
      setCountFollow(response.data.followerCount);
      setCountFoller(response.data.followingCount);
      setNickname(response.data.nickname);
      setUserImage(response.data.profileImgUrl);
      setStatusMessage(response.data.bio_msg);

      const followresponse = await api.get(`/users/follow/${followed_uid}`);
      console.log('팔로우 확인', followresponse.data);
      setIsFollowing(followresponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getWritedBoards = async () => {
    try {
      const response = await api.get(`/users/writed-boards/${followed_uid}`);
      console.log(response.data);
      setWritedBoardData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false); // 북마크 모달 상태 추가
  const navigate = useNavigate();

  const handleProfileIconClick = () => {
    navigate(-1);
  };

  const handleFollowButtonClick = async () => {
    const targetUid = followed_uid;

    if (isFollowing) {
      await api.delete(`/users/follow/${targetUid}`); // 숫자형 `targetUid` 전송
      setIsUnfollowModalOpen(true);
    } else {
      await api.post(`/users/follow/${targetUid}`); // 숫자형 `targetUid` 전송
      setIsModalOpen(true);
    }
  };

  const closeFollowModal = (followConfirmed) => {
    if (followConfirmed) {
      setIsFollowing(true);
    }
    setIsModalOpen(false);
  };

  const closeUnfollowModal = (unfollowConfirmed) => {
    if (unfollowConfirmed) {
      setIsFollowing(false);
    }
    setIsUnfollowModalOpen(false);
  };

  const handleBookmarkIconClick = () => {
    setIsBookmarkModalOpen(true); // 북마크 모달 열기
  };

  const closeBookmarkModal = (confirmed) => {
    // 북마크 저장 로직이 필요하다면 여기에 추가
    setIsBookmarkModalOpen(false); // 모달 닫기
  };

  return (
    <Main>
      <Header color="#fff4d2" title={nickname} actions={<AlaramActions />} />

      <ProfileStatsCover>
        <ProfileStats
          countBoard={countBoard}
          countFollow={countFollow}
          countFoller={countFoller}
          userImage={userImage}
        />
        <p style={styles.statusMessage}>{statusMessage}</p>
        <ProfileActions
          handleFollowButtonClick={handleFollowButtonClick}
          isFollowing={isFollowing}
        />
      </ProfileStatsCover>
      <ChatListContainer>
        <ProfileContent
          writedBoardData={writedBoardData}
          handleBookmarkIconClick={handleBookmarkIconClick}
        />{' '}
        {/* 북마크 클릭 핸들러 추가 */}
        {/* 팔로우 모달 */}
        {isModalOpen && (
          <FollowConfirmationModal
            username="닉네임"
            closeModal={closeFollowModal}
          />
        )}
        {/* 언팔로우 모달 */}
        {isUnfollowModalOpen && (
          <UnfollowConfirmation
            username="닉네임"
            closeModal={closeUnfollowModal}
          />
        )}
        {/* 북마크 모달 */}
        {isBookmarkModalOpen && (
          <BookmarkConfirmationModal
            nickname="닉네임"
            closeModal={closeBookmarkModal}
          />
        )}
      </ChatListContainer>
      <Footer />
    </Main>
  );
};

const ProfileStatsCover = styled.div`
  background-color: #fff4d2;
  width: 430px;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  width: 430px;
  max-height: 932px;
  min-height: 732px;
  background: #ffffff;
  margin: 0 auto;
  border: 0.5px solid #cac4d0;
`;

const ChatListContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE 및 Edge */
  scrollbar-width: none; /* Firefox */
`;

export default UserProfile;
