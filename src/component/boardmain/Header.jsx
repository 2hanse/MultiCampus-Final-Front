import React, { useEffect, useState } from "react";
import styled                         from "styled-components";
import 맛있는녀석들_로고                   from "./assets/맛있는녀석들_로고.png";
import 돋보기                           from "./assets/돋보기.png";
import 알림                            from "./assets/알림.png";
import 프로필                           from "./assets/프로필.png";
import { useNavigate }                from "react-router-dom";
import { getUserIdFromToken }         from "../api/jwt";
import getProfileImgUrlFromUserId     from "../api/member_info";
import { getAddressFromCoordinates }  from "../api/location";
import api                            from "../api/axios";

const Header = () => {
    const navigate = useNavigate(); 
    const [profileImgUrl, setProfileImgUrl] = useState('');
    const [userLocation, setUserLocation] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = getUserIdFromToken();
            if (userId) {
                getProfileImgUrlFromUserId(userId, setProfileImgUrl);
            }

            try {
                const response = await api.get("/users/geolocation"); // 위치 정보 API
                if (response.status === 200 && response.data.verified_lat && response.data.verified_lng) {
                    const address = await getAddressFromCoordinates(
                        response.data.verified_lat,
                        response.data.verified_lng
                    );
                    setUserLocation(address); // 주소로 변환하여 설정
                } else if (response.status === 204) {
                    setUserLocation("위치 인증이 되지 않았습니다.");
                }
            } catch (error) {
                console.error("Error fetching user location:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <HeaderBox>
            <Logo src={맛있는녀석들_로고} alt="맛있는 녀석들 로고" />
            <MyLocation>{userLocation}</MyLocation>
            <Search src={돋보기} alt="Search" />
            <Notification src={알림} alt="Notification" onClick={() => navigate("/user/alert")} />
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
    background-color: #FFF4D2;
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
    top: 136px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    display: flex;
    align-items: center;

    color: #000000;

    border: none;
`

export default Header;