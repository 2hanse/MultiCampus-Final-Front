import React from "react";
import styled from "styled-components";
import { format, formatDistanceToNow, differenceInHours, formatDistance, subDays, formatRelative, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

function AlertItem({alert}) {
  const formatRelativeTime = (timestamp) => {
    const parsedDate = new Date(timestamp);
    return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ko })
  }

  return (
    <AlertWrapper>
      <TimeStamp>{formatRelativeTime(alert.timestamp)}</TimeStamp>
      <NotificationMessage>
        {alert.content}
      </NotificationMessage>
      <PostInfo>
        카테고리 | 게시글 제목
      </PostInfo>
    </AlertWrapper>
  );
}

const AlertWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  justify-content: flex-start;
  flex: 1;
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
`;

const PostInfo = styled.span`
  letter-spacing: 0.25px;
  font: 14px/20px Roboto, sans-serif;
`;

export default AlertItem;