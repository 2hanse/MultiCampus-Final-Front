import React, { useEffect, useState } from "react";
import styled                         from "styled-components";
import 맛있는녀석들_로고                   from "./assets/맛있는녀석들_로고.png";
import 돋보기                           from "./assets/돋보기.png";
import 알림                            from "./assets/알림.png";
import 프로필                           from "./assets/프로필.png";
import { useNavigate }                from "react-router-dom";
import { getUserIdFromToken }         from "../api/jwt";
import getProfileImgUrlFromUserId     from "../api/member_info";

const Header = () => {
    const navigate = useNavigate(); 
    const [profileImgUrl, setProfileImgUrl] = useState('');

    useEffect(() => {
        const userId = getUserIdFromToken();
        if (userId) {
            getProfileImgUrlFromUserId(userId, setProfileImgUrl);
        }
    }, []);

    return (
        <HeaderBox>
            <Logo         src={맛있는녀석들_로고} alt="맛있는 녀석들 로고" />
            <MyLocation>지역 미설정</MyLocation>
            <Search       src={돋보기}         alt="Search" />
            <Notification src={알림}           alt="Notification" onClick={() => navigate("/user/alert")} />
            {profileImgUrl ? (
                <LoginedProfile
                    src={profileImgUrl}
                    alt="Profile"
                    onClick={() => {
                        navigate("/myprofilepage");
                    }}
                />
            ) : (
                <Profile
                    src={프로필}
                    alt="Profile"
                    onClick={() => navigate("/")}
                />
            )}
        </HeaderBox>
    );
}

const HeaderBox = styled.header`
    position: fixed;
    transform: translateX(-50%);
    max-width: 430px;
    width: 100%;
    height: 187px;
    left: 50%;
    top: 0px;
    background-color: #FFFFFF;
    border: 0.5px solid #CAC4D0;
    z-index: 100;
`

const Logo = styled.img`
    position: absolute;
    width: 85px;
    height: 85px;
    left: calc(50% - 85px/2 + 0.5px);
    top: 58px;
    border-radius: 50px;
`

const Search = styled.img`
    position: absolute;
    width: 22px;
    height: 22px;
    left: 271px;
    top: 145px;

    cursor: pointer;
`

const Notification = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    left: 318px;
    top: 141px;

    cursor: pointer;
`
const Profile = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    left: 373px;
    top: 141px;

    cursor: pointer;
`

const LoginedProfile = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    left: 373px;
    top: 141px;
    border-radius: 50%;
    border: ${(props) => (props.isSelected ? "1px solid #ED6000" : "none")};
    cursor: pointer;
`;

const MyLocation = styled.text`
    position: absolute;
    width: 200px;
    height: 42px;
    left: 24px;
    top: 135px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;

    color: #000000;

    border: none;
`

export default Header;