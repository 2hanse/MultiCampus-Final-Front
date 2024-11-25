import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 추가
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import MembershipInfoModal from '../ProfilePage/MembershipInfoModal';
import LogoutModal from '../ProfilePage/LogoutModal';
import api from '../api/axios';
import MypageActions from '../ProfilePage/MypageAction';
import {getUserIdFromToken} from '../api/jwt'; // userid

const styles = {
  profilePage: {
    backgroundColor: "#fff4d2",
    border: "0.5px solid #CAC4D0",
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
    color: "#DFA67B",
    fontWeight: "bold",
    padding: "31px 29px",
    listStyleType: "none",
    margin: "0",
  },
  communityItem: {
    font: "400 17px Inter, sans-serif",
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    backgroundColor: "#ED6000",
  },
  enabledSwitchHandle: {
    transform: "translateX(18px)",
  },
};

function MyProfilePage() {

  const user_id = getUserIdFromToken(); // 백엔드
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    getUserInfo();  // getUserInfo 정보를 자동 호출.
  }, []);           // [] : 마운트될때 실행하라는 의미. (의존성 배열)

   const [nickname,setNickname] = useState("닉네임");
   const [member_score,setMember_score] = useState(0);
   const [image, setImage] = useState("https://cdn.builder.io/api/v1/image/assets/TEMP/17c70c46cd6bb71b05cd93581bc2d83c1e7bb0955516a7b4f5baa99723121b6b?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4");

  const getUserInfo = async () =>{
    try {
      const response = await api.get(`users/info/${user_id}`) // 백엔드 (insert의 경우 반환값이 없기에 필요 x.)
      console.log("리스폰스 데이터 : " , response); // 콘솔상에서 데이터 확인
      setNickname(response.data.nickname);
      setMember_score(response.data.member_score);
      setImage(response.data.profile_img_url);
      // console.log("멤버 스코어: ",member_score);
      // console.log("이름: ",nickname);
      console.log("이미지: ",image);
    } catch(err){
      console.error(err);
    }
    // console.log("이름: ", nickname);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true); // 모달 열기
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false); // 모달 닫기
  };

  return (
    <main style={styles.profilePage}>
      <div style={styles.headerWrapper}>
        <Header color="#ffffff" title="마이페이지" actions={<MypageActions />} />
        <div style={styles.divider}></div>
      </div>
      <div style={styles.profileContent}>
        <ProfileInfo nick={nickname} member_score={member_score} image={image}/>
        {/* nickname이라는 변수를 profileinfo에 보내겠다는 의미. , 앞에 있는 nick : 하위 컴포넌트에 보내주는것을 의미 */}
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




const ProfileInfo = ({nick, member_score, image}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 등급 결정 함수
  const getMemberRank = (score) => {
    if (score >= 100) return "네공기";
    if (score >= 50) return "세공기";
    if (score >= 30) return "두공기";
    if (score >= 10) return "한공기";
    return "빈공기"; // 10점 미만인 경우 기본 등급
  };

  return (
    <section style={styles.profileInfo}>
      <div style={styles.userDetails}>
        <img
          src={image}
          alt="User Avatar"
          style={styles.userAvatar}
        />
        <div style={styles.userNameWrapper}>
          <h2 style={styles.userName}>{nick}</h2> 
          {/* nickname 값을 가져옴 */}

          {/* 회원 등급 클릭 시 모달 열기 */}
          <span style={styles.userRank} onClick={openModal}>
            {getMemberRank(member_score)}
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
    { label: "게시물 알림", enabled: true },
    { label: "댓글 알림", enabled: true },
    { label: "좋아요 알림", enabled: true },
    { label: "구독 알림", enabled: true },
  ]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/users/get-alert");
        const alertStatus = response.data; // AlertStatusDTO 구조

        // 서버 데이터를 notifications 상태에 동기화
        setNotifications((prevNotifications) => [
          { ...prevNotifications[0], enabled: alertStatus.alert_board },
          { ...prevNotifications[1], enabled: alertStatus.alert_comment },
          { ...prevNotifications[2], enabled: alertStatus.alert_like },
          { ...prevNotifications[3], enabled: alertStatus.alert_book_subs },
        ]);
      } catch (error) {
        console.error("알림 설정 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchNotifications();
  }, []);

  const toggleNotification = async (index) => {
    try {
      const response = await api.put(`/users/set-alert/${index + 1}`);

      const updatedEnabled = response.data;

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification, idx) =>
          idx === index
            ? { ...notification, enabled: updatedEnabled }
            : notification
        )
      );
    } catch (error) {
      console.error("알림 설정 토글 중 오류 발생:", error);
    }
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
