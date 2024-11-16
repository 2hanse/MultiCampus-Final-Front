import React, { useState } from 'react';
import styled from 'styled-components';

import BookmarkItem from './BookmarkItem';

const BookmarkButton = ({
  bookmarkList,
  handleBookmarkInnerClick,
  selectedBookmarkId,
  setSelectedBookmarkId,
}) => {
  const [isListVisible, setIsListVisible] = useState(true);

  return (
    <BookmarkWrapper>
      {isListVisible ? (
        <BookmarkInner onClick={handleBookmarkInnerClick}>
          <BookmarkIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c01f1a85d200b1b09fb5e61cd22a3a93c6fa58372b4beac0be61fabd630c089?placeholderIfAbsent=true&apiKey=96b0aafc0bca4efc865afcf9a032943c"
            alt=""
          />
          <BookmarkText>북마크 불러오기</BookmarkText>
        </BookmarkInner>
      ) : (
        <BookmarkInner
          onClick={() => {
            handleBookmarkInnerClick();
            setSelectedBookmarkId(null);
          }}
        >
          <BookmarkIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c01f1a85d200b1b09fb5e61cd22a3a93c6fa58372b4beac0be61fabd630c089?placeholderIfAbsent=true&apiKey=96b0aafc0bca4efc865afcf9a032943c"
            alt=""
          />
          <BookmarkText>다시 체크하기</BookmarkText>
        </BookmarkInner>
      )}
      <BookmarkList>
        {bookmarkList.map((bookmark) =>
          selectedBookmarkId === null ||
          selectedBookmarkId === bookmark.bookmark_id ? ( // 선택된 항목만 표시
            <BookmarkItem
              key={bookmark.bookmark_id}
              bookmark_id={bookmark.bookmark_id}
              bookmark_title={bookmark.bookmark_title}
              list_count={bookmark.list_count}
              user_nickname={bookmark.user_nickname}
              setIsListVisible={setIsListVisible}
              setSelectedBookmarkId={setSelectedBookmarkId}
            />
          ) : null
        )}
      </BookmarkList>
    </BookmarkWrapper>
  );
};

const BookmarkWrapper = styled.div`
  border-radius: 3px;
  background-color: #fff;
  border: 1px solid #b7b2b2;
  display: flex;
  margin-top: 14px;
  width: 400;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  text-align: center;
  justify-content: center;
  padding: 21px 70px;
`;

const BookmarkInner = styled.button`
  border-radius: 3px;
  background-color: #fff;
  border: 1px solid #b7b2b2;
  display: flex;
  width: 164px;
  max-width: 100%;
  gap: 18px;
  padding: 10px 19px;
  cursor: pointer;
`;

const BookmarkIcon = styled.img`
  aspect-ratio: 0.8;
  object-fit: contain;
  object-position: center;
  width: 12px;
`;

const BookmarkText = styled.span`
  color: #757575;
`;

const BookmarkList = styled.ul`
  display: flex;
  margin-top: 24px;
  width: 100%;
  flex-direction: column;
  padding: 0 35px;
  list-style-type: none;
`;

export default BookmarkButton;
