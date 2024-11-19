import React, { useState, useEffect } from "react";
import styled from "styled-components";
import avatarImage from "./asset/avatar.png";
import likeicon from "./asset/like_button.png"
import { getUserIdFromToken } from "../api/jwt";
import api from "../api/axios";
import Reply from "./Reply"
import { useNavigate } from "react-router-dom";

function Comment({ comment }) {
  const navigate = useNavigate();
  const localUserId = getUserIdFromToken();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");
  const [commentlikecnt, setCommentLikecnt] = useState(0);
  const [userinfo, setUserInfo] = useState([]);
  const [membership, setMembership] = useState("");

  const fetchUserInfo = () => {
    api.get(`/users/info/${comment.user_id}`)
      .then((res) => {
        console.log("댓글 작성자 정보:",res.data);
        setUserInfo(res.data || []);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  };

  const handleReplyButtonClick = () => {
    setShowReplyInput(!showReplyInput);
  };

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      setReplies([...replies, {
        id: replies.length + 1,
        name: "User", // 고정 값, 필요시 동적으로 변경
        content: replyContent,
        timestamp: new Date().toLocaleString(),
      }]);
      setReplyContent(""); // 입력 필드 초기화
      setShowReplyInput(false); // 입력창 닫기
    }
  };

  const handleLikeClick = () => {
    console.log(comment);
    api.post(`/comments/${comment.comment_id}/likes`, {
      user_id: localUserId,
      board_id: 0,
      comment_id: comment.comment_id
    })
      .then((res) => {
        setCommentLikecnt(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(localUserId);
        console.log(comment);
        console.log(comment.comment_id);
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  };

  useEffect(() => {
    if (userinfo) {
      if (userinfo.member_score >= 10 && userinfo.member_score < 30) {
        setMembership("한공기");
      } else if (userinfo.member_score >= 30 && userinfo.member_score < 50) {
        setMembership("두공기");
      } else if (userinfo.member_score >= 50 && userinfo.member_score < 100) {
        setMembership("세공기");
      } else if (userinfo.member_score >= 100) {
        setMembership("네공기");
      } else {
        setMembership("빈공기");
      }
    }

    setCommentLikecnt(comment.likes);
    fetchUserInfo();
  }, [comment]);

  const gotoUserProfile = () => {
    navigate(`/user-profile/${comment.user_id}`);
    console.log(comment.user_id);
  };

  return (
    <CommentWrapper>
      <Avatar src={userinfo.profile_img_url} alt={avatarImage} onClick={gotoUserProfile}/>
      <CommentBody>
        <CommentHeader>
          <CommentName onClick={gotoUserProfile}>{userinfo.nickname} <Membership>({membership})</Membership></CommentName> {/* user_id로 조회해야함 */}
          <CommentContent>{comment.comment}</CommentContent>
        </CommentHeader>
        <CommentFooter>
          <CommentTimestamp>{comment.created_at}</CommentTimestamp>
          <ReplyButton
            onClick={() => {
              if (localUserId) {
                handleReplyButtonClick();
              } else {
                alert("로그인 후 이용해 주세요.");
              }
            }}
          >답글쓰기</ReplyButton>
          <LikeContainer>
          <LikeIcon
            src={likeicon}
            alt="Like"
            onClick={() => {
              if (localUserId) {
                handleLikeClick();
              } else {
                alert("로그인 후 이용해 주세요.");
              }
            }}
          />
            <LikeCount>{commentlikecnt}</LikeCount>
          </LikeContainer>
        </CommentFooter>
        {showReplyInput && (
          <ReplyInputContainer>
            <ReplyInput
              type="text"
              placeholder="답글을 입력하세요..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <SubmitReplyButton onClick={handleReplySubmit}>입력</SubmitReplyButton>
          </ReplyInputContainer>
        )}
        {comment.reply_comment.map((reply) => (
          <Reply
          key={reply.comment_id}
          reply={reply}
          />
        ))}
      </CommentBody>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentName = styled.span`
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Membership = styled.span`
  font-size: 12px;
  color: #777;
  margin-left: 4px;
`;

const CommentContent = styled.p`
margin: 3px 0 0;
font-size: 15px;
`;

const CommentFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
  font-size: 12.5px;
  color: #777;
`;

const CommentTimestamp = styled.span`
  margin-right: 10px;
  font-size: 12.5px;
  color: #777;
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  margin-right: 10px;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LikeIcon = styled.img`
  cursor: pointer;
  width: 18px;
  height: 18px;
  margin-right: 5px;
`;

const LikeCount = styled.span`
  font-size: 15px;
  color: #777;
`;

const ReplyInputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ReplyInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 5px;
`;

const SubmitReplyButton = styled.button`
  padding: 5px 10px;
  background-color: #ED6000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Comment;
