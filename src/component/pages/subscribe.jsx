import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../layout/footer/Footer';
import Header from '../layout/header/Header';
import SearchActions from '../ProfilePage/SearchActions';
import { getUserIdFromToken } from '../api/jwt';
import api from '../api/axios';

const SubscriptionFeed = () => {
  useEffect(() => {
    getFollowingUserInfo();
  }, []);

  const [followingUsers, setFollowingUsers] = useState([]);

  const getFollowingUserInfo = async () => {
    try {
      const userId = getUserIdFromToken();
      const response = await api.get(`/users/${userId}/following`);
      setFollowingUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainContainer>
      <Header color="#fff4d2" title="구독 피드" actions={<SearchActions />} />
      <FollowList followingUsers={followingUsers} />
      <Divider />
      <Footer />
    </MainContainer>
  );
};

const FollowList = ({ followingUsers }) => {
  return (
    <FollowSection>
      <SectionTitle>팔로우 목록</SectionTitle>
      <ListContainer>
        {followingUsers.map((follow) => (
          <Link to={`/user-profile/${follow.followed_uid}`} key={follow.followed_uid}>
            <FollowItem>
              <Avatar src={follow.profile_img_url} alt="Avatar" />
              <Nickname>{follow.nickname}</Nickname>
            </FollowItem>
          </Link>
        ))}
      </ListContainer>
    </FollowSection>
  );
};

const MainContainer = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  max-width: 430px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ddd;
`;

const FollowSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 31px;
  color: #000;
`;

const SectionTitle = styled.h2`
  align-self: start;
  font: 400 15px/1 Roboto, sans-serif;
  margin-top: 27px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 14px;
  margin-top: 18px;
`;

const FollowItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  align-items: center;
  text-align: center;
`;

const Avatar = styled.img`
  width: 60px;
  aspect-ratio: 1;
  object-fit: cover;
`;

const Nickname = styled.span`
  margin-top: 7px;
`;

const Divider = styled.hr`
  background: #cac4d0;
  height: 1px;
  width: 100%;
  border: none;
  margin: 26px 0 12px;
`;

export default SubscriptionFeed;
