import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import { useNavigate } from "react-router-dom";
import AlertActions from "../alert/AlertActions";

function AlertPage() {
  const navigate = useNavigate();

  return (
    <Main>
      <Header title="알림" actions={<AlertActions />} />
      
      <Footer />
    </Main>
  );
}

const Main = styled.main`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    max-height: 932px;
    min-height: 732px;
    background: #ffffff;
    margin: 0 auto;
    border: 0.5px solid #CAC4D0;
`;

export default AlertPage;