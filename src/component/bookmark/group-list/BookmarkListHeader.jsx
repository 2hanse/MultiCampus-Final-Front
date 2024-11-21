import React, { useState }    from "react";
// import api                    from "../api/axios";
// import { getUserIdFromToken } from "../api/jwt";
import styled 				  from "styled-components";
import { useNavigate } 		  from "react-router-dom";
import Dropdown 			  from "./Dropdown";

function BookmarkListHeader({ bookmarkTitle, viewCount, subscriber, visibility, placeCount, creatorId, loggedInUserId, onSortOptionSelect, isEditing, setIsEditing, isSubscribed, updateSubscribe }) {
	const navigate = useNavigate();

	return (
		<BookmarkContainer>
			<BackIcon
				loading="lazy"
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=a4eaf54e67064b758783ed5c744d50de"
				alt="Bookmark icon"
				onClick={() => navigate("/homepage", { state: { openBookmarkSheet: true } })}
			/>
			<BookmarkTitle>{bookmarkTitle || "Loading..."}</BookmarkTitle>
			<BookmarkStats>구독&nbsp;<ColoredText>{subscriber}</ColoredText>&nbsp;| 조회&nbsp;<ColoredText>{viewCount || "-"}</ColoredText>&nbsp;|&nbsp;<ColoredText>{visibility ? "공개" : "비공개"}</ColoredText></BookmarkStats>
			<TotalCount>전체&nbsp;<ColoredText>{placeCount}</ColoredText></TotalCount>
			<Dropdown onSelect={onSortOptionSelect} />
			{loggedInUserId === creatorId ? (
                <EditBtn
					isEditing={isEditing}
					onClick={() => setIsEditing(!isEditing)}
				>
                    {isEditing ? "완료" : "편집"}
                </EditBtn>
            ): (
				<SubscribeBtn
					isSubscribed={isSubscribed}
					onClick={() => updateSubscribe(!isSubscribed)}
				>
                    {isSubscribed ? "구독중" : "구독"}
                </SubscribeBtn>
			)}
		</BookmarkContainer>
	);
}

const BookmarkContainer = styled.main`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 430px;
	height: 233px;
	margin: 0 auto;
	border-bottom: 0.5px solid #CAC4D0;
`;

const BackIcon = styled.img`
	display: flex;
	position: absolute;
	width: 24px;
	height: 24px;
	left: 28px;
	top: 62px;
	cursor: pointer;
`;

const BookmarkTitle = styled.h1`
	position: absolute;
	width: auto;
	height: 38px;
	left: 50%;
	top: 66px;
	transform: translateX(-50%);

	font-family: 'sans-serif';
	font-style: normal;
	font-weight: 600;
	font-size: 21px;
	line-height: 100%;

	display: flex;
	align-items: center;
	text-align: center;

	color: #000000;
`;

const BookmarkStats = styled.p`
	position: absolute;
	width: autopx;
	height: 30px;
	left: 50%;
	top: 115px;
	transform: translateX(-50%);

	font-family: 'sans-serif';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 100%;

	display: flex;
	align-items: center;
	text-align: center;

	color: #79747E;
`;

const TotalCount = styled.h3`
	position: absolute;
	width: auto;
	height: 22px;
	left: 36px;
	top: 185px;

	font-family: 'sans-serif';
	font-style: normal;
	font-weight: 400;
	font-size: 13px;
	line-height: 100%;

	display: flex;
	align-items: center;
	text-align: center;

	color: #000000;

	cursor: default;
`;

const ColoredText = styled.span`
	color: #ED6000;
	cursor: default;
`;

const EditBtn = styled.button`
	display: flex;
	flex-direction: center;
	justify-content: center;
	align-items: center;
	padding: 12px;
	gap: 8px;

	position: absolute;
	width: 54px;
	height: 19px;
	top: 197px;
	right: 15px;

	font-family: 'sans-serif';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 100%;
	

	background: ${(props) => (props.isEditing ? "#ED6000" : "#F5F5F5")};
	color: ${(props) => (props.isEditing ? "#FFFFFF" : "#000000")};
	border-radius: 5.5px;
	border: 0.05px solid ${(props) => (props.isEditing ? "#ED6000" : "#CAC4D0")};

	cursor: pointer;
	transition: all 0.2s;

	${(props) =>
		!props.isEditing &&
		`&:hover {
		background: #ED6000;
		color: #FFFFFF;
		border: 0.05px solid #ED6000;
	}`}
`;

const SubscribeBtn = styled.button`
	display: flex;
	flex-direction: center;
	justify-content: center;
	align-items: center;
	padding: 12px;
	gap: 8px;

	position: absolute;
	width: 60px;
	height: 19px;
	top: 197px;
	right: 15px;

	font-family: 'sans-serif';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 100%;
	

	background: ${(props) => (props.isSubscribed ? "#F5F5F5" : "#ED6000")};
	color: ${(props) => (props.isSubscribed ? "#000000" : "#FFFFFF")};
	border-radius: 5.5px;
	border: 0.05px solid ${(props) => (props.isSubscribed ? "#CAC4D0" : "#ED6000")};

	cursor: pointer;
	transition: all 0.2s;
`;

export default BookmarkListHeader;