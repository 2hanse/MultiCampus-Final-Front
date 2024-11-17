import React, { useState } from "react";
import styled              from "styled-components";
import Header              from "../mylocation/Header";
import SearchForm          from "../mylocation/SearchForm";
import CompleteButtonForm  from "../mylocation/CompleteButtonForm";
import Footer              from "../layout/footer/Footer";

function MyLocationPage() {

    const [outputValue, setOutputValue] = useState("");

    return (
        <Main>
            <Header />
            <SearchForm setOutputValue={setOutputValue} />
            <CompleteButtonForm outputValue={outputValue} />
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
    padding: 119px 0px 100px 0px;
    border: 0.5px solid #CAC4D0;
`;

export default MyLocationPage;