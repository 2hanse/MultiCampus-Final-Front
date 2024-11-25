import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Page1 from './asset/Page_1.png';
import Page2 from './asset/Page_2.png';
import Page3 from './asset/Page_3.png';
import Page4 from './asset/Page_4.png';
import Page5 from './asset/Page_5.png';
import Page6 from './asset/Page_6.png';
import { useNavigate } from 'react-router-dom';

const GuidePage = ({ onClose }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // 커스텀 이전 버튼
    nextArrow: <NextArrow />, // 커스텀 다음 버튼
  };

  const navigate = useNavigate();

  const onCLickMap = () => {
    navigate(`/homepage`);
  }

  return (
    <Main>
      <StyledSlider {...settings}>
        <Slide>
          <GuideImg src={Page1} alt={'Page_1'}/>
        </Slide>
        <Slide>
          <GuideImg src={Page2} alt={'Page_2'}/>
        </Slide>
        <Slide>
          <GuideImg src={Page3} alt={'Page_3'}/>
        </Slide>
        <Slide>
          <GuideImg src={Page4} alt={'Page_4'}/>
        </Slide>
        <Slide>
          <GuideImg src={Page5} alt={'Page_5'}/>
        </Slide>
        <Slide>
          <GuideImg src={Page6} alt={'Page_6'}/>
          <Button2 onClick={onCLickMap}>바로 시작하기</Button2>
        </Slide>
      </StyledSlider>
    </Main>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <ArrowButton className="next" onClick={onClick}>
      &gt;
    </ArrowButton>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <ArrowButton className="prev" onClick={onClick}>
      &lt;
    </ArrowButton>
  );
};

const Button2 = styled.button`
  position: absolute;
  z-index: 2;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: #ed6000;
  color: white;
  border: 2px solid #ed6000; /* 테두리 색상을 흰색으로 설정 */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 15px 15px;

  &:hover {
    background-color: white; /* hover 시 약간 회색톤으로 변경 */
    color: #ed6000;
  }
`;

// 공통 화살표 스타일
const ArrowButton = styled.button`
  position: absolute;
  top: 45%;
  z-index: 1;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  transform: translateY(-50%);

  &:hover {
    color: #555;
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;

// Main 컴포넌트: 전체 컨테이너
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 430px; /* Main 크기 고정 */
  height: 95vh; /* 슬라이더 높이를 Main 높이에 맞춤 */
  background: #ffffff;
  margin: 0 auto;
  padding: 20px;
  border: 0.5px solid #cac4d0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

// StyledSlider: 슬라이더 스타일
const StyledSlider = styled(Slider)`
  width: 100%; /* Main의 width에 맞춤 */
  height: 100%; /* Main의 height에 맞춤 */
  .slick-list {
    overflow: hidden; /* 슬라이더 콘텐츠가 잘리는 문제 방지 */
    border-radius: 8px;
  }

  .slick-slide > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 50px); /* dots를 고려해 높이 조정 */
    background-color: #f5f5f5;
    border-radius: 8px;
  }

  .slick-dots {
    bottom: 10px; /* dots 위치 조정 */
  }
`;

// 슬라이더 개별 슬라이드
const Slide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.5rem;
  width: 430px;
  height: 90vh;
  color: #333;
  background: #fff;
  border-radius: 8px;
  padding: 0px;
  margin: 0px;
`;

const GuideImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin-left: 3vh;
`;

export default GuidePage;
