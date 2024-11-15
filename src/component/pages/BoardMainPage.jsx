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
            <Container>
                <BoardButtonForm />
                <HotPostForm />
                <NewPostForm />
            </Container>
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
    height: 100vh;
    background: #FFF4D2;
    margin: 0 auto;
    margin-bottom: 110px;
    padding: 187px 0px 100px 0px;
    border: 0.5px solid #CAC4D0;
`;

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 287px);
    box-sizing: border-box;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`

export default BoardMainPage;