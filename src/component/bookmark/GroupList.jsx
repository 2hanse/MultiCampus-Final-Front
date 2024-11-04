import React from "react";
import styled from "styled-components";
import GroupItem from "./GroupItem";

const groupData = [
    { name: "기본 그룹", author: "작성자명", count: "N", isActive: true },
    { name: "부산 여행", author: "작성자명", count: "N", isActive: true },
    { name: "제주 여행", author: "작성자명", count: "N", isActive: true },
];

function GroupList() {
    return (
    <ListWrapper>
        {groupData.map((group, index) => (
        <GroupItem key={index} {...group} />
        ))}
    </ListWrapper>
    );
}

const ListWrapper = styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 40px 0px;
    list-style-type: none;
`;

export default GroupList;