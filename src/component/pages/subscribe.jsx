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
    maxWidth: '430px',
    maxHeight: '932px',
    width: '100%',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: '0 auto',
    border: '1px solid #ddd',
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
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
  },
  followItem: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    marginRight: '14px',
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
  const [followingUserIds, setFollowingUserIds] = useState([]);

  useEffect(() => {
    console.log('useEffect 실행됨');
    fetchFollowingUsers();
  }, []);

  useEffect(() => {
    console.log('useEffect2 실행됨');
    fetchFollowedBoards();
  }, [followingUserIds]);

  // 팔로우한 사용자 ID 가져오기
  const fetchFollowingUsers = async () => {
    try {
      const user_id = getUserIdFromToken();
      const response = await api.get(`/users/${user_id}/following`);
      setFollowingUsers(response.data);

      const followedUids = response.data.map((user) => user.followed_uid); // 배열인 경우
      setFollowingUserIds(followedUids);
      console.log('Followed UIDs: ', followedUids);

      // 팔로우한 사용자들의 게시글 가져오기
      fetchFollowedBoards(response.data); // 여기서 게시글 가져오기
    } catch (error) {
      console.error('Error fetching following users:', error);
    }
  };

  // 게시물 가져오기
  const fetchFollowedBoards = async () => {
    try {
      console.log('보낼 other_ids 값:', followingUserIds);

      const boardsResponse = await api.get('/users/others/writed-boards', {
        params: { other_ids: followingUserIds },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'brackets' });
        },
      });

      console.log('게시물 데이터 응답:', boardsResponse.data); // 게시물 데이터 확인
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
      <div style={styles.listContainer}>
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
  console.log('BoardsList에서 받은 게시물 데이터:', boards);
  return (
    <section style={styles.followList}>
      <h2 style={styles.listTitle}>게시물 목록</h2>
      <div style={styles.listContainer}>
        {boards.map((board) => (
          <div key={board.board_id} style={styles.followItem}>
            <h3>{board.title}</h3>
            <p>{board.content.slice(0, 50)}...</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionFeed;
