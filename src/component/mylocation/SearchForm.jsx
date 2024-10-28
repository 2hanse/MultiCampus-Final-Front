import React, { useState }  from "react";
import styled from "styled-components";
import axios from "axios";
import Location from "./assets/Location.png";

const SearchForm = (address) => {

    fetch('/api/save-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: address }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setInputValue(query);

        if (query.length > 1) { // 검색어가 2글자 이상일 때만 자동 완성
            try {
            const response = await axios.get(
                `https://dapi.kakao.com/v2/local/search/address.json`,
                {
                params: { query },
                headers: {
                    Authorization: `3a1e207cd7206916654c5fa136b2d388`
                }
                }
            );

            // 검색 결과를 가져와 suggestions에 저장
            const addresses = response.data.documents.map(doc => doc.address_name);
            setSuggestions(addresses);
            } catch (error) {
            console.error("주소 검색 실패:", error);
            }
        } else {
            setSuggestions([]); // 입력이 짧아지면 목록 초기화
        }
    };

    return (
        <Wrapper>
            <TopWrapper>
                <Input type="text"
                       value={inputValue}
                       onChange={handleInputChange}
                       placeholder="내 동네 이름(읍/면/동)으로 검색"/>
                <MyLocationBtn>
                    <LocationImg src={Location} alt="Location" />
                    &nbsp;&nbsp;&nbsp;&nbsp;현재 위치로 찾기
                </MyLocationBtn>
            </TopWrapper>
            <PrintLocations>
                {suggestions.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0' }}>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                        {suggestion}
                        </li>
                    ))}
                    </ul>
                )}
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

const TopWrapper = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    height: 180px;

    background-color: #FFF4D2;
    z-index: 5;
`

const Input = styled.input`
    box-sizing: border-box;

    position: fixed;
    width: 375px;
    height: 57px;
    left: calc(50% - 375px/2 + 0.5px);
    top: 145px;

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

const MyLocationBtn = styled.button`
    position: fixed;
    width: 223px;
    height: 46px;
    left: calc(50% - 223px/2 + 0.5px);
    top: 225px;

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
    width: 420px;
    height: 500px;
    top: 180px;
    left: 5px;
    padding-bottom: 300px;
`

export default SearchForm;