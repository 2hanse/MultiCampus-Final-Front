import React from 'react';
import styled from 'styled-components';
import 맛있는녀석들_로고 from './assets/맛있는녀석들_로고.png';

function Header() {
  return (
    <Wrapper>
      <Logo src={맛있는녀석들_로고} alt="맛있는 녀석들 로고" />
      <Title>
        우리 동네
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;나만의 맛집
      </Title>
      <Subtitle>맛집에 관한 모든 것을 공유하는 공간</Subtitle>
      <PageName>" Taste Lab "</PageName>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  align-items: flex-start; /* 기본적으로 왼쪽 정렬 */
  width: 400px;
  max-width: 100%;
  white-space: nowrap;
  position: relative;
  padding: 0px 0px 0px 50px;
`;

const Logo = styled.img`
  align-self: flex-end; /* 로고를 오른쪽으로 정렬 */
  width: 85px;
  height: 85px;
  border-radius: 50px;
  margin-bottom: 10px; /* 아래 간격 추가 */
  transform: translateX(-57px); /* 오른쪽 끝에서 왼쪽으로 100px 이동 */
  z-index: 10; /* 다른 요소 위에 표시되도록 z-index 추가 */
  font-family: 'Poppins', sans-serif; /* Poppins 글꼴 사용 */
`;

const Title = styled.b`
  color: #e1650f;
  font-size: 40px;
  margin: 0; /* 추가 간격 제거 */
  font-family: 'Poppins', sans-serif; /* Poppins 글꼴 사용 */
`;

const Subtitle = styled.p`
  color: #ce9971;
  font-size: 22px;
  margin: 12px 0 0 1px; /* 위쪽 간격만 설정 */
  font-family: 'Poppins', sans-serif; /* Poppins 글꼴 사용 */
`;

const PageName = styled.p`
  color: #e1650f;
  font-size: 20px;
  margin: 13px 0 0 1px; /* 위쪽 간격만 설정 */
  font-family: 'Roboto Slab', serif;
  font-style: italic;
`;

export default Header;
