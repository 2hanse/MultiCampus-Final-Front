import React, { useState } from "react";
import styled              from "styled-components";

const CompleteButtonForm = ({ outputValue }) => {
    return (
        <Wrapper>
            <PrintLocation isPlaceholder={!outputValue}>
                {outputValue || PlaceholderText}
            </PrintLocation>
            <CompleteButton>선택 완료</CompleteButton>
        </Wrapper>
    );
}

const PlaceholderText = '선택한 주소지';

const Wrapper = styled.div`
    position: fixed;
    width: 430px;
    height: 200px;
    bottom: 100px;
    transform: translateX(-0.2%);
    background-color: #FFF4D2;
    border-left: 0.5px solid #CAC4D0;
    border-right: 0.5px solid #CAC4D0;
`

const PrintLocation = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 375px;
    height: 57px;
    left: calc(50% - 375px/2 + 0.5px);
    top: 38px;

    background: #FFFFFF;
    border: 0.5px solid #DFA67B;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding-top: 13.5px;

    font-family: 'Inter';
    font-size: 17px;
    font-style: normal;
	font-weight: 500;
    text-align: center;
    color: ${(props) => (props.isPlaceholder ? '#CAC4D0' : '#000')};
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
    top: 127px;

    font-family: 'Inter';
    font-size: 15px;
    font-weight: 700;
    text-align: center;

    background: #FFD966;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    border: none;

    cursor: pointer;

    transition: transform 0.1s ease-in-out;
  
    &:active {
        transform: scale(0.95);
    }
`

export default CompleteButtonForm;