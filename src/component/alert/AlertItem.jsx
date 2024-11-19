import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import api from "../api/axios";
import { getUserIdFromToken } from "../api/jwt";
import { useNavigate } from "react-router-dom";

const ALERT_TYPE = {
  BOARD_LIKE: 1,
  BOARD_COMMENT: 2,
  COMMENT_REPLY: 3,
  COMMENT_LIKE: 4,
  FOLLOW: 5,
  BOOKMARK: 6
};

function AlertItem({ alert }) {
  const userId = getUserIdFromToken();
  const [alertMsg, setAlertMsg] = useState('');
  const [alertInfo, setAlertInfo] = useState('');
  const navigate = useNavigate();

  console.log(alert);

  const formatRelativeTime = (timestamp) => {
    const parsedDate = new Date(timestamp);
    return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ko });
  };

  const makeAlertText = async (alert) => {
    switch (alert.alertType) {
      case ALERT_TYPE.BOARD_LIKE:
        return `${alert.senderNickname}님이 게시물에 좋아요를 남겼습니다.`;
      case ALERT_TYPE.BOARD_COMMENT:
        return `${alert.senderNickname}님이 "${alert.content}" 댓글을 남겼습니다.`;
      case ALERT_TYPE.COMMENT_REPLY:
        return `${alert.commentContent}\nㄴ${alert.senderNickname}: ${alert.content}`;
      case ALERT_TYPE.COMMENT_LIKE: 
        return `${alert.senderNickname}님이 당신의 댓글을 좋아해요.`;
      case ALERT_TYPE.FOLLOW: 
        return `${alert.senderNickname}님이 당신을 팔로우하기 시작했어요.`;
      case ALERT_TYPE.BOOKMARK: 
        return `${alert.senderNickname}님이 당신의 북마크를 저장했어요.`;
      default:
        return '';
    }
  };

  const makeAlertInfo = async (alert) => {
    switch (alert.alertType) {
      case ALERT_TYPE.BOARD_LIKE:
        return `게시글 제목: ${alert.boardTitle}`;
      case ALERT_TYPE.BOARD_COMMENT:
        return `게시글 제목: ${alert.boardTitle}`;
      case ALERT_TYPE.COMMENT_LIKE: 
        return `내가 쓴 댓글: ${alert.commentContent}`;
      case ALERT_TYPE.BOOKMARK:
        return `${alert.bookmarkTitle}`;
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchAlertDatas = async () => {
      const message = await makeAlertText(alert);
      setAlertMsg(message);
      const info = await makeAlertInfo(alert);
      setAlertInfo(info);
    };
    fetchAlertDatas();
  }, [alert]);

  const handleClick = () => {
    api.delete(`/alert/${alert.alertId}`);
    switch (alert.alertType) {
      case ALERT_TYPE.BOARD_LIKE:
        navigate(`/board/PostPage/${alert.boardId}`);
        break;
      case ALERT_TYPE.BOARD_COMMENT:
        navigate(`/board/PostPage/${alert.boardId}`);
        break;
      case ALERT_TYPE.COMMENT_REPLY:
        navigate(`/board/PostPage/${alert.boardId}`);
        break;
      case ALERT_TYPE.COMMENT_LIKE: 
        navigate(`/board/PostPage/${alert.boardId}`);
        break;
      case ALERT_TYPE.FOLLOW: 
        navigate(`/user-profile/${alert.senderId}`);
        break;
      case ALERT_TYPE.BOOKMARK: 
        navigate(`/bookmarklistdetail/${alert.bookmarkId}`);
        break;
      default:
        return '';
    }
  };

  return (
    <AlertWrapper onClick={handleClick}>
      <TimeStamp>{formatRelativeTime(alert.timestamp)}</TimeStamp>
      <NotificationMessage>
        {alertMsg}
      </NotificationMessage>
      <NotificationInfo>
        {alertInfo}
      </NotificationInfo>
    </AlertWrapper>
  );
}

const AlertWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  
  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.02);
  }
`;

const TimeStamp = styled.span`
  letter-spacing: 0.5px;
  font: 500 12px/16px Roboto, sans-serif;
`;

const NotificationMessage = styled.p`
  color: var(--m3-sys-light-on-surface, #1d1b20);
  letter-spacing: 0.5px;
  font: 16px/24px Roboto, sans-serif;
  margin: 4px 0;
  white-space: pre-wrap;
`;

const NotificationInfo = styled.span`
  letter-spacing: 0.25px;
  font: 14px/20px Roboto, sans-serif;
`;

export default AlertItem;
