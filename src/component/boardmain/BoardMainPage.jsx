import React           from "react";
import styled          from "styled-components";
import Header          from "./Header";
import BoardButtonForm from "./BoardButtonForm";
import HotPostForm     from "./HotPostForm";
import NewPostForm     from "./NewPostForm";
import Footer          from "./Footer";

function BoardMainPage() {
    return (
        <Main>
            <Header />
            <BoardButtonForm />
            <HotPostForm />
            <NewPostForm />
            <Footer />
        </Main>
        
    )
}

const Main = styled.main`
    width: 430px;
    max-height: 932px;
    min-height: 632px;
    height: auto;
    background: #FFF4D2;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    padding: 187px 0px 100px 0px;
`

export default BoardMainPage;