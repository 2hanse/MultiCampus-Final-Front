import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../layout/footer/Footer";
import Header from "../layout/header/Header";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [nickname, setNickname] = useState("닉네임");
  const [userImage, setUserImage] = useState(
    "https://cdn.builder.io/api/v1/image/assets/TEMP/17c70c46cd6bb71b05cd93581bc2d83c1e7bb0955516a7b4f5baa99723121b6b?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
  );
  const [countBoard, setCountBoard] = useState(0);
  const [countFollow, setCountFollow] = useState(0);
  const [countFoller, setCountFoller] = useState(0);
  const [statusMessage, setStatusMessage] = useState("상태 메시지");
  const [reviewData, setReviewData] = useState([]);
  const navigate = useNavigate();

  const stats = [
    { label: "게시물", value: countBoard },
    { label: "팔로우", value: countFollow },
    { label: "팔로워", value: countFoller },
  ];

  useEffect(() => {
    getUserInfo();
    getReviewBoard();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await api.get("/users/me/stats");
      setCountBoard(response.data.boardCount);
      setCountFollow(response.data.followerCount);
      setCountFoller(response.data.followingCount);
      setNickname(response.data.nickname);
      setUserImage(response.data.profileImgUrl);
      setStatusMessage(response.data.bio_msg);
    } catch (err) {
      console.error(err);
    }
  };

  const getReviewBoard = async () => {
    try {
      const response = await api.get("/users/me/writed-boards");
      setReviewData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const stripHtmlTags = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const truncateContent = (content, length = 20) => {
    const textContent = stripHtmlTags(content);
    return textContent.length > length
      ? textContent.slice(0, length) + '...'
      : textContent;
  };

  return (
    <Main>
      <Header color="#fff4d2" title={nickname} />
      <Divider />
      <ProfileHeader>
        <ProfileImage src={userImage} alt="프로필 이미지" />
        <Stats>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </Stats>
        <StatusMessage>{statusMessage}</StatusMessage>
      </ProfileHeader>
      <Divider2/>
      <ProfileContent>
        {reviewData.map((review, index) => (
          <ReviewItem key={index} onClick={() => navigate(`/board/PostPage/${review.board_id}`)}>
            <ReviewTitle>{review.title}</ReviewTitle>
            <ReviewDescription>{truncateContent(review.content)}...</ReviewDescription>
          </ReviewItem>
        ))}
      </ProfileContent>
      <Footer />
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 430px;
  background: #fff4d2;
  margin: 0 auto;
  border: 0.5px solid #cac4d0;
  height: 100vh; /* 부모 높이 고정 */
  overflow: hidden; /* 상위에서 스크롤되지 않도록 */
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-color: #ddd;
  margin: 10px 0;
`;

const Divider2 = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-color: #ddd;
`;

const ProfileHeader = styled.div`
  text-align: center;
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const StatusMessage = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

const ProfileContent = styled.div`
  background: #ffffff;
  width: 100%;
  height: 100vh; /* 임시로 100%로 설정해 테스트 */
  
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 100px;
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const ReviewTitle = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const ReviewDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0 0;
`;

export default Profile;
