import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import search from "./asset/search.png";
import menu from "./asset/menu.png";

const ActionsWrapper = styled.div`
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

const ModalInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ModalInput = styled.input`
  width: 90%;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: 15px;
  left: 30px;
  padding: 8px 12px;
  font-size: 16px;
  background-color: white;
  color: #ED6000;
  border: 1px solid #ED6000;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ED6000;
    color: white;
  }
`;

const ModalButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 30px;
  padding: 8px 12px;
  font-size: 16px;
  background-color: white;
  color: #ED6000;
  border: 1px solid #ED6000;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ED6000;
    color: white;
  }
`;

// 모달 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 430px; // 화면의 너비에 맞춤
  height: auto;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// 모달 콘텐츠 스타일
const ModalContent = styled.div`
  background: white;
  width: 360px;
  height: 100px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

function BoardActions({ category }) {
  const navigate = useNavigate();

  function gotoSidebar() {
    navigate("/board/Sidebar", {state : {category}});
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchButton = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ActionsWrapper>
      <ActionButtons>
        <ActionButton aria-label="Search" onClick={toggleModal}>
          <ButtonIcon loading="lazy" src={search} alt="" />
        </ActionButton>
        {isModalOpen && (
        <ModalOverlay onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalInputWrapper>
              <ModalInput type="text" placeholder="검색어를 입력하세요" />
            </ModalInputWrapper>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
            <ModalButton onClick={handleSearchButton}>검색</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
        <ActionButton aria-label="Sidebar" onClick={gotoSidebar}>
          <ButtonIcon loading="lazy" src={menu} alt="" />
        </ActionButton>
      </ActionButtons>
    </ActionsWrapper>
  );
}

export default BoardActions;