import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../layout/header/Header";
import Footer from "../layout/footer/Footer";
import { useNavigate } from "react-router-dom";
import AlertActions from "../alert/AlertActions";
import AlertItem from "../alert/AlertItem";
import api from "../api/axios";

function AlertPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get("/alert/list")
      .then((res) => {
        setAlerts(res.data);
      });
  }, []);

  return (
    <Main>
      <Header title="알림" actions={<AlertActions />} />
      <AlertContainer>
        <ReadAllBtn>전부 읽기</ReadAllBtn>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <AlertItem key={alert.alertId} alert={alert} />
          ))
        ) : (
          <p>도착한 알림이 없습니다.</p>
        )}
      </AlertContainer>
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

const AlertContainer = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 22px 26px;
  box-sizing: border-box;
  gap: 10px;
`;

const ReadAllBtn = styled.button`
  align-self: flex-end;
  border-radius: 6px;
  background-color: rgba(255, 217, 102, 1);
  color: var(--sds-color-text-default-default);
  padding: 5px 8px;
  font: var(--sds-typography-body-font-weight-regular) 16px/1 var(--sds-typography-body-font-family);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 200, 50, 1);
  }

  &:focus {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

export default AlertPage;