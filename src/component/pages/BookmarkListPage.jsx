import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import api from "../api/axios";
import BookmarkListHeader from "../bookmark/group-list/BookmarkListHeader";
import BookmarkListContent from "../bookmark/group-list/BookmarkListContent";

function BookmarkListPage() {
    const { bookmark_id } = useParams();
    const [bookmarkTitle, setBookmarkTitle] = useState("");
    const [viewCount, setViewCount] = useState(0);
    const [visibility, setVisiblity] = useState();
    const [placeList, setPlaceList] = useState([]);
    const [subscriber, setSubscriber] = useState(0);

    useEffect(() => {
        const fetchBookmark = async () => {
            try {
                const response = await api.get(`/bookmarks/${bookmark_id}`);
                console.log("API Response: ", response.data);
                setBookmarkTitle(response.data.bookmark_title);
                setViewCount(response.data.view_count);
                setVisiblity(response.data.visibility);
            } catch(error) {
                console.error("Error fetching bookmark: ", error);
            }
        };

        const fetchBookmarkPlaceList = async () => {
            try {
                const response = await api.get(`/bookmarks/place/${bookmark_id}`);
                console.log("Place API Response: ", response.data);
                setPlaceList(response.data);
            } catch(error) {
                console.error("Error fetching bookmark place info: ", error);
            }
        };

        const fetchSubscriberCount = async () => {
            try {
                const response = await api.get(`/bookmarks/subscriptions/${bookmark_id}`);
                console.log("Subscriptions API Response: ", response.data);
                setSubscriber(response.data);
            } catch(error) {
                console.error("Error fetching Subscriber Count: ", error);
            }
        };
        
        fetchBookmark();
        fetchBookmarkPlaceList();
        fetchSubscriberCount();
    }, [bookmark_id]);

    // 정렬 함수
    const sortByName = () => {
        const sortedData = [...placeList].sort((a, b) => a.place_info.placeName.localeCompare(b.place_info.placeName, "ko"));
        setPlaceList(sortedData);
    };

    const resetToOriginal = async () => {
        try {
            const response = await api.get(`/bookmarks/place/${bookmark_id}`);
            setPlaceList(response.data);
        } catch (error) {
            console.error("Error resetting to original order: ", error);
        }
    };

    return (
        <Main>
            <BookmarkListHeader
                bookmarkTitle={bookmarkTitle}
                viewCount={viewCount}
                subscriber={subscriber}
                visibility={visibility}
                placeCount={placeList.length}
                onSortOptionSelect={(option) => option === "이름순" ? sortByName() : resetToOriginal()}
            />
            <ContentWrapper>
                <ListWrapper>
                    {placeList.map((place) => (
                        <BookmarkListContent
                            key={place.place_id}
                            place={place}
                        />
                    ))}
                </ListWrapper>
            </ContentWrapper>
        </Main>
    );
};

const Main = styled.main`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    background: #FFFFFF;
    margin: 0 auto;
    border: 0.5px solid #CAC4D0;
`;

const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 235px);
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    margin-top: 235px;

    -ms-overflow-style: none;  /* IE 및 Edge */
    scrollbar-width: none;  /* Firefox */
`

const ListWrapper = styled.ul`
    display: flex;
    width: 430px;
    flex-direction: column;
    align-items: center;
    list-style-type: none;
    padding: 0px;
`;

export default BookmarkListPage;