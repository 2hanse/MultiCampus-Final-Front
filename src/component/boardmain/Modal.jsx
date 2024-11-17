import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Modal = ({ setIsModalOpen }) => {
    const navigate = useNavigate();
    
    // 모달 닫기
    const closeModal = () => setIsModalOpen(false);

    // '예' 클릭 시 동작
    const handleConfirm = () => {
        setIsModalOpen(false);
        navigate("/mylocation");
    };

    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContent>
                <p>내 동네를 설정하시겠습니까?</p>
                <ButtonWrapper>
                    <ModalButton primary onClick={handleConfirm}>예</ModalButton>
                    <ModalButton onClick={closeModal}>아니오</ModalButton>
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
    padding-top: 15px;
    border: 1px solid #DFA67B;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 306px;
    height: 120px;
`;

const ButtonWrapper = styled.div`
    margin: 30px 70px 0px 70px;
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

export default Modal;