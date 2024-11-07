import React, { useState }               from "react";
import styled                            from "styled-components";
import { useNavigate }                   from "react-router-dom";
import Dropdown                          from "./Dropdown";
import Edit                              from "./assets/Edit.png";
import GroupList                         from "./GroupList";
import { groupData as initialGroupData } from "./GroupList";
import Create                            from "./assets/Create.png";

const BookmarkList = ({ onOpenCreate }) => {
    const [groupData, setGroupData] = useState(initialGroupData);
    const navigate                  = useNavigate();

    // 이름순 정렬 함수
    const sortByName = () => {
        const sortedData = [...groupData].sort((a, b) => a.name.localeCompare(b.name, "ko"));
        setGroupData(sortedData);
    };

    // 등록순 (초기 상태) 함수
    const resetToOriginal = () => {
        setGroupData(initialGroupData);
    };

    return (
        <Wrapper>
            <GroupCount>그룹 {groupData.length}</GroupCount>
            <Dropdown onSelect={(option) => (option === "이름순" ? sortByName() : resetToOriginal())} />
            <CreateBtn onClick={onOpenCreate}>
                <CreateImg src={Create} alt="Create" />
            </CreateBtn>
            <EditBtn onClick={() => navigate("/homepage/editBookmark")}>
                <Icon src={Edit} alt="Edit" />
                편집하기
            </EditBtn>
            <GroupList groupData={groupData} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    position: absolute;
    width: 390px;
    height: 610px;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
`

const GroupCount = styled.h1`
    position: absolute;
    width: 49px;
    height: 16px;
    left: 31px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 100%;

    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
`

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

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
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

export default BookmarkList;