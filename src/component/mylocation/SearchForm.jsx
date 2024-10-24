import React  from "react";
import styled from "styled-components";
import Location from "./assets/Location.png";

const SearchForm = () => {
    return (
        <Wrapper>
            <Input placeholder="내 동네 이름(읍/면/동)으로 검색"/>
            <MyLocationButton>
                <LocationImg src={Location} alt="Location" />
                &nbsp;&nbsp;&nbsp;&nbsp;현재 위치로 찾기
            </MyLocationButton>
            <PrintLocations>
                
            </PrintLocations>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    height: 500px;
`

const Input = styled.input`
    box-sizing: border-box;

    position: absolute;
    width: 375px;
    height: 57px;
    left: calc(50% - 375px/2 + 0.5px);
    top: 31px;

    background: #FFFFFF;
    border: 0.5px solid #DFA67B;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    font-family: 'Inter';
    font-style: normal;
	font-weight: 500;
	font-size: 17px;

    padding: 0px 15px 0px 15px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-family: 'Inter';
        color: #CAC4D0;
        font-size: 17px;
    }
`

const MyLocationButton = styled.button`
    position: absolute;
    width: 223px;
    height: 46px;
    left: calc(50% - 223px/2 + 0.5px);
    top: 112px;

    font-family: 'Inter';
    font-style: normal;
	font-weight: 700;
	font-size: 17px;

    padding: 0px 15px 0px 15px;

    background: #DFA67B;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: none;

    cursor: pointer;

    transition: transform 0.1s ease-in-out;
  
    &:active {
        transform: scale(0.95);
    }
`

const LocationImg = styled.img`
    position: absolute;
    width: 20px;
    height: 20px;
    left: 30px;
    top: 14px;
`

const PrintLocations = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    height: 325px;
    top: 185px;
`

export default SearchForm;