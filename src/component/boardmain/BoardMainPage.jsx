import React from "react";
import styled from "styled-components";
import Header from "./Header";

function BoardMainPage() {
    return (
        <Main>
            <Header />
        </Main>
        
    )
}

const Main = styled.main`
    max-width: 430px;
    max-height: 932px;
    width: 100%;
    background: #FFF4D2;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    padding: 0px 0px 932px;
    padding-top: 187px;
`

export default BoardMainPage;