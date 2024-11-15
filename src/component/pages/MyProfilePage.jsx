import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 추가
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import MembershipInfoModal from '../ProfilePage/MembershipInfoModal';
import LogoutModal from '../ProfilePage/LogoutModal';
import api from '../api/axios';
import MypageActions from '../ProfilePage/MypageAction';

const styles = {
  profilePage: {
    backgroundColor: "#fff4d2",
    display: "flex",
    maxWidth: "430px",
    flexDirection: "column", // flexDirection은 한 번만 설정
    margin: "0 auto",
    overflow: "hidden",
    alignItems: "flex-start", // 'flexstart'는 'flex-start'로 수정
  },
  headerWrapper: {
    width: "100%",
    position: "relative",
    zIndex: 1,  // UI 요소가 겹칠 경우 우선순위를 높이기 위해 추가
  },
  profileContent: {
    width: "100%",
    height: "calc(100vh - 216px)",
    // padding: "20px",
    boxSizing: "border-box",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none", // 웹킷 기반 브라우저에서 스크롤바 숨기기
    },
    msOverflowStyle: "none",  // IE 및 Edge에서 스크롤바 숨기기
    scrollbarWidth: "none",   // Firefox에서 스크롤바 숨기기
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  title: {
    color: "#000",
    font: "400 20px Inter, sans-serif",
    margin: "0",
    marginRight: "10px",
  },
  profileInfo: {
    marginTop: "14px",
    padding: "0 15px",
  },
  divider: {
    borderTop: "1px solid #ddd",
    marginBottom: "16px",
  },
  
  userDetails: {
    borderRadius: "30px",
    backgroundColor: "#fffbfb",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    color: "#000",
    justifyContent: "space-between",
    padding: "16px 29px", 
    font: "400 16px Inter, sans-serif", 
  },
  userAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  userNameWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems:"center",
  },
  userName: {
    margin: "0",
    fontSize: "20px",
    marginRight: '120px',
  },
  userRank: {
    textAlign: "center",
    fontSize: "16px",
    cursor: 'pointer',
  },
  communitySection: {
    marginTop: "31px",
    padding: "0 15px",
  },
  sectionTitle: {
    color: "#000",
    font: "400 24px Inter, sans-serif",
    margin: "0 0 10px 20px",
  },
  communityList: {
    borderRadius: "30px",
    backgroundColor: "#fffbfb",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    color: "#dfa67b",
    padding: "31px 29px",
    listStyleType: "none",
    margin: "0",
  },
  communityItem: {
    font: "400 17px Inter, sans-serif",
    marginBottom: "10px",
  },
  communityItemLast: {
    marginBottom: "0",
  },
  otherSection: {
    marginTop: "31px",
    padding: "0 15px",
  },
  otherList: {
    borderRadius: "30px",
    backgroundColor: "#fffbfb",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    color: "#dfa67b",
    padding: "15px 29px",
    listStyleType: "none",
    margin: "0",
  },
  otherItem: {
    font: "400 17px Inter, sans-serif",
    marginBottom: "10px",
  },
  otherItemLast: {
    marginBottom: "0",
  },
  accountSection: {
    marginTop: "31px",
    padding: "0 15px",
    marginBottom: "30px",
  },
  accountInfoList: {
    borderRadius: "30px",
    backgroundColor: "#fffbfb",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    color: "#dfa67b",
    padding: "15px 29px",
    listStyleType: "none",
    margin: "0",
  },
  accountInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  accountItem: {
    color: "#dfa67b",
    font: "400 17px Inter, sans-serif",
    marginBottom: "10px",
    marginTop: "10px",
    cursor: "pointer",
  },
  notificationSection: {
    marginTop: "31px",
    padding: "0 15px",
  },
  notificationList: {
    borderRadius: "30px",
    backgroundColor: "#fffbfb",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    color: "#dfa67b",
    padding: "15px 29px",
    listStyleType: "none",
    margin: "0",
  },
  notificationItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  notificationLabel: {
    color: "#dfa67b",
    font: "400 17px Inter, sans-serif",
  },
  toggleSwitch: {
    width: "40px",
    height: "22px",
    backgroundColor: "#e0e0e0",
    borderRadius: "50px",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  switchHandle: {
    width: "18px",
    height: "18px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    transition: "transform 0.3s ease",
  },
  enabledSwitch: {
    backgroundColor: "#ff5c5c",
  },
  enabledSwitchHandle: {
    transform: "translateX(18px)",
  },
};

function MyProfilePage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true); // 모달 열기
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false); // 모달 닫기
  };

  return (
    <main style={styles.profilePage}>
      <div style={styles.headerWrapper}>
        <Header color="#fff4d2" title="마이페이지" actions={<MypageActions />} />
        <div style={styles.divider}></div>
      </div>
      <div style={styles.profileContent}>
        <ProfileInfo />
        <CommunitySection />
        <OtherSection />
        <NotificationSection />
        <AccountSection openLogoutModal={openLogoutModal} />
      </div>
      {isLogoutModalOpen && <LogoutModal closeModal={closeLogoutModal} />}
      <Footer />
    </main>
  );
}




const ProfileInfo = ({userImage, nickname}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <section style={styles.profileInfo}>
      <div style={styles.userDetails}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a41dabe80615eacb53b883e9e94b260996b558b97729747665bca20736adc395?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="User Avatar"
          style={styles.userAvatar}
        />
        <div style={styles.userNameWrapper}>
          <h2 style={styles.userName}>닉네임</h2>
          {/* 회원 등급 클릭 시 모달 열기 */}
          <span style={styles.userRank} onClick={openModal}>
            (회원 등급)
          </span>
        </div>
      </div>
      {isModalOpen && <MembershipInfoModal closeModal={closeModal} />} {/* 모달이 열리면 표시 */}
    </section>
  );
}

function CommunitySection() {
  const navigate = useNavigate();

  const communityItems = [
    { name: '내가 쓴 게시글', path: '/profile' },
    { name: '내가 쓴 리뷰', path: '/review-history' },
    { name: '내가 쓴 댓글', path: '/comment-history' },
    { name: '북마크', path: '/homepage', openBookmarkSheet: true },
    { name: '좋아요 누른 게시글' , path: '/liked-posts'},
    { name: '팔로우/팔로워', path: '/subscribe' },
  ];

  const handleItemClick = (path, openBookmarkSheet) => {
    if (path) navigate(path, {state: {openBookmarkSheet}});
  };

  return (
    <section style={styles.communitySection}>
      <h2 style={styles.sectionTitle}>커뮤니티</h2>
      <ul style={styles.communityList}>
        {communityItems.map((item, index) => (
          <li
            key={index}
            style={{
              ...styles.communityItem,
              ...(index === communityItems.length - 1 ? styles.communityItemLast : {}),
              cursor: "pointer", // 손 모양 커서 스타일 추가
            }}
            onClick={() => handleItemClick(item.path, item.openBookmarkSheet)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

function OtherSection() {
  const navigate = useNavigate();

  const otherItems = [
    { name: '영수증', path: '/receipt-collection' },
    { name: '위치 인증', path: '/mylocation' },
  ];

  const handleItemClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <section style={styles.otherSection}>
      <h2 style={styles.sectionTitle}>기타</h2>
      <ul style={styles.otherList}>
        {otherItems.map((item, index) => (
          <li
            key={index}
            style={{
              ...styles.otherItem,
              ...(index === otherItems.length - 1 ? styles.otherItemLast : {}),
              cursor: "pointer", // 손 모양 커서 스타일 추가
            }}
            onClick={() => handleItemClick(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

function NotificationSection() {
  const [notifications, setNotifications] = React.useState([
    { label: "게시물 알람", enabled: true },
    { label: "댓글 알람", enabled: true },
    { label: "좋아요 알람", enabled: false },
    { label: "구독 알람", enabled: false },
  ]);

  const toggleNotification = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification, idx) =>
        idx === index
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  return (
    <section style={styles.notificationSection}>
      <h2 style={styles.sectionTitle}>알림 설정</h2>
      <ul style={styles.notificationList}>
        {notifications.map((notification, index) => (
          <li key={index} style={styles.notificationItem}>
            <span style={styles.notificationLabel}>{notification.label}</span>
            <div
              style={{
                ...styles.toggleSwitch,
                ...(notification.enabled ? styles.enabledSwitch : {}),
              }}
              onClick={() => toggleNotification(index)}
            >
              <div
                style={{
                  ...styles.switchHandle,
                  ...(notification.enabled ? styles.enabledSwitchHandle : {}),
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AccountSection({ openLogoutModal }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    openLogoutModal();  // 로그아웃 클릭 시 모달 열기
  };

  return (
    <section style={styles.accountSection}>
      <h2 style={styles.sectionTitle}>계정</h2>
      <ul style={styles.accountInfoList}>
        <li
          style={styles.accountItem}
          onClick={() => navigate("/user/me/changePassword")}
        >
          비밀번호 변경
        </li>
        <li
          style={styles.accountItem}
          onClick={handleLogout} // 로그아웃 클릭 시 모달 열기
        >
          로그 아웃
        </li>
      </ul>
    </section>
  );
}

export default MyProfilePage;
