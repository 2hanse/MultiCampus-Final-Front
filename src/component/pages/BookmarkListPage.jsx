import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { getUserIdFromToken } from "../api/jwt";
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
    const [creatorId, setCreatorId] = useState(null); // 생성자의 user_id
    const [loggedInUserId, setLoggedInUserId] = useState(null); // 로그인한 유저의 user_id
    const [isEditing, setIsEditing] = useState(false);

    const isEditable = loggedInUserId === creatorId;

    useEffect(() => {
        const fetchLoggedInUserId = () => {
            const userId = getUserIdFromToken(); // 로그인한 유저 ID 가져오기
            console.log("Logged-in User ID: ", userId); // 확인용 로그
            setLoggedInUserId(userId);
        };

        const fetchBookmark = async () => {
            try {
                const response = await api.get(`/bookmarks/${bookmark_id}`);
                console.log("API Response: ", response.data);
                setBookmarkTitle(response.data.bookmark_title);
                setViewCount(response.data.view_count);
                setVisiblity(response.data.visibility);
                console.log("Bookmark Creator ID: ", response.data.user_id); // 확인용 로그
                setCreatorId(response.data.user_id); // 생성자의 user_id
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
        
        fetchLoggedInUserId();
        fetchBookmark();
        fetchBookmarkPlaceList();
        fetchSubscriberCount();
    }, [bookmark_id]);

    const deletePlace = async (bookmarkPlaceId) => {
        try {
            await api.delete(`bookmarks/place/${bookmarkPlaceId}`);
            setPlaceList((prevList) => prevList.filter((place) => place.bookmark_place_id !== bookmarkPlaceId));
            alert("해당 리스트가 삭제되었습니다.");
        } catch (error) {
            console.error("Error deleting place:", error);
            alert("삭제에 실패했습니다.");
        }
    };

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
                creatorId={creatorId} // 생성자의 user_id 전달
                loggedInUserId={loggedInUserId} // 로그인한 유저의 user_id 전달
                isEditing={isEditing} // 상태 전달
                setIsEditing={setIsEditing} // 상태 변경 함수 전달
            />
            <ContentWrapper>
                <ListWrapper>
                    {placeList.map((place) => (
                        <BookmarkListContent
                            key={place.place_id}
                            place={place}
                            isEditable={isEditable && isEditing}
                            onDelete={deletePlace}
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