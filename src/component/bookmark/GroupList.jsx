import React, { useEffect, useState } from "react";
import styled                         from "styled-components";
import api                            from "../api/axios";
import { getUserIdFromToken }         from "../api/jwt";
import GroupItem                      from "./GroupItem";

function GroupList() {
    const [groupData, setGroupData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/bookmarks`);
                setGroupData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <ListWrapper>
            {groupData.map((group) => (
                <GroupItem key={group.bookmark_id} {...group} />
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