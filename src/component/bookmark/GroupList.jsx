import React, { useEffect, useState } from "react";
import styled                         from "styled-components";
import api                            from "../api/axios";
import { getUserIdFromToken }         from "../api/jwt";
import GroupItem                      from "./GroupItem";

function GroupList(props) {

    return (
        <ListWrapper>
            {props.bookmarks.map((group) => (
                <GroupItem key={group.bookmark_id} {...{group, props}} />
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