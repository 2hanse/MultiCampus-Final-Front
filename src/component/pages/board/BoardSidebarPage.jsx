import React from "react";
import styled from "styled-components";
import SidebarMenu from "../../board-menu/SidebarMenu";
import Footer from "../../layout/footer/Footer"
import close from "../../board-menu/asset/close.png";
import { useNavigate } from "react-router-dom";

const BoardSidebar = () => {
    const navigate = useNavigate();

    function gotoBackPage() {
        navigate(-1);
  }

  return (
    <SidebarWrapper>
      <SidebarContent>
        <CloseButton src={close} alt="Close sidebar" onClick={gotoBackPage} />
        <SidebarMenu />
      </SidebarContent>
      <Footer/>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  background-color: #fff;
  display: flex;
  width: 100%;
  max-width: 430px;
  height: auto;
  min-height: 100vh;
  flex-direction: column;
  overflow: visible;
  margin: 0 auto;
  border: 0.5px solid #CAC4D0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
`;

const SidebarContent = styled.div`
  background-color: #f4b183;
  align-self: flex-end;
  display: flex;
  width: 287px;
  heigt: 100%;
  max-width: 100%;
  flex-direction: column;
  padding: 70px 0 310px;
`;

const CloseButton = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: auto;
  height: auto;
  align-self: flex-end;
  margin-right: 35px;
  cursor: pointer;
`;

export default BoardSidebar;