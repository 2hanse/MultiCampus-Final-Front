import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem";
import BookmarkListDropdown from "./BookmarkListDropdown";

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
        <TotalCount>전체 N</TotalCount>
        <BookmarkListDropdown />
    </BookmarkContainer>
  );
}

const BookmarkContainer = styled.main`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 430px;
  height: 233px;
  margin: 0 auto;
  border-bottom: 0.5px solid #CAC4D0;
`;

const BackIcon = styled.img`
  display: flex;
  position: absolute;
  width: 24px;
  height: 24px;
  left: 28px;
  top: 62px;
  cursor: pointer;
`;

const BookmarkTitle = styled.h1`
  position: absolute;
  width: auto;
  height: 38px;
  left: 50%;
  top: 86px;
  transform: translateX(-50%);

  font-family: 'sans-serif';
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 100%;

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const BookmarkStats = styled.p`
  position: absolute;
  width: autopx;
  height: 30px;
  left: 50%;
  top: 135px;
  transform: translateX(-50%);

  font-family: 'sans-serif';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;

  display: flex;
  align-items: center;
  text-align: center;

  color: #79747E;
`;

const TotalCount = styled.h3`
  position: absolute;
  width: auto;
  height: 22px;
  left: 34px;
  top: 184px;

  font-family: 'sans-serif';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`

export default BookmarkList;