import React, { useEffect, useState } from "react";
import styled              from "styled-components";
import { useNavigate }     from "react-router-dom";
import Dropdown            from "./Dropdown";
import Edit                from "./assets/Edit.png";
import GroupList           from "./GroupList";
import Create              from "./assets/Create.png";

const BookmarkList = (props) => {
    const navigate                  = useNavigate();
    const [sortedBookmarks, setSortedBookmarks] = useState([]);

    // 이름순 정렬 함수
    const sortByName = () => {
        const sortedData = [...props.bookmarks].sort((a, b) => a.bookmark_title.localeCompare(b.name, "ko"));
        setSortedBookmarks(sortedData);
    };

    // 등록순 (초기 상태) 함수
    const resetToOriginal = () => {
        setSortedBookmarks([]);
    };

    return (
        <Wrapper>
            <GroupCount>그룹&nbsp;<ColoredText>{props.bookmarks.length}</ColoredText></GroupCount>
            <Dropdown onSelect={(option) => (option === "이름순" ? sortByName() : resetToOriginal())} />
            <CreateBtn onClick={props.onOpenCreate}>
                <CreateImg src={Create} alt="Create" />
            </CreateBtn>
            <EditBtn onClick={() => navigate("/editbookmark")}>
                <Icon src={Edit} alt="Edit" />
                편집하기
            </EditBtn>
            <GroupListContainer>
                <GroupList  bookmarks={sortedBookmarks.length ? sortedBookmarks : props.bookmarks} 
                        fetchPlaces={props.fetchPlaces}
                        fetchBookmarks={props.fetchBookmarks} />
            </GroupListContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    width: 390px;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
`

const GroupCount = styled.h1`
    position: absolute;
    width: 49px;
    height: 16px;
    left: 31px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;

    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
`

const ColoredText = styled.span`
  color: #ED6000;
`;

const EditBtn = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px;
    gap: 6px;

    border: none;
    background-color: #fff;
    cursor: pointer;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;

    position: absolute;
    width: 100px;
    height: 34.7px;
    left: 278px;
`

const Icon = styled.img`
    width: 15px;
    height: 15px;
`;

const CreateBtn = styled.button`
    display: flex;
    position: absolute;
    width: 25px;
    height: 25px;
    top: 6px;
    left: 245px;
    border: none;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
    cursor: pointer;
`;

const CreateImg = styled.img`
    width: 20px;
    height: 20px;
`

const GroupListContainer = styled.div`
    width: 100%;
    height: calc(100vh - 200px);
    margin-top: 40px;
    box-sizing: border-box;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`

export default BookmarkList;