import React from "react";
import styled from "styled-components";
import writebutton from "./asset/writebutton.png";
import restaurant from "./asset/restaurant.png";
import free from "./asset/free.png";
import top from "./asset/top.png";
import tour from "./asset/tour.png";
import { useNavigate } from "react-router-dom";

const SidebarMenu = () => {
  const navigate = useNavigate();

  function gotoWritePage() {
    navigate('/boardpost/restaurant');
  }

  function gotoRestaurantBoardPage() {
    navigate('/board/RestaurantBoard');
  }

  function gotoFreeBoardPage() {
    navigate('/board/FreeBoard');
  }

  function gotoTopBoardPage() {
    navigate('/board/TopBoard');
  }

  function gotoTourBoardPage() {
    navigate('/board/TourBoard');
  }

  return (
    <MenuWrapper>
      <MenuItem1 src={writebutton} alt="writebutton" onClick={gotoWritePage} />
      <MenuDivider />
      <MenuItem2 src= {restaurant} alt="restaurant" onClick={gotoRestaurantBoardPage} />
      <MenuItem3 src= {free} alt="free" onClick={gotoFreeBoardPage} />
      <MenuItem4 src= {top} alt="top" onClick={gotoTopBoardPage} />
      <MenuItem5 src= {tour} alt="tour" onClick={gotoTourBoardPage} />
    </MenuWrapper>
  );
};

const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 45px 0 -62px;
  padding: 0 17px;
  height: auto;
  min-height: 100vh;
`;

const MenuItem = styled.img`
  cursor: pointer;
  width: auto; /* 필요에 따라 조정 */
  height: auto;
  display: block;
  margin: 0 auto; /* 가운데 정렬 */
  padding: 0; /* 패딩 초기화 */
`;

const MenuItem1 = styled(MenuItem)`
  margin-top: 0;
`;

const MenuItem2 = styled(MenuItem)`
  margin-top: 30px;
`;

const MenuItem3 = styled(MenuItem)`
  margin-top: 40px;
`;

const MenuItem4 = styled(MenuItem)`
  margin: 40px 40px 0 0;
`;

const MenuItem5 = styled(MenuItem)`
  margin-top: 40px;
`;

const MenuDivider = styled.hr`
  align-self: stretch;
  margin: 60px 0 30px;
  border: 1px solid #fff;
`;

export default SidebarMenu;