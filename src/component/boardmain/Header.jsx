import React          from 'react';
import styled         from 'styled-components';
import 맛있는녀석들_로고   from './assets/맛있는녀석들_로고.png';
import 돋보기           from './assets/돋보기.png';
import 알림            from './assets/알림.png';
import 프로필           from './assets/프로필.png';

const Header = () => {
    return (
        <HeaderBox>
            <Logo src={맛있는녀석들_로고} alt="맛있는 녀석들 로고" />
            <Search src={돋보기} alt="Search" />
            <Notification src={알림} alt="Notification" />
            <Profile src={프로필} alt="Profile" />
        </HeaderBox>
    );
};

const HeaderBox = styled.header`
    position: fixed;
    max-width: 430px;
    width: 100%;
    height: 187px;
    left: 50%;
    top: 0px;
    transform: translateX(-50%);
    background-color: #FFFFFF;    
    z-index: 1;
`;

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
`

const Notification = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    left: 318px;
    top: 141px;
`
const Profile = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    left: 373px;
    top: 141px;
`

export default Header;