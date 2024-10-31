import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const BottomSheet = ({ onClose }) => {
    const [startY, setStartY] = useState(0); // 터치 시작 위치
    const [currentY, setCurrentY] = useState(0); // 현재 드래그 위치
    const [isDragging, setIsDragging] = useState(false); // 드래그 상태

    // 터치 시작 시 초기 위치 설정
    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
        setIsDragging(true);
    };

    // 드래그 중 위치 업데이트
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - startY;
        // Bottom Sheet를 위로 드래그할 때 deltaY가 음수가 되어야 이동
        setCurrentY(deltaY);
    };

    // 터치 종료 후 위치 확정
    const handleTouchEnd = () => {
        setIsDragging(false);
        // 특정 위치까지 끌어올려졌다면 고정, 아니면 닫기
        if (currentY < -100) { // -100px 이상 올리면 고정
            setCurrentY(0); // 초기화
        } else { // 닫기 조건
            onClose();
        }
    };

    return (
        <Overlay onClick={onClose}>
            <SheetContainer
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: `translateY(${currentY}px)`,
                    transition: isDragging ? "none" : "transform 0.3s ease-in-out"
                }}
            >
                <DragHandle
                    onTouchStart={handleTouchStart}
                    onMouseEnter={(e) => (e.currentTarget.style.cursor = "grab")}
                    onMouseLeave={(e) => (e.currentTarget.style.cursor = "default")}
                />
                <CloseButton onClick={onClose}>Close</CloseButton>
                <Content>Here is some content in the bottom sheet!</Content>
            </SheetContainer>
        </Overlay>
    );
};

// 애니메이션 정의
const slideUp = keyframes`
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 102px;
    z-index: 15;
`;

const SheetContainer = styled.div`
    width: 100%;
    max-width: 398px;
    background-color: #FFFFFF;
    border-radius: 20px 20px 0px 0px;
    padding: 16px;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.3);
    animation: ${slideUp} 0.3s ease-in-out;
    will-change: transform;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: #333;
    font-size: 18px;
    cursor: pointer;
    align-self: flex-end;
`;

const Content = styled.div`
    padding: 20px;
    text-align: center;
    color: #333;
`;

const DragHandle = styled.div`
    width: 50px;
    height: 5px;
    background: #ccc;
    border-radius: 5px;
    margin: 0 auto 10px;
    cursor: grab;
`;

export default BottomSheet;