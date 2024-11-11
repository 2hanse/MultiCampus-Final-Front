import React, { useState } from "react";
import styled from "styled-components";

function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("식사");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <TabContainer>
      <TabButton
        active={activeTab === "식사"}
        onClick={() => handleTabClick("식사")}
      >
        식사
      </TabButton>
      <TabButton
        active={activeTab === "디저트"}
        onClick={() => handleTabClick("디저트")}
      >
        디저트
      </TabButton>
      <TabButton
        active={activeTab === "주류"}
        onClick={() => handleTabClick("주류")}
      >
        주류
      </TabButton>
    </TabContainer>
  );
}

const TabContainer = styled.nav`
  display: flex;
  gap: 34px;
  padding: 0 35px;
  margin-top: 25px;
`;

const TabButton = styled.button`
  color: ${props => props.active ? "#000000" : "#757575"};
  font: 400 18px/1 Inter, sans-serif;
  text-align: center;
  letter-spacing: 0.13px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export default CategoryTabs;