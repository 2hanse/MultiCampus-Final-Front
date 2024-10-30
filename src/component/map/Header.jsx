import React from "react";
import styled from "styled-components";
import Bookmark from "./assets/Bookmark.png";
import Search from "./assets/Search.png";

const Header = () => {
    return (
        <HeaderBox>
            <Input placeholder="위치 검색" />
            <BookmarkBtn>
                <img src={Bookmark}
                     alt='Bookmark'
                     style={{height: '20px'}} />
            </BookmarkBtn>
            <SearchBtn>
                <img src={Search}
                     alt='Search'
                     style={{height: '24px'}} />
            </SearchBtn>
        </HeaderBox>
    );
}

const HeaderBox = styled.header`
    position: fixed;
    transform: translateX(-50%);
    max-width: 430px;
    width: 100%;
    height: 150px;
    left: 50%;
    top: 0px;
    background-color: none;
    z-index: 10;
`

const Input = styled.input`
    box-sizing: border-box;

    position: absolute;
    width: 375px;
    height: 57px;
    left: calc(50% - 375px/2 - 0.5px);
    top: 74px;

    background: #FFFFFF;
    border: 0.7px solid #DFA67B;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    font-family: 'Inter';
    font-style: normal;
	font-weight: 500;
	font-size: 17px;

    padding: 0px 60px 0px 60px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-family: 'Inter';
        color: #CAC4D0;
        font-size: 17px;
    }
`

const BookmarkBtn = styled.button`
    position: absolute;
    width: 25px;
    height: 25px;
    background: none;
    border: none;
    top: 92px;
    left: 50px;
    cursor: pointer;
`

const SearchBtn = styled.button`
    position: absolute;
    width: 25px;
    height: 25px;
    background: none;
    border: none;
    top: 89px;
    left: 347px;
    cursor: pointer;
`

export default Header;