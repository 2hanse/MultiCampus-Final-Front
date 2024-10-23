import React from "react";
import styled from "styled-components";

const SearchForm = () => {
    return (
        <InputWrapper>
            <Input placeholder="내 동네 이름(읍/면/동)으로 검색"/>
        </InputWrapper>
    );
}

const InputWrapper = styled.div`
    width: 100%;
    height: 500px;
    transform: translateY(-14%);
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

// const MyLocationButton = styled.button`

// `

export default SearchForm;