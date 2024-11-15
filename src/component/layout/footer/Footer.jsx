import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Home from './assets/Home.png';
import Feed from './assets/Feed.png';
import Map from './assets/Map.png';
import Chat from './assets/Chat.png';
import Person from './assets/Person.png';
import onHome from './assets/onHome.png';
import onFeed from './assets/onFeed.png';
import onMap from './assets/onMap.png';
import onChat from './assets/onChat.png';
import { getUserIdFromToken } from '../../api/jwt';
import getProfileImgUrlFromUserId from '../../api/member_info';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileImgUrl, setProfileImgUrl] = useState('');

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      getProfileImgUrlFromUserId(userId, setProfileImgUrl);
    }
  }, []);

  const isProfileSelected = location.pathname === '/myprofilepage';

  const tabs = [
    { name: 'home', path: '/boardmain', defaultImg: Home, activeImg: onHome },
    { name: 'feed', path: '/subscribe', defaultImg: Feed, activeImg: onFeed },
    { name: 'map', path: '/homepage', defaultImg: Map, activeImg: onMap },
    {
      name: 'chat',
      path: '/user/chat/list',
      defaultImg: Chat,
      activeImg: onChat,
    },
  ];

  return (
    <FooterBox>
      {tabs.map((tab) => (
        <TabImage
          key={tab.name}
          type="button"
          src={location.pathname === tab.path ? tab.activeImg : tab.defaultImg}
          alt={tab.name}
          onClick={() => navigate(tab.path)}
        />
      ))}
      {profileImgUrl ? (
        <LoginedMyPage
          type="button"
          src={profileImgUrl}
          alt="Profile"
          isProfileSelected={isProfileSelected}
          onClick={() => navigate('/myprofilepage')}
        />
      ) : (
        <MyPage
          type="button"
          src={Person}
          alt="Person"
          onClick={() => navigate('/')}
        />
      )}
    </FooterBox>
  );
};

const FooterBox = styled.footer`
  position: fixed;
  display: flex;
  transform: translateX(-0.2%);
  width: 430px;
  height: 100px;
  bottom: 0px;
  background-color: #ffffff;
  border: 0.5px solid #cac4d0;
  z-index: 10;
`;

const TabImage = styled.img`
  position: relative;
  width: 30px;
  height: 30px;
  left: 25px;
  margin: 38px 22.3px 0px 22.3px;
  cursor: pointer;
`;

const MyPage = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 351.33px;
  top: 35%;
  cursor: pointer;
`;

const LoginedMyPage = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 351.33px;
  top: 35%;
  border-radius: 50%;
  border: ${(props) =>
    props.isProfileSelected ? '3px solid #ED6000' : 'none'};
  cursor: pointer;
`;

export default Footer;
