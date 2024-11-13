import React, { useState } from "react";
import styled from "styled-components";
import searchbutton from "./asset/search.png";

function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 가시성

  // 모달 열고 닫기 함수
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div style={styles.container}>
      <button onClick={toggleModal} style={styles.searchButton}>
        <img src={searchbutton} alt="searchbutton" style={styles.searchIcon} />
      </button>

      {/* 모달 창 */}
      {isModalOpen && (
        <ModalOverlay onClick={toggleModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <h2>검색</h2>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    style={styles.searchInput}
                />
                <div style={styles.buttonContainer}>
                    <button onClick={toggleModal} style={styles.closeButton}>닫기</button>
                    <button style={styles.searchButton2}>검색</button>
                </div>
            </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
}

// 스타일 정의
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  searchButton: {
    width: "24px",
    height: "24px",
    padding: "0", // 버튼 크기 조정
    border: "none",
    background: "none",
    cursor: "pointer",
  },
  searchIcon: {
    width: "24px",
    height: "24px",
  },
  searchInput: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  closeButton: {
    marginTop: "10px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  closeButton: {
    marginTop: "10px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
  },
  searchButton2: {
    marginTop: "10px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    marginLeft: "10px", // 버튼 간격 조정
  },
};

// 모달 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%); // 화면 중앙으로 이동
  width: 430px; // 화면의 너비에 맞춤
  height: 932px; // 화면의 높이에 맞춤
  background: rgba(0, 0, 0, 0.5); // 반투명 배경
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// 모달 콘텐츠 스타일
const ModalContent = styled.div`
  width: 90%; // 모달이 화면을 벗어나지 않도록 조정
  max-width: 400px; // 최대 너비 설정
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Search;
