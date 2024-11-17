import React from "react";
import styled from "styled-components";
import HotPost from "./HotPost"; 
import Sort from "./Sort"; 

function MainHeader({ category, onSortChange }) {
  return (
    <MainHeaderContainer>
      <HotPost category={category} />
      {/* <SortContainer>
        <Sort onSortChange={onSortChange} />
      </SortContainer> */}
    </MainHeaderContainer>
  );
}

const MainHeaderContainer = styled.div`
  position: fixed;
  top: 120px; // Header의 높이만큼 아래에 위치
  width: 430px; // 페이지 너비 고정
  max-width: 100%; // 100%를 초과하지 않도록 설정
  z-index: 500; // Header와 모달보다 뒤로 가지 않도록 설정
  background-color: #ffffff; // 배경색 지정
  padding: 5px 16px; // 최소화된 상하좌우 여백 설정
  box-sizing: border-box; // 패딩과 테두리를 포함한 크기 계산
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
  margin-top: 5px; // 위 요소와의 최소한의 간격 조정
`;

export default MainHeader;
