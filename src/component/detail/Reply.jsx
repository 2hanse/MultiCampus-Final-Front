import React, { useState, useEffect } from "react";
import styled from "styled-components";
import likeicon from "./asset/like_button.png"
import { getUserIdFromToken } from "../api/jwt";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Reply({ reply }) {
  const navigate = useNavigate();
  const localUserId = getUserIdFromToken();
  const [replylikecnt, setReplyLikecnt] = useState(0);
  const [userinfo, setUserInfo] = useState([]);
  const [membership, setMembership] = useState("");
  
  const fetchUserInfo = () => {
    api.get(`/users/info/${reply.user_id}`)
      .then((res) => {
        console.log("답글 작성자 정보:",res.data);
        setUserInfo(res.data || []);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  };

  const handleLikeClick = () => {
    console.log(reply);
    api.post(`/comments/${reply.comment_id}/likes`, {
      user_id: localUserId,
      board_id: 0,
      comment_id: reply.comment_id
    })
      .then((res) => {
        setReplyLikecnt(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(localUserId);
        console.log(reply);
        console.log(reply.comment_id);
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

    setReplyLikecnt(reply.likes);
    fetchUserInfo();
  }, [reply]);

  const gotoUserProfile = () => {
    navigate(`/user-profile/${reply.user_id}`);
    console.log(reply.user_id);
  };


  return (
    <ReplyWrapper>
        <ReplyHeader>
          <ReplyName onClick={gotoUserProfile}>{userinfo.nickname} <ReplyMembership>({membership})</ReplyMembership></ReplyName> {/* user_id로 조회해야함 */}
          <ReplyContent>{reply.comment}</ReplyContent>
        </ReplyHeader>
        <ReplyFooter>
            <ReplyTimestamp>{reply.created_at}</ReplyTimestamp>
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
                <LikeCount>{replylikecnt}</LikeCount>
            </LikeContainer>
        </ReplyFooter>
    </ReplyWrapper>
  );
}

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LikeIcon = styled.img`
  cursor: pointer;
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const LikeCount = styled.span`
  font-size: 12px;
  color: #777;
`;

const ReplyWrapper = styled.div`
  margin-top: 6px;
  padding-left: 8px;
  border-left: 1px solid #ddd;
`;

const ReplyHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReplyName = styled.span`
  font-weight: bold;
  font-size: 11px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ReplyMembership = styled.span`
  font-size: 11px;
  color: #777;
  margin-left: 4px;
`;

const ReplyContent = styled.p`
margin: 3px 0 0;
font-size: 13px;
`;

const ReplyFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
  font-size: 11px;
  color: #777;
`;

const ReplyTimestamp = styled.span`
  margin-right: 10px;
  font-size: 11px;
  color: #777;
`;


export default Reply;
