import React, { useRef, useState, useEffect } from 'react';

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
  feedContent: {
    aspectRatio: '4.29',
    objectFit: 'contain',
    objectPosition: 'center',
    width: '100%',
    marginTop: '487px',
  },
  header: {
    backgroundColor: '#ffd966',
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
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/736ac1aa27ad8f949e50ba8f925d49388dfa94ac68a35a17932cf80f7b9d61ed?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
        alt="Subscription feed content" 
        style={styles.feedContent}
      />
    </main>
  );
};

// Header 컴포넌트
const Header = () => {
  return (
    <header style={styles.header}>
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
        alt="" 
        style={styles.menuIcon} 
      />
      <h1 style={styles.title}>구독 피드</h1>
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" 
        alt="" 
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

  // 리스트를 참조할 ref
  const listContainerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0); // 현재 스크롤 위치 상태

  // FollowList가 렌더링될 때 스크롤 초기화 (첫 번째 항목으로 시작)
  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollLeft = 0; // 처음에는 첫 번째 항목이 보이도록 설정
    }
  }, []);

  // 하단바를 스크롤할 때 FollowList의 스크롤을 동기화하는 함수
  const handleScroll = (e) => {
    setScrollLeft(e.target.scrollLeft); // 하단바의 스크롤을 업데이트
  };

  // 마지막 항목을 정확하게 보이게 하기 위해 여유 공간을 추가
  const getMaxScroll = () => {
    const itemWidth = 60 + 14; // 각 항목의 너비 + 항목 간의 간격
    const totalWidth = followData.length * itemWidth;
    const containerWidth = listContainerRef.current?.offsetWidth || 0;

    // 마지막 항목 뒤에 여유 공간을 두기 위해 추가적인 여백을 계산
    const maxScroll = totalWidth - containerWidth + 20; // 마지막 항목 뒤에 20px 여유를 두기

    return maxScroll > 0 ? maxScroll : 0;
  };

  return (
    <section style={styles.followList}>
      <h2 style={styles.listTitle}>팔로우 목록</h2>
      <div
        style={{ ...styles.listContainer, overflowX: 'auto' }} // 기본 스크롤 활성화
        ref={listContainerRef}
        onScroll={handleScroll}
      >
        <div
          style={{ display: 'flex', transition: 'transform 0.3s ease' }}
        >
          {followData.map((follow) => (
            <div key={follow.id} style={styles.followItem}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ee173905dc76f5eb8751afce33590fc6c9b6307e6f75f96e670d592c05f636a?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
                alt="Avatar"
                style={styles.avatar}
              />
              <span style={styles.nickname}>{follow.name}</span>
            </div>
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
