import React           from "react";
import styled          from "styled-components";
import Header          from "../boardmain/Header";
import BoardButtonForm from "../boardmain/BoardButtonForm";
import HotPostForm     from "../boardmain/HotPostForm";
import NewPostForm     from "../boardmain/NewPostForm";
import Footer          from "../layout/footer/Footer";

function BoardMainPage() {
    return (
        <Main>
            <Header />
            <BoardButtonForm />
            <HotPostForm />
            <NewPostForm />
            <Footer />
        </Main>
        
    );
};

const Main = styled.main`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    max-height: 932px;
    min-height: 632px;
    height: auto;
    background: #FFF4D2;
    margin: 0 auto;
    padding: 187px 0px 100px 0px;
    border: 0.5px solid #CAC4D0;
`;

export default BoardMainPage;