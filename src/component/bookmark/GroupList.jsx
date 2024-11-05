import React     from "react";
import styled    from "styled-components";
import GroupItem from "./GroupItem";

export const groupData = [
    { name: "기본 그룹", author: "작성자명", count: "N", isActive: false },
];

function GroupList({ groupData }) {
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
    overflow-y: auto;
    align-items: center;
`;

export default GroupList;