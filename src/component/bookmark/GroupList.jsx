import React, { useEffect } from "react";
import styled               from "styled-components";
import { useNavigate }      from "react-router-dom";
import api                  from "../api/axios";
import GroupItem            from "./GroupItem";

function GroupList(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/bookmarks`);
                props.setGroupData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleClick = (bookmark_id) => {
        console.log("Bookmark Group Click");
        navigate(`/bookmarklistdetail/${bookmark_id}`);
    };

    return (
        <ListWrapper>
            {props.bookmarks.map((group) => (
                <GroupItem
                    key={group.bookmark_id}
                    {...{group, props}}
                    onClick={() => handleClick(group.bookmark_id)}
                />
            ))}
        </ListWrapper>
    );
}

const ListWrapper = styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0px 0px;
    list-style-type: none;
    align-items: center;
`;

export default GroupList;