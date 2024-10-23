import React from "react";
import styled from "styled-components";

const CompleteButtonForm = () => {
    return (
        <Wrapper>
            <CompleteButton>선택 완료</CompleteButton>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 300px;
    transform: translateY(-24%);
`

const CompleteButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;

    position: absolute;
    width: 130px;
    height: 35px;
    left: calc(50% - 130px/2);
    top: 130px;

    font-family: 'Inter';
    font-size: 15px;
    font-weight: 700;
    text-align: center;

    background: #FFD966;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    border: none;

    cursor: pointer;
`

export default CompleteButtonForm;