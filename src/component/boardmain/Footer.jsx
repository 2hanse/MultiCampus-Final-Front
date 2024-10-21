import React from "react";
import styled from "styled-components";
import Home from "./assets/Home.png";
import Feed from "./assets/Feed.png";
import Map from "./assets/Map.png";
import Chat from "./assets/Chat.png";
import Person from "./assets/Person.png";

const Footer = () => {
    return (
        <FooterBox>
            <BoardMain src={Home} alt="Home" />
        </FooterBox>
    );
}

const FooterBox = styled.footer`
    position: fixed;
    max-width: 430px;
    width: 100%;
    height: 100px;
    left: 50%;
    top: 832px;
    transform: translateX(-50%);
    background-color: #FFFFFF;
    border-top: 0.5px solid #CAC4D0;
    z-index: 2;
`

const BoardMain = styled.img`
    position: absolute;
    width: 30px;
    height: 33.75px;
    left: 46px;
    top: 859px;
`

export default Footer;