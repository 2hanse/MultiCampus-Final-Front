import React from "react";
import styled from "styled-components";

function BookmarkListDropDown() {
  return (
    <SortingContainer>
      <TotalCount>전체 N</TotalCount>
      <SortWrapper>
        <SortText>등록순</SortText>
        <SortIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=a4eaf54e67064b758783ed5c744d50de" alt="Sort icon" />
      </SortWrapper>
    </SortingContainer>
  );
}

const SortingContainer = styled.section`
  align-self: start;
  display: flex;
  gap: 25px;
  color: #000;
  text-align: center;
  margin: 48px 0 0 25px;
  font: 600 12px/1 Inter, sans-serif;
`;

const TotalCount = styled.span`
  margin: auto 0;
`;

const SortWrapper = styled.div`
  display: flex;
  gap: 4px;
  white-space: nowrap;
`;

const SortText = styled.span`
  flex-grow: 1;
  margin: auto 0;
`;

const SortIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;

export default BookmarkListDropDown;