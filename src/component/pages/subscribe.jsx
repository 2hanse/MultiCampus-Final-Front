import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/footer/Footer';
import {getUserIdFromToken} from '../api/jwt';
import api from '../api/axios';

// CSS 스타일을 포함합니다.
const styles = {
  subscriptionFeed: {
    backgroundColor: '#fff',
    display: 'flex',
    maxWidth: '430px',
    maxHeight: '932px',
    width: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: '0 auto',
    border: '1px solid #ddd',
  },
  header: {
    backgroundColor: '#fff4d2',
    padding: '62px 20px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '24px',
  },
  title: {
    color: '#000',
    textAlign: 'center',
    marginright: '10px',
    font: '400 18px/1 Roboto, sans-serif',
  },
  followList: {
    display: 'flex',
    marginTop: '27px',
    width: '100%',
    flexDirection: 'column',
    color: '#000',
    padding: '0 31px',
    font: '400 15px/1 Roboto, sans-serif',
  },
  listTitle: {
    alignSelf: 'start',
  },
  listContainer: {
    display: 'flex',
    marginTop: '18px',
    gap: '14px',
    textAlign: 'center',
    overflowX: 'auto', // 가로 스크롤 활성화
    whiteSpace: 'nowrap', // 항목을 한 줄로 배열
    boxsizing: 'borderbox',
  },
  followItem: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto', // 아이템 크기를 고정하여 축소되지 않게 설정
    marginRight: '14px', // 항목 간 간격
  },
  avatar: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '60px',
  },
  nickname: {
    alignSelf: 'center',
    marginTop: '7px',
  },
  divider: {
    background: '#cac4d0',
    minHeight: '1px',
    width: '100%',
    border: '1px solid #cac4d0',
    margin: '26px 0 12px',
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
  },
  actionButtonImg: {
    aspectRatio: '1',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '30px',
  },
};

// SubscriptionFeed 컴포넌트
const SubscriptionFeed = () => {
  useEffect(() => {
    
    getFollowingUserInfo();
  }, []);

  

  const [followingUsers, setFollowingUsers] = useState([]);

  const getFollowingUserInfo = async () => {
    try {
      const user_id = getUserIdFromToken();
      console.log(user_id);
      const response = await api.get(`/users/${user_id}/following`);
      console.log(response.data);
      setFollowingUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main style={styles.subscriptionFeed}>
      <Header />
      <FollowList followingUsers={followingUsers} />
      <Divider />
      <Footer /> {/* Footer 추가 (import한 Footer 사용) */}
    </main>
  );
};

// Header 컴포넌트
const Header = () => {
  return (
    <header style={styles.header}>
      <Link to="/myprofilepage">
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
          alt="Menu Icon" 
          style={styles.menuIcon} 
        />
      </Link>
      <h1 style={styles.title}>구독 피드</h1>
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
        alt="Menu Icon" 
        style={styles.menuIcon} 
      />
    </header>
  );
};

// FollowList 컴포넌트
const FollowList = ({followingUsers}) => {
  const followData = followingUsers;
  console.log("followData 확인", followData);
  return (
    <section style={styles.followList}>
      <h2 style={styles.listTitle}>팔로우 목록</h2>
      <div style={styles.listContainer}>
        <div style={{ display: 'flex', transition: 'transform 0.3s ease' }}>
          {followData.map((follow) => (
            <Link
              to={`/user-profile/${follow.followed_uid}`}
              key={follow.followed_uid}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={styles.followItem}>
                <img
                  src={follow.profile_img_url}
                  alt="Avatar"
                  style={styles.avatar}
                />
                <span style={styles.nickname}>{follow.nickname}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Divider 컴포넌트
const Divider = () => {
  return <hr style={styles.divider} />;
};



// App 컴포넌트로 SubscriptionFeed를 내보냅니다.
const App = () => <SubscriptionFeed />;

export default App;
