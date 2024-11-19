import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import menu from "./asset/menu.png";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../api/jwt";

const ActionsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const ButtonIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  height: 24px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #FFF2CC;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 2200;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  width: 28px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function DetailActions({ post , category }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const localUserId = getUserIdFromToken();

  const user_id = 58;

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleItemClick = async (action) => {
    try {
      if (action === "수정") {
        // 수정 페이지로 이동
        navigate(`/boardpost/${category}/${post.board_id}`);
      } else if (action === "삭제") {
        // 삭제 API 호출
        await api.delete(`/boards/${post.board_id}`);
        alert("게시글이 삭제되었습니다.");
        // 삭제 후 뒤로가기
        navigate(-1);
      }
    } catch (error) {
      console.error(`게시글 ${action} 중 오류 발생:`, error);
      alert(`게시글 ${action}에 실패했습니다.`);
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <ActionsWrapper>
      <ActionButtons>
        <ActionButton aria-label="Menu" onClick={toggleDropdown}>
          <ButtonIcon loading="lazy" src={menu} alt="" />
        </ActionButton>
        {isDropdownOpen && (
          <DropdownMenu ref={dropdownRef}>
            <DropdownItem
              onClick={() => {
                if (localUserId && localUserId === post.user_id) {
                  handleItemClick("수정");
                } else {
                  alert("권한이 없습니다.");
                }
              }}>수정</DropdownItem>
            <DropdownItem
              onClick={() => {
                if (localUserId && localUserId === post.user_id) {
                  handleItemClick("삭제");
                } else {
                  alert("권한이 없습니다.");
                }
              }}>삭제</DropdownItem>
          </DropdownMenu>
        )}
      </ActionButtons>
    </ActionsWrapper>
  );
}

export default DetailActions;