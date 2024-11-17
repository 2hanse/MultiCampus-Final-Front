import React    from "react";
import styled   from "styled-components";
import Meal     from "./assets/Meal.png";
import Talk     from "./assets/Talk.png";
import Top      from "./assets/Top.png";
import Travel   from "./assets/Travel.png";
import Bookmark from "./assets/Bookmark.png";
import { useNavigate } from "react-router-dom";


const BoardButtonForm = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <FoodBoard
                src={Meal}
                alt="Meal"
                onClick={() => navigate("/board/RestaurantBoard")}
            />
            <FreeBoard
                src={Talk}
                alt="Talk"
                onClick={() => navigate("/board/FreeBoard")}
            />
            <TopBoard
                src={Top}
                alt="Top"
                onClick={() => navigate("/board/TopBoard")}
                />
            <TravelBoard
                src={Travel}
                alt="Travel"
                onClick={() => navigate("/board/TourBoard")}
                />
            <BookmarkBoard
                src={Bookmark}
                alt="Bookmark"
                onClick={() => navigate("/homepage", { state: { openBookmarkSheet: true } })}
            />
            <FoodTitle onClick={() => navigate("/board/RestaurantBoard")}>식당</FoodTitle>
            <FreeTitle onClick={() => navigate("/board/FreeBoard")}>자유</FreeTitle>
            <TopTitle onClick={() => navigate("/board/TopBoard")}>상위</TopTitle>
            <TravleTitle onClick={() => navigate("/board/TourBoard")}>여행</TravleTitle>
            <BookmarkTitle onClick={() => navigate("/homepage", { state: { openBookmarkSheet: true } })}>북마크</BookmarkTitle>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100px;
    padding-top: 20px;
`;

const FoodBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 25px;

    cursor: pointer;
`;

const FreeBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 105px;

    cursor: pointer;
`;

const TopBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 185px;

    cursor: pointer;
`;

const TravelBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 265px;

    cursor: pointer;
`;

const BookmarkBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 345px;

    cursor: pointer;
`;

const FoodTitle = styled.h1`
    position: absolute;
    width: 60px;
    height: auto;
    top: 73px;
    left: 25px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ED6000;
    cursor: pointer;
`;

const FreeTitle = styled.h1`
    position: absolute;
    width: 60px;
    height: auto;
    top: 73px;
    left: 105px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ED6000;
    cursor: pointer;
`;

const TopTitle = styled.h1`
    position: absolute;
    width: 60px;
    height: auto;
    top: 73px;
    left: 185px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ED6000;
    cursor: pointer;
`;

const TravleTitle = styled.h1`
    position: absolute;
    width: 60px;
    height: auto;
    top: 73px;
    left: 265px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ED6000;
    cursor: pointer;
`;

const BookmarkTitle = styled.h1`
    position: absolute;
    width: 60px;
    height: auto;
    top: 73px;
    left: 345px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #ED6000;
    cursor: pointer;
`;

export default BoardButtonForm;