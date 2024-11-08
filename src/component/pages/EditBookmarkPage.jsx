import React           from "react";
import styled          from "styled-components";
import { useNavigate } from "react-router-dom";
import Back            from "../mylocation/assets/Back.png";

const EditBookmarkPage = () => {
    const navigate = useNavigate();

    return (
        <Main>
            <HeaderBox>
                <BackPage src={Back} alt="Back" onClick={() => navigate("/homepage", { state: { openBookmarkSheet: true } })} />
                <Title>그룹 목록 편집</Title>
            </HeaderBox>
            <Content>
                <Warning>
                    ※ 삭제된 그룹은 복구가 불가합니다.
                </Warning>
            </Content>
        </Main>
    );
};

const Main = styled.main`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    height: 932px;
    background: #FFFFFF;
    margin: 0 auto;
    border: 0.5px solid #CAC4D0;
`;

const HeaderBox = styled.header`
    position: fixed;
    transform: translateX(-50%);
    max-width: 430px;
    width: 100%;
    height: 119px;
    left: 50%;
    top: 0px;
    background-color: #FFFFFF;
    border: 0.5px solid #CAC4D0;
    z-index: 10;
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
    left: calc(50% - 105px/2);
    top: 70px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;

    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
`

const Content = styled.div`
    display: flex;
    position: absolute;
    width: 410px;
    height: 793px;
    top: 120px;
    padding: 10px;
`

const Warning = styled.h3`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 0px;
    left: 20px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;

    background: none;
    color: #ED6000;
`

export default EditBookmarkPage;