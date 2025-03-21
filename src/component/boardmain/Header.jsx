import React, { useEffect, useState } from "react";
import styled from "styled-components";
import 맛있는녀석들_로고 from "./assets/맛있는녀석들_로고.png";
import 돋보기 from "./assets/돋보기.png";
import 알림 from "./assets/알림.png";
import 프로필 from "./assets/프로필.png";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../api/jwt";
import getProfileImgUrlFromUserId from "../api/member_info";
import { getAddressFromCoordinates } from "../api/location";
import api from "../api/axios";

const Header = ({ setIsModalOpen }) => {
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
                    const { fullAddress } = await getAddressFromCoordinates(
                        response.data.verified_lat,
                        response.data.verified_lng
                    );
                    setUserLocation(fullAddress); // fullAddress 출력
                } else if (response.status === 204) {
                    setUserLocation("내 동네 설정이 되지 않았습니다.");
                }
            } catch (error) {
                console.error("Error fetching user location:", error);
                setUserLocation("위치 정보를 가져오는 중 오류가 발생했습니다.");
            }
        };

        fetchUserData();
    }, []);

    // 모달 열기
    const openModal = () => setIsModalOpen(true);

    // userLocation의 길이를 8글자로 제한하고 '...'을 추가
    const shortenedLocation = userLocation.length > 12 ? userLocation.slice(0, 12) + "..." : userLocation;

    return (
        <HeaderBox>
            <Logo src={맛있는녀석들_로고} alt="맛있는 녀석들 로고" />
            <MyLocation onClick={openModal}><b>{shortenedLocation}</b></MyLocation>
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
    background-color: #FFFFFF;
    border: 0.5px solid #CAC4D0;
    z-index: 10;
`

const Logo = styled.img`
    position: absolute;
    width: 85px;
    height: 85px;
    left: calc(50% - 85px/2 + 0.5px);
    top: 58px;
    border-radius: 50px;
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
    width: auto;
    height: auto;
    left: 24px;
    top: 148px;
    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 29px;
    display: flex;
    align-items: center;
    color: #000000;
    border: none;
    cursor: pointer;
`

export default Header;
