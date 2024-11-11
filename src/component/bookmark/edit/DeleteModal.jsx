import React from "react";
import Modal from 'react-modal';

const DeleteModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>정말 삭제하시겠습니까?</h2>
            <button onClick={onRequestClose}>닫기</button>
            <button onClick={() => {
                onRequestClose();
            }}>
                삭제
            </button>
        </Modal>
    );
};

export default DeleteModal;