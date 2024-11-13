import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import dropdownicon from "./asset/drop_down .png";

function CategoryTabs() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("식사"); // 상태 추가

  const dropdownRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {activeTab} {/* activeTab 표시 */}
        <DropdownIcon src={dropdownicon} alt="Dropdown icon" />
      </DropdownButton>
      {isDropdownOpen && (
        <DropdownMenu>
          <DropdownItem onClick={() => handleTabClick("식사")}>식사</DropdownItem>
          <DropdownItem onClick={() => handleTabClick("디저트")}>디저트</DropdownItem>
          <DropdownItem onClick={() => handleTabClick("주류")}>주류</DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}



const DropdownContainer = styled.div`
  position: relative;
  margin: 10px;
  width: 100px;
  z-index: 1; // CategoryTabs의 z-index 설정
`;

const DropdownButton = styled.button`
  background-color: #ffffff; // 배경색을 흰색으로 설정
  border: 1px solid #ffffff; // 경계를 흰색으로 설정
  color: #000;
  padding: 5px 8px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 5px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #ffffff; // 메뉴 배경을 흰색으로 설정
  border: 1px solid #ffffff; // 메뉴 경계를 흰색으로 설정
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  width: 100%;
  padding: 5px 8px; // 메뉴 크기 조정
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default CategoryTabs;
