import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import BookmarkListDropDown from "./BookmarkListDropDown";

function BookmarkList({ bookmarkTitle }) {
  const navigate = useNavigate();
  console.log(bookmarkTitle);

  return (
    <BookmarkContainer>
        <BackIcon
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=a4eaf54e67064b758783ed5c744d50de"
          alt="Bookmark icon"
          onClick={() => navigate("/homepage", { state: { openBookmarkSheet: true } })}
        />
        <BookmarkTitle>{bookmarkTitle || "Loading..."}</BookmarkTitle>
        <BookmarkStats>구독 N | 조회 N | 공개</BookmarkStats>
        <BookmarkListDropDown />
    </BookmarkContainer>
  );
}

const BookmarkContainer = styled.main`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 480px;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  padding: 57px 16px;
`;

const BackIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  margin-left: 12px;
  cursor: pointer;
`;

const BookmarkTitle = styled.h1`
  color: #000;
  text-align: center;
  margin-top: 9px;
  font: 600 22px/1 Inter, sans-serif;
  width: auto;
`;

const BookmarkStats = styled.p`
  color: var(--Schemes-Outline, #79747e);
  text-align: center;
  align-self: center;
  margin-top: 27px;
  font: var(--sds-typography-body-font-weight-strong) var(--sds-typography-body-size-small) / 1 var(--sds-typography-body-font-family);
`;

export default BookmarkList;