import React, { useState } from 'react'; // useState 임포트 추가
import { useNavigate } from 'react-router-dom';
import FollowConfirmationModal from './FollowConfirmationModal'; // 팔로우 모달 컴포넌트
import UnfollowConfirmation from './UnfollowConfirmation'; // 언팔로우 모달 컴포넌트

const styles = {
  userProfile: {
    backgroundColor: '#fff4d2',
    display: 'flex',
    maxWidth: '480px',
    width: '100%',
    paddingTop: '62px',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: '0 auto',
    font: '400 17px Inter, sans-serif',
    color: '#000',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    padding: '0 28px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    font: '18px/1 Roboto, sans-serif',
  },
  profileIcon: {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
    cursor: 'pointer',
  },
  nickname: {
    marginTop: '15px',
    fontSize: '18px',
  },
  settingsIcon: {
    width: '15px',
    height: '18px',
    objectFit: 'contain',
    marginTop: '4px',
    cursor: 'pointer',
  },
  profileStats: {
    display: 'flex',
    marginTop: '50px',
    width: '100%',
    maxWidth: '355px',
    gap: '20px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
  },
  profileImage: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '35px',
    justifyContent: 'start',
    margin: 'auto 0',
  },
  statItem: {
    width: '56px',
  },
  statusMessage: {
    marginTop: '25px',
    padding: '0 28px',
  },
  profileActions: {
    display: 'flex',
    marginTop: '25px',
    width: '100%',
    gap: '20px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
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
  messageButton: {
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
    padding: '9px 36px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  profileContent: {
    backgroundColor: '#fff',
    display: 'flex',
    marginTop: '23px',
    width: '100%',
    flexDirection: 'column',
    padding: '16px 0',
  },
  contentNav: {
    display: 'flex',
    width: '286px',
    maxWidth: '100%',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'space-between',
    margin: '0 auto',
  },
  navIcon: {
    width: '30px',
    height: '30px',
    objectFit: 'contain',
  },
  divider: {
    width: '100%',
    border: 'none',
    borderTop: '1px solid #cac4d0',
    margin: '12px 0',
  },
  footerImage: {
    width: '100%',
    objectFit: 'contain',
  },
};

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 팔로우 모달 상태
  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false); // 언팔로우 모달 상태
  const [isFollowing, setIsFollowing] = useState(false); // 팔로우 상태
  const navigate = useNavigate();

  const handleProfileIconClick = () => {
    navigate('/'); 
  };

  const handleFollowButtonClick = () => {
    if (isFollowing) {
      setIsUnfollowModalOpen(true); // 이미 팔로우 중이면 언팔로우 모달 열기
    } else {
      setIsModalOpen(true); // 팔로우 중이 아니면 팔로우 모달 열기
    }
  };

  const closeFollowModal = (followConfirmed) => {
    if (followConfirmed) {
      setIsFollowing(true); // 팔로우 확정되면 상태 업데이트
    }
    setIsModalOpen(false); // 팔로우 모달 닫기
  };

  const closeUnfollowModal = (unfollowConfirmed) => {
    if (unfollowConfirmed) {
      setIsFollowing(false); // 언팔로우 확정되면 상태 업데이트
    }
    setIsUnfollowModalOpen(false); // 언팔로우 모달 닫기
  };

  return (
    <div style={styles.userProfile}>
      <ProfileHeader handleProfileIconClick={handleProfileIconClick} />
      <ProfileStats />
      <p style={styles.statusMessage}>상태 메시지</p>
      <ProfileActions
        handleFollowButtonClick={handleFollowButtonClick}
        isFollowing={isFollowing}
      />
      <ProfileContent />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/736ac1aa27ad8f949e50ba8f925d49388dfa94ac68a35a17932cf80f7b9d61ed?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
        alt="Footer"
        style={styles.footerImage}
      />

      {/* 팔로우 모달 */}
      {isModalOpen && <FollowConfirmationModal username="닉네임" closeModal={closeFollowModal} />}
      
      {/* 언팔로우 모달 */}
      {isUnfollowModalOpen && <UnfollowConfirmation username="닉네임" closeModal={closeUnfollowModal} />}
    </div>
  );
};

const ProfileHeader = ({ handleProfileIconClick }) => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/memberinfo');
  };

  return (
    <header style={styles.profileHeader}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
        alt="Profile Icon"
        style={styles.profileIcon}
        onClick={handleProfileIconClick}
      />
      <h1 style={styles.nickname}>닉네임</h1>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/98fd1e5fbd5f0c9367d03b9713c2dbc57fd8cf5b3f36e16cbd8c18f78188a0bb?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
        alt="Settings Icon"
        style={styles.settingsIcon}
        onClick={handleSettingsClick}
      />
    </header>
  );
};

const ProfileStats = () => {
  return (
    <section style={styles.profileStats}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7a38cc5eac3bdddc15bd83f752ef5b7883c36669787fc9f39a59bad39fb1d40?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
        alt="Profile"
        style={styles.profileImage}
      />
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <p>N</p>
          <p>게시물</p>
        </div>
        <div style={styles.statItem}>
          <p>N</p>
          <p>팔로우</p>
        </div>
        <div style={styles.statItem}>
          <p>N</p>
          <p>팔로워</p>
        </div>
      </div>
    </section>
  );
};

const ProfileActions = ({ handleFollowButtonClick, isFollowing }) => {
  return (
    <div style={styles.profileActions}>
      <button
        style={{
          ...styles.followButton,
          backgroundColor: isFollowing ? 'white' : 'skyblue',  // 팔로잉일 때 배경색을 흰색으로 설정
          color: isFollowing ? '#000' : '#fff',  // 팔로잉일 때 글자색을 검정색으로 설정
        }}
        onClick={handleFollowButtonClick}
      >
        {isFollowing ? '팔로잉' : '팔로우'}
        
      </button>
      <button style={styles.messageButton}>메시지</button>
    </div>
  );
};

const ProfileContent = () => {
  return (
    <section style={styles.profileContent}>
      <nav style={styles.contentNav}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/89b61b15b519fe221e92df692e5820956878259d34838bb629e95066ac325275?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="Nav Icon"
          style={styles.navIcon}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/596b40e055c6c3096f41336ca0531e628e401ac369dec262300bba7467721588?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="Nav Icon"
          style={styles.navIcon}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b18b77b5d6ce2798eaa729bc37d9585e29111b1ff6db2012daebed19d8146a53?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="Nav Icon"
          style={styles.navIcon}
        />
      </nav>
      <hr style={styles.divider} />
      <p>여기에 콘텐츠를 추가하세요.</p>
    </section>
  );
};

export default UserProfile;
