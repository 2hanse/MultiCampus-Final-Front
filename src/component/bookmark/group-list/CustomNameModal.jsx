import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CustomNameModal = ({ setIsModalOpen, initialName, onConfirm }) => {
    const [inputValue, setInputValue] = useState(initialName);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setHasChanges(inputValue !== initialName);
    }, [inputValue, initialName]);

    // 모달 닫기
    const closeModal = () => setIsModalOpen(false);

    // '예' 클릭 시 동작
    const handleConfirm = () => {
        if (hasChanges) {
            onConfirm(inputValue);
            setIsModalOpen(false);
        }
    };

    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <p>장소명 변경</p>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="새로운 장소명을 입력하세요"
                />
                <ButtonWrapper>
                    <ModalButton primary disabled={!hasChanges} onClick={handleConfirm}>
                        수정
                    </ModalButton>
                    <ModalButton onClick={closeModal}>취소</ModalButton>
                </ButtonWrapper>
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    display: flex;
    position: fixed;
    top: 0px;
    width: 430px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-items: center;
    z-index: 20;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 10px 15px 15px 15px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 306px;
    height: 150px;
`;

const Input = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 45px;

    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #DFA67B;

    font-family: 'sans-serif';
    font-style: normal;
	font-weight: 400;
	font-size: 16px;
    color: #ED6000;

    margin-left: 15px;
    padding: 0px 20px 0px 20px;

    &:focus {
        outline: none;
    }
`

const ButtonWrapper = styled.div`
    margin: 10px 60px 0px 60px;
    display: flex;
    justify-content: space-between;
`;

const ModalButton = styled.button`
    background: none;
    color: ${(props) => (props.primary ? "#ED6000" : "#000")};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: ${(props) => (props.primary ? "#F4B183" : "#bbb")};
    }
`;

export default CustomNameModal;