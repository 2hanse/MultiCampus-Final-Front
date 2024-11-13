import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import api from "../api/axios";
import BookmarkList from "../bookmark/group-list/BookmarkList";

function BookmarkListPage() {
    const { bookmark_id } = useParams();
    const [bookmarkTitle, setBookmarkTitle] = useState("");

    useEffect(() => {
        const fetchBookmark = async () => {
            try {
                const response = await api.get(`/bookmarks/${bookmark_id}`);
                console.log("API Response:", response.data);
                console.log(response.data.bookmark_title);
                setBookmarkTitle(response.data.bookmark_title);
            } catch (error) {
                console.error("Error fetching bookmark: ", error);
            }
        };
        
        fetchBookmark();
    }, [bookmark_id]);

    return (
        <Main>
            <BookmarkList bookmarkTitle={bookmarkTitle} />
        </Main>
    );
};

const Main = styled.main`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    height: 932px;
    background: #FFFFFF;
    margin: 0 auto;
    border: 0.5px solid #CAC4D0;
`;

export default BookmarkListPage;