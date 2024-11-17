import React, { useState }    from "react";
import styled   from "styled-components";
import Bookmark from "./assets/Bookmark.png";
import Search   from "./assets/Search.png";

const {kakao} = window;

const Header = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = async (e) => {
        const term = e.target.value;

        if (!term.replace(/^\s+|\s+$/g, '')) {
            setSearchResults([]);
            setSearchTerm(term);
            return;
        }

        if (term.trim() === "") {
            setSearchResults([]);
            setSearchTerm(term);
            return;
        }

        setSearchTerm(term);

        const ps = new kakao.maps.services.Places();  
        ps.keywordSearch(term, placesSearchCB);
    };

    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            console.log(data);
            setSearchResults(data);
            const bounds = new kakao.maps.LatLngBounds()

            for (var i = 0; i < data.length; i++) {
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            props.map.setBounds(bounds)
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            setSearchResults([]);
            return;
    
        } else if (status === kakao.maps.services.Status.ERROR) {
            setSearchResults([]);
            return;
        }
    }

    const handlePlaceClick = (place) => {
        setSearchTerm(""); // 검색 창 비우기
        setSearchResults([]); // 검색 결과 닫기
        props.onSearchedPlaceClick(place); // 부모 컴포넌트로 선택된 장소 전달
    };

    return (
        <HeaderBox>
            <Input
                placeholder="위치 검색"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <BookmarkBtn onClick={props.onClickBookmark}>
                <img src={Bookmark}
                     alt='Bookmark'
                     style={{height: '20px'}} />
            </BookmarkBtn>
            <SearchBtn>
                <img src={Search}
                     alt='Search'
                     style={{height: '24px'}} />
            </SearchBtn>
            {searchResults.length > 0 && (
                <Dropdown>
                    {searchResults.map((place) => (
                        <DropdownItem
                            key={place.id}
                            onClick={() => handlePlaceClick(place)}
                        >
                            {place.place_name}
                        </DropdownItem>
                    ))}
                </Dropdown>
            )}
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

const Dropdown = styled.ul`
    position: absolute;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
    width: 375px;
    max-height: 200px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow-y: auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 8px 0;
    margin: 0;
    z-index: 100;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const DropdownItem = styled.li`
    padding: 10px 16px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f7f7f7;
    }
`;

export default Header;