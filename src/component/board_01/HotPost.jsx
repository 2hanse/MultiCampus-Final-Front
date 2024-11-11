import React from "react";
import styled from "styled-components";

function HotPost() {
  return (
    <HotPostContainer>
      <HotIcon aria-hidden="true" />
      <HotPostContent>
        <HotPostTitle>(핫게시물 제목)</HotPostTitle>
        <LikeInfo>
          <LikeIcon aria-hidden="true" />
          <LikeCount>좋아요 수</LikeCount>
        </LikeInfo>
      </HotPostContent>
    </HotPostContainer>
  );
}

const HotPostContainer = styled.section`
  display: flex;
  margin-top: 21px;
  gap: 17px;
  padding: 0 35px;
`;

const HotIcon = styled.span`
  background: url("https://cdn.builder.io/api/v1/image/assets/TEMP/c9792d46fd0d346eea78d7ea71b2bf2a5e385e7410189997acf434fa0f0e9290?placeholderIfAbsent=true&apiKey=075d8221b0dd488ba40080c6fa3dd46a") no-repeat center;
  background-size: contain;
  width: 20px;
  height: 22px;
  margin: auto 0;
`;

const HotPostContent = styled.div`
  border-radius: 20px;
  background-color: #ffd966;
  display: flex;
  gap: 40px 100px;
  flex-grow: 1;
  padding: 9px 16px;
  color: #ffffff;
  font-weight: 500;
`;

const HotPostTitle = styled.h2`
  font-size: 11px;
  letter-spacing: 0.08px;
`;

const LikeInfo = styled.div`
  display: flex;
  gap: 8px;
  font-size: 9px;
  text-align: center;
  letter-spacing: 0.06px;
`;

const LikeIcon = styled.span`
  background: url("https://cdn.builder.io/api/v1/image/assets/TEMP/8a492fbce9ea4ebec168914062ac472c7f3fdd5b1be980c052dcd6e5080ebbb2?placeholderIfAbsent=true&apiKey=075d8221b0dd488ba40080c6fa3dd46a") no-repeat center;
  background-size: contain;
  width: 13px;
  height: 13px;
`;

const LikeCount = styled.span`
  color: #ffffff;
`;

export default HotPost;