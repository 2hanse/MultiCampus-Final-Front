import React from "react";
import styled from "styled-components";
import Edit   from "../assets/Edit.png";
import Delete from "../assets/Delete.png";

function BookmarkListContent(props) {
    const handleDelete = () => {
        props.onDelete(props.place.place_id); // 상위에서 전달된 삭제 함수 호출
    };

    return (
        <Container>
            <Info>
                <Name>{props.place.place_info.placeName || "Loading..."}</Name>
                <Details>{props.place.place_info.placeAddress || "Loading..."}</Details>
                {props.isEditable && (
                    <>
                        <EditBtn>
                            <Icon src={Edit} alt="Edit" />
                        </EditBtn>
                        <DeleteBtn onClick={handleDelete}>
                            <Icon src={Delete} alt="Delete" />
                        </DeleteBtn>
                    </>
                )}
            </Info>
        </Container>
    );
}

const Container = styled.li`
    position: relative;
    display: flex;
    height: 100px;
    width: 370px;
    padding: 3px 0px 0px 30px;
    margin: 0 auto 15px auto;
    align-items: center;
    background-color: #FFFFFF;
    border-bottom: 0.1px solid #CAC4D0;
    cursor: pointer;

    &:last-child {
    border-bottom: none;
`;

const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 5px;
`;

const Name = styled.h3`
    color: #1D1B20;
    letter-spacing: 0.5px;
    font: 16px/24px Roboto, sans-serif;
    margin: 0;
`;

const Details = styled.p`
    color: #49454F;
    letter-spacing: 0.25px;
    font: 14px/20px Roboto, sans-serif;
`;

const EditBtn = styled.button`
    display: flex;
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;

    top: 22px;
    right: 53px;
    background: none;
    border: none;

    cursor: pointer;

    &:hover {
        background: #CAC4D0;
        border-radius: 5px;
    }
`;

const DeleteBtn = styled.button`
    display: flex;
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;

    top: 22px;
    right: 15px;
    background: none;
    border: none;

    cursor: pointer;

    &:hover {
        background: #CAC4D0;
        border-radius: 5px;
    }
`;

const Icon = styled.img`
    width: 15px;
    height: 15px;
`;

const IconWrapper = styled.div`
    background-color: rgba(253, 247, 255, 0.08);
    align-self: start;
    z-index: 10;
    display: flex;
    min-height: 48px;
    justify-content: center;
    margin: -64px 0 0 10px;
`;

const RestaurantIcon = styled.img`
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
    align-self: stretch;
    margin: auto 0;
    padding: 12px 16px;
`;

export default BookmarkListContent;