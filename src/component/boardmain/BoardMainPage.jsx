import React from "react";
import styled from "styled-components";
import Header from "./Header";

function BoardMainPage() {
    return (
        <Main>
            <Box />
        </Main>
    )
}

const Main = styled.main`
    max-width: 430px;
    max-height: 932px;
    width: 100%;
    height: 100%;
    background: #FFF4D2;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    padding: 0px 0px 932px;
`

const Box = styled.header`
    position: relative;
    max-width: 430px;
    width: 100%;
    height: 187px;
    left: 0px;
    top: 0px;
    background-color: #FFFFFF;    
`

export default BoardMainPage;