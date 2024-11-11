import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/footer/Footer';

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
  actionButtons: {
    alignSelf: 'center',
    display: 'flex',
    width: '284px',
    maxWidth: '100%',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'space-between',
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
  return (
    <main style={styles.subscriptionFeed}>
      <Header />
      <FollowList />
      <Divider />
      <ActionButtons />
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
const FollowList = () => {
  const followData = [
    { id: 1, name: '닉네임1' },
    { id: 2, name: '닉네임2' },
    { id: 3, name: '닉네임3' },
    { id: 4, name: '닉네임4' },
    { id: 5, name: '닉네임5' },
    { id: 6, name: '닉네임6' },
    { id: 7, name: '닉네임7' },
    { id: 8, name: '닉네임8' },
    { id: 9, name: '닉네임9' },
  ];

  return (
    <section style={styles.followList}>
      <h2 style={styles.listTitle}>팔로우 목록</h2>
      <div style={styles.listContainer}>
        <div style={{ display: 'flex', transition: 'transform 0.3s ease' }}>
          {followData.map((follow) => (
            <Link to={`/user-profile/${follow.id}`} key={follow.id} style={{ textDecoration: 'none' }}>
              <div style={styles.followItem}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
                  alt="Avatar"
                  style={styles.avatar}
                />
                <span style={styles.nickname}>{follow.name}</span>
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

// ActionButtons 컴포넌트
const ActionButtons = () => {
  return (
    <div style={styles.actionButtons}>
      <button style={styles.actionButton}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/490b689c20c1294dc889e7bde046fe841e37e0200066fd32321fdab3767b6b72?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
          alt="Action 1" 
          style={styles.actionButtonImg}
        />
      </button>
      <button style={styles.actionButton}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/09fdde4a8558311b6128f4b2ffd0d18c2692fd986ccd982fe166ca4698f0722f?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
          alt="Action 2" 
          style={{ ...styles.actionButtonImg, width: '35px' }}
        />
      </button>
      <button style={styles.actionButton}>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd4e90446223fde510aff6975a24a9ef814e8b11b961d38d84bd6929de1aae6f?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
          alt="Action 3" 
          style={{ aspectRatio: '0.76', width: '19px' }}
        />
      </button>
    </div>
  );
};

// App 컴포넌트로 SubscriptionFeed를 내보냅니다.
const App = () => <SubscriptionFeed />;

export default App;
