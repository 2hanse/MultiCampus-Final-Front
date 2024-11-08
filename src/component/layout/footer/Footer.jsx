import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Home from "./assets/Home.png";
import Feed from "./assets/Feed.png";
import Map from "./assets/Map.png";
import Chat from "./assets/Chat.png";
import Person from "./assets/Person.png";

const Footer = () => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate("/home");
    };

    const goToFeedPage = () => {
        navigate("/feed");
    };

    const goToMapPage = () => {
        navigate("/map");
    };

    const goToChatPage = () => {
        navigate("/chat");
    };

    const goToProfilePage = () => {
        navigate("/myprofilepage");
    };

    return (
        <FooterBox>
            <BoardMainPage src={Home} alt="Home" onClick={goToHomePage} />
            <FeedPage src={Feed} alt="Feed" onClick={goToFeedPage} />
            <MapPage src={Map} alt="Map" onClick={goToMapPage} />
            <ChatPage src={Chat} alt="Chat" onClick={goToChatPage} />
            <MyPage src={Person} alt="Person" onClick={goToProfilePage} />
        </FooterBox>
    );
};

const FooterBox = styled.footer`
    position: fixed;
    display: flex;
    transform: translateX(-0.2%);
    width: 430px;
    height: 100px;
    bottom: 0px;
    background-color: #FFFFFF;
    border: 0.5px solid #CAC4D0;
`;

const BoardMainPage = styled.img`
    position: absolute;
    width: 30px;
    height: 33.75px;
    left: 46px;
    top: 33%;
    cursor: pointer;
`;

const FeedPage = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    left: 123px;
    top: 35%;
    cursor: pointer;
`;

const MapPage = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    left: calc(50% - 30px/2);
    top: 35%;
    cursor: pointer;
`;

const ChatPage = styled.img`
    position: absolute;
    width: 33.33px;
    height: 30px;
    left: 273px;
    top: 35%;
    cursor: pointer;
`;

const MyPage = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    left: 351.33px;
    top: 35%;
    cursor: pointer;
`;

export default Footer;
