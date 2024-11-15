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
            <TalkBoard
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
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: center;
    align-items: flex-start;
    width: 100%;
    height: 95px;
    margin: auto 0;
    padding: 35px 0px 35px 0px;
`;

const FoodBoard = styled.img`
    position: relative;
    width: 60px;
    height: 60px;
    left: 25px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

const TalkBoard = styled.img`
    position: relative;
    width: 60px;
    height: 60px;
    left: 45px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

const TopBoard = styled.img`
    position: relative;
    width: 60px;
    height: 60px;
    left: 65px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

const TravelBoard = styled.img`
    position: relative;
    width: 60px;
    height: 60px;
    left: 85px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

const BookmarkBoard = styled.img`
    position: relative;
    width: 60px;
    height: 60px;
    left: 105px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

export default BoardButtonForm;