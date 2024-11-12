import React, { useState } from 'react'; // useState 임포트 추가
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FollowConfirmationModal from '../ProfilePage/FollowConfirmationModal'; // 팔로우 모달 컴포넌트
import UnfollowConfirmation from '../ProfilePage/UnfollowConfirmation'; // 언팔로우 모달 컴포넌트
import Footer from '../layout/footer/Footer';
import BookmarkConfirmationModal from '../ProfilePage/BookmarkConfirmationModal';

const styles = {
  userProfile: {
    backgroundColor: '#fff4d2',
    display: 'flex',
    maxWidth: '430px',
    width: '100%',
    paddingTop: '62px',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: '0 auto',
    font: '400 17px Inter, sans-serif',
    color: '#000',
    border: '1px solid #ccc',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    font: '18px/1 Roboto, sans-serif',
    width: '100%',
    padding: '0 28px',
  },
  profileIcon: {
    width:'24px',
    height: '24px',
    objectFit:'contain',
  },
  nickname: {
    margin: 0,
    fontSize: '18px',
  },
  settingsIcon: {
    width:'15px',
    height:'18px',
  },
  divider: {
    border: '0',
    height: '1px',
    backgroundcolor: '#ddd', /* 구분선 색상 */
    margin: '20px 0', /* 위아래 여백 추가 */
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
    display: 'flex',
    flexDirection: 'column',
  },
  statusMessage: {
    marginTop: '25px',
    alignSelf: 'flex-start',
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
    paddingleft:'20px',
  },
  reviewList: {
    marginLeft: '20px', // This will shift the review content to the right
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
  timestamp: {
    color: '#49454f',
    letterSpacing: '0.5px',
    font: '500 12px/16px Roboto, sans-serif',
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

const reviewData = [
  { timestamp: "n분 전", title: "[동네주민] 게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "n분 전", title: "[동네주민] 게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "n분 전", title: "게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "n분 전", title: "게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "yy.mm.dd", title: "게시글 제목", content: "게시글 본문(20자)" },
  { timestamp: "yy.mm.dd", title: "게시글 제목", content: "게시글 본문(20자)" },
];

// ReviewListItem 컴포넌트
function ReviewListItem({ timestamp, title, content }) {
  return (
    <article>
      <hr />
      <time style={styles.timestamp}>{timestamp}</time>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.content}>{content}</p>
    </article>
  );
}

const UserProfile = () => {
  const { id } = useParams();
  console.log(id);
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
      <ProfileHeader handleProfileIconClick={handleProfileIconClick} />
      <ProfileStats />
      <p style={styles.statusMessage}>상태 메시지</p>
      <ProfileActions
        handleFollowButtonClick={handleFollowButtonClick}
        isFollowing={isFollowing}
      />
      <ProfileContent handleBookmarkIconClick={handleBookmarkIconClick} /> {/* 북마크 클릭 핸들러 추가 */}
      <Footer />

      {/* 팔로우 모달 */}
      {isModalOpen && <FollowConfirmationModal username="닉네임" closeModal={closeFollowModal} />}
      
      {/* 언팔로우 모달 */}
      {isUnfollowModalOpen && <UnfollowConfirmation username="닉네임" closeModal={closeUnfollowModal} />}

      {/* 북마크 모달 */}
      {isBookmarkModalOpen && <BookmarkConfirmationModal nickname="닉네임" closeModal={closeBookmarkModal} />}
    </div>
  );
};

const ProfileHeader = ({ handleProfileIconClick }) => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/myprofilepage');
  };

  return (
    <header style={styles.profileHeader}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
        alt="Profile Icon"
        style={styles.profileIcon}
        onClick={handleProfileIconClick}
      />
      <div>
        <h1 style={styles.nickname}>닉네임</h1>
      </div>
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

const ProfileContent = ({ handleBookmarkIconClick }) => {
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
          style={{ ...styles.navIcon, cursor: "pointer" }} // 커서가 pointer로 변경
          onClick={handleBookmarkIconClick} // 이미지 클릭 시 북마크 모달 열기
        />
      </nav>
      <section style={styles.reviewList}>
        {reviewData.map((review, index) => (
          <ReviewListItem key={index} {...review} />
        ))}
      </section>
    </section>
  );
};

export default UserProfile;