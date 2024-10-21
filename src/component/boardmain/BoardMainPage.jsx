import React         from "react";
import styled        from "styled-components";
import Header        from "./Header";
import BoardMainForm from "./BoardMainForm";
import Footer        from "./Footer";

function BoardMainPage() {
    return (
        <Main>
            <Header />
            <BoardMainForm />
            <Footer />
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
    padding: 0px 0px 732px;
    padding-top: 187px;
`

export default BoardMainPage;