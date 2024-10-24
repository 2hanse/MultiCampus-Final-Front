import React, { useState } from "react";
import styled from "styled-components";

const CompleteButtonForm = () => {
    const [outputValue, setOutputValue] = useState('');

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
    position: relative;
    width: 100%;
    height: 200px;
    top: 500px;
`

const PrintLocation = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 375px;
    height: 57px;
    left: calc(50% - 375px/2 + 0.5px);
    top: 0px;

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
    top: 107px;

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