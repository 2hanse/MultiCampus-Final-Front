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
            <FoodBoard     src={Meal}     alt="Meal" />
            <TalkBoard     src={Talk}     alt="Talk" />
            <TopBoard      src={Top}      alt="Top" />
            <TravelBoard   src={Travel}   alt="Travel" />
            <BookmarkBoard
                src={Bookmark}
                alt="Bookmark"
                onClick={() => navigate("/", { state: { openBookmarkSheet: true } })}
            />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    height: 60px;
    margin: auto 0;
    padding: 35px 0px 35px 0px;
`;

const FoodBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 25px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

const TalkBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 105px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

const TopBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 185px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

const TravelBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 265px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

const BookmarkBoard = styled.img`
    position: absolute;
    width: 60px;
    height: 60px;
    left: 345px;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    cursor: pointer;
`

export default BoardButtonForm;