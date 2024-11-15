import React, { useState, useEffect } from "react";
import styled from "styled-components";
import avatar from "./asset/avatar.png";
import chatIcon from "./asset/chat.png";
import followIcon from "./asset/follow.png";
import likeIcon from "./asset/like_button.png";
import { useNavigate } from "react-router-dom";

function MainHeader({ post, category }) {
  const [likeCount, setLikeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardtype, setBoardtype] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    switch (category) {
      case "restaurant":
        setBoardtype("식당");
        break;
      case "free":
        setBoardtype("자유");
        break;
      case "top":
        setBoardtype("상위");
        break;
      case "tour":
        setBoardtype("맛집 투어");
        break;
      default:
        setBoardtype("기타");
        break;
    }
  }, [category]);

  const authorInfoArray = [
    {
      id: 1,
      name: "닉네임1",
      membership: "회원등급1",
      avatar: avatar,
      timestamp: new Date().toLocaleString(),
      views: 123, 
    },
  ];

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };

  const handleChatClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleYesClick = () => {
    if (post && post.nickname) {
      navigate("/user/chat/invite", { state: { nickname: post.nickname } });
    } else {
      navigate("/user/chat/invite");
    }
  };

  const handleFollowClick = () => {
    console.log("Follow button clicked");
  };

  const gotoUserProfile = () => {
    navigate(`/user-profile/${post.nickname}`);
  };

  return (
    <MainHeaderContainer>
      <HeaderTop>
        <BoardName>{boardtype} 게시판</BoardName>
        <LikeSection>
          <LikeIcon src={likeIcon} alt="Like" onClick={handleLikeClick} />
          <LikeCount>{likeCount}</LikeCount>
        </LikeSection>
      </HeaderTop>
      <PostTitle>{post ? post.title : "제목 없음"}</PostTitle>
      {/* 게시글 작성자 정보 표시 */}
    {authorInfoArray.map((author) => (
      <AuthorInfo key={author.id}>
        <Avatar src={author.avatar} alt={`${author.name}의 아바타`} onClick={() => gotoUserProfile}/>
        <AuthorDetails>
            <AuthorName onClick={() => gotoUserProfile}>
              {post ? post.nickname : "user"} <AuthorMembership>({post ? post.grade : ""})</AuthorMembership>
            </AuthorName>
          <AuthorTimestamp>작성 시간: {post ? post.time : ""}</AuthorTimestamp>
          <AuthorViews>조회수: {author.views}</AuthorViews>
        </AuthorDetails>
        <ChatIcon src={chatIcon} alt="채팅 아이콘" onClick={handleChatClick} />
        <FollowButton src={followIcon} alt="팔로우 버튼" onClick={handleFollowClick} />
      </AuthorInfo>
    ))}
        
    {isModalOpen && (
        <ModalOverlay>
            <ModalContent>
                <ModalText>{post ? post.nickname : "user"}님과 채팅하시겠습니까?</ModalText>
                <ButtonContainer>
                    <ModalButton onClick={handleYesClick}>예</ModalButton>
                    <ModalButton onClick={handleCloseModal}>아니오</ModalButton>
                </ButtonContainer>
            </ModalContent>
        </ModalOverlay>
    )}
    </MainHeaderContainer>
  );
}

const MainHeaderContainer = styled.div`
  margin-top: 20px;
  position: relative;
  padding: 0 16px;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const BoardName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #DFA67B;
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LikeIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const LikeCount = styled.span`
  font-size: 14px;
  color: #333;
`;

const PostTitle = styled.h2`
  font-size: 20px;
  margin: 10px 0;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  white-space: normal;
  word-break: break-word;
`;

const AuthorName = styled.span`
  font-size: 16px
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AuthorMembership = styled.span`
  font-size: 16px;
  color: #777;
  margin-left: 4px;
`;

const AuthorTimestamp = styled.span`
  font-size: 12px;
  color: #777;
`;

const AuthorViews = styled.span`
  font-size: 12px;
  color: #777;
`;

const ChatIcon = styled.img`
  cursor: pointer;
  width: 42px; /* 수정된 너비 */
  height: 15px; /* 수정된 높이 */
  margin-left: 8px; /* 필요에 따라 간격 조정 */
`;

const FollowButton = styled.img`
  cursor: pointer;
  width: 72px; /* 수정된 너비 */
  height: 36px; /* 수정된 높이 */
  margin-left: auto; /* 다른 요소와의 간격 유지 */
`;

const Avatar = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%); // 화면 중앙으로 이동
  width: 430px; // 화면의 너비에 맞춤
  height: auto;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5); // 반투명 배경
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  width: 400px; 
  height: 150px; 
  padding: 20px;
  border-radius: 8px; /* 테두리 둥글게 */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc; /* 테두리 추가 */
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px; /* 메시지와 버튼 사이 간격 */
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly; /* 버튼 간격 균등 분배 */
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  background-color: transparent; /* 무색 */
  border: none; /* 경계선 없음 */
  font-size: 16px;
  cursor: pointer;
`;

export default MainHeader;
