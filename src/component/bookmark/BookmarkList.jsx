import React    from "react";
import styled   from "styled-components";
import Dropdown from "./Dropdown";
import Edit     from "./assets/Edit.png";
import GroupList from "./GroupList";

const BookmarkList = () => {
    return (
        <Wrapper>
            <GroupCount>그룹 N</GroupCount>
            <Dropdown />
            <EditBtn>
                <Icon src={Edit} alt="Edit" />
                수정하기
            </EditBtn>
            <GroupList>

            </GroupList>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    position: absoulte;
    width: 390px;
    height: 610px;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
`

const GroupCount = styled.h1`
    position: absolute;
    width: 49px;
    height: 19px;
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

export default BookmarkList;