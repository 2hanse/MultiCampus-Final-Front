import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/footer/Footer';
import Header from '../layout/header/Header';
import { getUserIdFromToken } from '../api/jwt';
import api from '../api/axios';
import qs from 'qs';

// CSS 스타일 포함
const styles = {
  subscriptionFeed: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    width: '430px',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: '0 auto',
    border: '0.5px solid #cac4d0',
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
    paddingLeft: '30px',
  },
  followListContainer: {
    display: 'flex',
    gap: '20px',
    overflowX: 'auto', // 가로 스크롤 활성화
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    paddingBottom: '10px', // 스크롤 영역 여유 추가
    paddingLeft: '30px',
  },
  followItem: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    alignItems: 'center',
  },
  boardsListContainer: {
    display: 'flex',
    flexDirection: 'column', // 세로 배열
    gap: '14px',
    overflowY: 'auto',
    paddingLeft: '40px',
    boxSizing: 'border-box',
    height: 'calc(100vh - 216px - 308px)', // 전체 화면에서 216px 만큼 제외한 높이
    padding: '0 10px',
    scrollbarWidth: 'none', // Firefox에서 스크롤바 숨기기
    '-ms-overflow-style': 'none', // IE, Edge에서 스크롤바 숨기기
    paddingBottom: '12px',
  },
  boardItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // 좌측 정렬
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
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
  
};

// SubscriptionFeed 컴포넌트
const SubscriptionFeed = () => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // 초기 데이터 로드
    const fetchData = async () => {
      try {
        const user_id = getUserIdFromToken();
        const followingUsersData = await fetchFollowingUsers(user_id);
        const followingUserIds = followingUsersData.map(
          (user) => user.followed_uid
        );

        if (followingUserIds.length > 0) {
          await fetchFollowedBoards(followingUserIds);
        } else {
          console.log('팔로우한 사용자가 없습니다.');
        }
      } catch (error) {
        console.error('Error initializing subscription feed:', error);
      }
    };

    fetchData();
  }, []);

  // 팔로우한 사용자 ID 가져오기
  const fetchFollowingUsers = async (user_id) => {
    try {
      const response = await api.get(`/users/${user_id}/following`);
      setFollowingUsers(response.data);
      console.log('팔로우한 사용자 데이터:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching following users:', error);
      return [];
    }
  };

  // 게시물 가져오기
  const fetchFollowedBoards = async (userIds) => {
    try {
      console.log('보낼 other_ids 값:', userIds);

      const boardsResponse = await api.get('/users/others/writed-boards', {
        params: { other_ids: userIds },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: 'brackets' }),
      });

      console.log('게시물 데이터 응답:', boardsResponse.data);
      setBoards(boardsResponse.data);
    } catch (error) {
      console.error('Error fetching followed boards:', error);
    }
  };

  return (
    <main style={styles.subscriptionFeed}>
      <Header color="#fff4d2" title="구독 페이지" />
      <FollowList followingUsers={followingUsers} />
      <Divider />
      <BoardsList boards={boards} />
      <Footer />
    </main>
  );
};

// FollowList 컴포넌트
const FollowList = ({ followingUsers }) => {
  return (
    <section style={styles.followList}>
      <h2 style={styles.listTitle}>팔로우 목록</h2>
      <div style={styles.followListContainer}>
        {followingUsers.map((user) => (
          <Link
            to={`/user-profile/${user.followed_uid}`}
            key={user.followed_uid}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={styles.followItem}>
              <img
                src={user.profile_img_url}
                alt="Avatar"
                style={styles.avatar}
              />
              <span style={styles.nickname}>{user.nickname}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// Divider 컴포넌트
const Divider = () => {
  return <hr style={styles.divider} />;
};

// BoardsList 컴포넌트
const BoardsList = ({ boards }) => {
  const stripHtmlTags = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  
  const truncateContent = (content, length = 20) => {
    const textContent = stripHtmlTags(content);
    return textContent.length > length ? textContent.slice(0, length) + "..." : textContent;
  };
  return (
    <section style={styles.followList}>
      <h2 style={styles.listTitle}>게시물 목록</h2>
      <div style={styles.boardsListContainer}>
        {boards.map((board) => (
          <div key={board.board_id} style={styles.boardItem}>
            <h3>{board.title}</h3>
            <p>{truncateContent(board.content)}...</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionFeed;