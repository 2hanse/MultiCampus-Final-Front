import React, { useState, useEffect } from "react";
import styled from "styled-components";
import avatar from "./asset/avatar.png";
import chatIcon from "./asset/chat.png";
import followIcon from "./asset/follow.png";
import unfollowIcon from "./asset/unfollow.png";
import likeIcon from "./asset/like_button.png";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getUserIdFromToken } from "../api/jwt";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";


function MainHeader({ post, detail, category: initialCategory }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardtype, setBoardtype] = useState("");
  const [membership, setMembership] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const localUserId = getUserIdFromToken();
  const [likecnt, setLikecnt] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!category && post && post.category) {
      setCategory(post.category);
    }
  }, [category, post]);

  useEffect(() => {
    console.log("Updated category:", category); // category 값 확인용
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

  const fetchFollowData = () => {
    api.get(`/users/follow/${post.user_id}`)
      .then((res) => {
        setIsFollowing(res.data);
        console.log("팔로우 여부:",res.data);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  };

  useEffect(() => {
    if (detail && detail.user) {
    if (detail.user.member_score >= 10 && detail.user.member_score < 30) {
      setMembership("한공기");
    } else if (detail.user.member_score >= 30 && detail.user.member_score < 50) {
      setMembership("두공기");
    } else if (detail.user.member_score >= 50 && detail.user.member_score < 100) {
      setMembership("세공기");
    } else if (detail.user.member_score >= 100) {
      setMembership("네공기");
    } else {
      setMembership("빈공기");
    }
  }

    fetchFollowData();
  }, [post]);

  useEffect(() => {
    setLikecnt(detail.likes);
  }, [detail]);

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
    console.log(detail);
    api.post(`/boards/${post.board_id}/likes`, {
      user_id: localUserId,
      board_id: post.board_id,
      comment_id: 0
    })
      .then((res) => {
        setLikecnt(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(localUserId);
        console.log(post);
        console.log(post.board_id);
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  };

  const handleChatClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleYesClick = () => {
    if (detail && detail.user && detail.user.nickname) {
      navigate(`/user/chat/invite/${detail.user.nickname}`);
    } else {
      navigate("/user/chat/invite");
    }
  };

  const handleFollowClick = () => {
    console.log("Follow button clicked");
    // setIsFollowing(); if문으로 해
    if (isFollowing) {
      api.delete(`/users/follow/${post.user_id}`)
      .then((res) => {
        fetchFollowData();
      })
      .catch((error) => {
        alert(error.response.data.errMsg);
      });
    } else {
      api.post(`/users/follow/${post.user_id}`)
      .then((res) => {
        fetchFollowData();
      })
      .catch((error) => {
        alert(error.response.data.errMsg);
      });
    };
  };

  const gotoUserProfile = () => {
      navigate(`/user-profile/${detail.board.user_id}`);
      console.log(detail.board.user_id);
  };

  const formatRelativeTime = (timestamp) => {
    try {
      const parsedDate = new Date(timestamp);
      const result = formatDistanceToNow(parsedDate, { addSuffix: true, locale: ko });
      return result
    } catch (error) {
      
    }
  };

  return (
    <MainHeaderContainer>
      <HeaderTop>
        <BoardName>{boardtype} 게시판</BoardName>
        <LikeSection>
          <LikeIcon
            src={likeIcon}
            alt="Like"
            onClick={() => {
              if (localUserId) {
                handleLikeClick();
              } else {
                alert("로그인 후 이용해 주세요.");
              }
            }}
          />
          <LikeCount>{likecnt}</LikeCount>
        </LikeSection>
      </HeaderTop>
      <PostTitle>{post ? post.title : "제목 없음"}</PostTitle>
      {/* 게시글 작성자 정보 표시 */}
    {authorInfoArray.map((author) => (
      <AuthorInfo key={author.id}>
        <Avatar
          src={detail && detail.user && detail.user.profile_img_url ? detail.user.profile_img_url : author.avatar}
          alt="User Avatar"
          onClick={gotoUserProfile}
        />
        <AuthorDetails>
            <AuthorName onClick={gotoUserProfile}>
              {detail ? detail.user?.nickname : "user"} <AuthorMembership>{membership}</AuthorMembership>
            </AuthorName>
          <AuthorTimestamp>작성 시간: {post ? formatRelativeTime(post.created_time) : ""}</AuthorTimestamp>
          <AuthorViews>조회수: {post ? post.view_cnt : ""}</AuthorViews>
        </AuthorDetails>
        {
          localUserId == post.user_id || localUserId == null ? (
            <></>
          ) : (
            <ChatIcon src={chatIcon} alt="채팅 아이콘" onClick={handleChatClick} />
          )
        }
        {
          localUserId == post.user_id || localUserId == null ? (
            <></>
          ) : (
            <FollowButton src={isFollowing ? unfollowIcon : followIcon} alt="팔로우 버튼" onClick={handleFollowClick} />
          )
        }        
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
  font-size: 16px;
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
