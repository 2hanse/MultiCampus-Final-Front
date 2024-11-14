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

const styles = {
  userProfile: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems:'flex-stat',
    width:'430px',
    maxHeight:'932px',
    minHeight:'732px',
    backgroundColor: '#fff4d2',
    margin: '0 auto',
    border: '0.5px solid #CAC4D0',
  },
  
  
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
    
  }, []);
  
  const { followed_uid } = useParams();
  console.log(followed_uid);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false); // 북마크 모달 상태 추가
  const navigate = useNavigate();

  const handleProfileIconClick = () => {
    navigate(-1); 
  };

  const handleFollowButtonClick = () => {
    if (isFollowing) {
      setIsUnfollowModalOpen(true); 
    } else {
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
    <div style={styles.userProfile}>
      <Header color='#fff4d2' title="닉네임" actions={<AlaramActions/>
    }/>
      <ProfileStats />
      <p style={styles.statusMessage}>상태 메시지</p>
      <ProfileActions
        handleFollowButtonClick={handleFollowButtonClick}
        isFollowing={isFollowing}
      />
      <ProfileContent handleBookmarkIconClick={handleBookmarkIconClick} /> {/* 북마크 클릭 핸들러 추가 */}
    
      {/* 팔로우 모달 */}
      {isModalOpen && <FollowConfirmationModal username="닉네임" closeModal={closeFollowModal} />}
      
      {/* 언팔로우 모달 */}
      {isUnfollowModalOpen && <UnfollowConfirmation username="닉네임" closeModal={closeUnfollowModal} />}

      {/* 북마크 모달 */}
      {isBookmarkModalOpen && <BookmarkConfirmationModal nickname="닉네임" closeModal={closeBookmarkModal} />}
      <Footer />
    </div>
  );
};


export default UserProfile;