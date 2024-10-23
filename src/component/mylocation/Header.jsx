import React from "react";
import styled from "styled-components";
import Back from "./assets/Back.png";

const Header = () => {
    return (
        <HeaderBox>
            <BackPage src={Back} alt="Back" />
            <Title>내 동네 설정</Title>
        </HeaderBox>
    )
}

const HeaderBox = styled.header`
    position: fixed;
    transform: translateX(-50%);
    max-width: 430px;
    width: 100%;
    height: 119px;
    left: 50%;
    top: 0px;
    background-color: #FFF4D2;
    border: 0.5px solid #CAC4D0;
    z-index: 100;
`;

const BackPage = styled.img`
    position: absolute;
    width: 24px;
    height: 24px;
    left: 28px;
    top: 62px;

    cursor: pointer;
`

const Title = styled.h1`
    position: absolute;
    width: 150px;
    height: 10px;
    left: calc(50% - 92px/2);
    top: 70px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;

    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
`

export default Header;