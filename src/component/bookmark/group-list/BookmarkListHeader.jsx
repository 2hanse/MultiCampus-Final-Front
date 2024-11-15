import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

function BookmarkListHeader({ bookmarkTitle, viewCount, subscriber, visibility, placeCount, onSortOptionSelect }) {
  const navigate = useNavigate();

  return (
    <BookmarkContainer>
        <BackIcon
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=a4eaf54e67064b758783ed5c744d50de"
          alt="Bookmark icon"
          onClick={() => navigate("/homepage", { state: { openBookmarkSheet: true } })}
        />
        <BookmarkTitle>{bookmarkTitle || "Loading..."}</BookmarkTitle>
        <BookmarkStats>구독&nbsp;<ColoredText>{subscriber}</ColoredText>&nbsp;| 조회&nbsp;<ColoredText>{viewCount || "-"}</ColoredText>&nbsp;|&nbsp;<ColoredText>{visibility ? "비공개" : "공개"}</ColoredText></BookmarkStats>
        <TotalCount>전체&nbsp;<ColoredText>{placeCount}</ColoredText></TotalCount>
        <Dropdown onSelect={onSortOptionSelect} />
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
  top: 66px;
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
  top: 115px;
  transform: translateX(-50%);

  font-family: 'sans-serif';
  font-style: normal;
  font-weight: 400;
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
  left: 36px;
  top: 185px;

  font-family: 'sans-serif';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 100%;

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`

const ColoredText = styled.span`
  color: #ED6000;
`;

export default BookmarkListHeader;