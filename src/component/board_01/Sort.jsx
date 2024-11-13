import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import dropdownicon from "./asset/drop_down .png";

function Sort() {
  const [selectedSort, setSelectedSort] = useState("등록 순"); // 상태 추가
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSortChange = (sortType) => {
    setSelectedSort(sortType);
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
    <SortContainer ref={dropdownRef}>
      <SortButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {selectedSort} {/* selectedSort 표시 */}
        <DropdownIcon src={dropdownicon} alt="Dropdown icon" />
      </SortButton>
      {isDropdownOpen && (
        <SortDropdown>
          <SortDropdownItem onClick={() => handleSortChange("등록 순")}>등록 순</SortDropdownItem>
          <SortDropdownItem onClick={() => handleSortChange("좋아요 순")}>좋아요 순</SortDropdownItem>
          <SortDropdownItem onClick={() => handleSortChange("조회수 순")}>조회수 순</SortDropdownItem>
        </SortDropdown>
      )}
    </SortContainer>
  );
}



const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  z-index: 1; // Sort의 z-index 설정
`;

const SortButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #ffffff;
  padding: 5px 8px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 5px;
`;

const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #cac4d0;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: block;
  width: 100px;
`;

const SortDropdownItem = styled.button`
  background: none;
  border: none;
  padding: 4px 6px;
  text-align: left;
  cursor: pointer;
  width: 100%; // 드롭다운 아이템이 드롭다운 전체 너비에 맞도록 설정
  font-size: 14px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default Sort;
