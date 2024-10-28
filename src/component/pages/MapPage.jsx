import React from "react";
import styled from "styled-components";
import Footer from "../boardmain/Footer";
import Header from "../map/Header";
import Map from "../map/Map";

function MapPage() {
    return (
        <Main>
            <Header />
            <Map />
            <Footer />
        </Main>
    )
}

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
    border: 0.5px solid #CAC4D0;
`

export default MapPage;