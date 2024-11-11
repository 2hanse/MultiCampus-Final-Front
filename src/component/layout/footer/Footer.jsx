import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Home from "./assets/Home.png";
import Feed from "./assets/Feed.png";
import Map from "./assets/Map.png";
import Chat from "./assets/Chat.png";
import Person from "./assets/Person.png";
import onHome from "./assets/onHome.png";
import onFeed from "./assets/onFeed.png";
import onMap from "./assets/onMap.png";
import onChat from "./assets/onChat.png";

const Footer = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("home");

    const handleNavigation = (tabName, path) => {
        setActiveTab(tabName);
        navigate(path);
    };

    return (
        <FooterBox>
            <BoardMainPage
                src={activeTab === "home" ? onHome : Home}
                alt="Home"
                onClick={() => navigate("/boardmain")}
            />
            <FeedPage
                src={activeTab === "Feed" ? onFeed : Feed}
                alt="Feed"
                onClick={() => navigate("/subscribe")}
            />
            <MapPage
                src={activeTab === "Map" ? onMap : Map}
                alt="Map"
                onClick={() => navigate("/")}
            />
            <ChatPage
                src={activeTab === "Chat" ? onChat : Chat}
                alt="Chat"
                onClick={() => navigate("/user/chat/list")}
            />
            <MyPage
                src={Person}
                alt="Person"
                onClick={() => navigate("/myprofilepage")}
            />
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
    z-index: 10;
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
