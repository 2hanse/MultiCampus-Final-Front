import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import New    from "./assets/New.png";
import api    from "../api/axios";

const NewPostForm = () => {
    const navigate = useNavigate();
    const [recentPosts, setRecentPosts] = useState([]);
    const categoryMap = {
        top: "상위게시판",
        restaurant: "식당게시판",
        free: "자유게시판",
        tour: "여행게시판",
    };

    useEffect(() => {
        api.get("/boards/recent-posts")
        .then((res) => {
            console.log(res.data)
            setRecentPosts(res.data);
            console.log(recentPosts);
        })
    }, []);

    return (
        <Wrapper>
            <Title>최근 게시물</Title>
            <Icon src={New} alt="New" />
            <PostBox>
                <ListWrapper>
                    {recentPosts.length > 0 ? ( recentPosts.map((post, index) => (
                    <ItemWrapper key={index} onClick={() => navigate(`/board/PostPage/${post.board_id}`)}>
                        <PostCategory> {categoryMap[post.category]}</PostCategory>
                        &nbsp;&nbsp;&nbsp;&nbsp; 
                        <PostTitle>{post.title.length > 15 ? `${post.title.slice(0, 15)}...` : post.title}</PostTitle>
                    </ItemWrapper> )) ) : ( <NoItemWrapper><NoPost>등록된 게시글이 없습니다</NoPost></NoItemWrapper> )}
                </ListWrapper>
            </PostBox>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 430px;
    height: 266px;
    top: -15px;
    margin-bottom: 15px;
`

const Title = styled.h1`
    position: absolute;
    width: 227px;
    height: 43px;
    top: 2px;
    left: 28px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 23px;
    line-height: 29px;
    display: flex;
    align-items: center;

    color: #000000;
    cursor: default;
`

const Icon = styled.img`
    position: relative;
    width: 30px;
    height: 10.59px;
    left: 38%;
    top: 34px;
`

const PostBox = styled.div`
    position: absolute;
    width: 406px;
    height: 193px;
    left: calc(50% - 406px/2 - 2px);
    top: 65px;

    background: #FFFBFB;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
`

const ListWrapper = styled.ul`
    display: flex;
    position: absolute;
    width: 366px;
    height: 180px;
    top: -17px;
    padding-top: 18px;
    padding-left: 45px;
    flex-direction: column;
    list-style-type: none;
`;

const ItemWrapper = styled.li`
    position: relative;
    display: flex;
    height: 25px;
    width: 346px;
    left: -15px;
    margin-bottom: 8px;
    align-items: center;
    cursor: pointer;
`;

const PostCategory = styled.h3`
    color: #ED6000;
    letter-spacing: 0.5px;
    font: 18px/24px Roboto, sans-serif;
    margin: 0;
`;

const PostTitle = styled.span`
    color: #000000;
    font: 18px/24px Roboto, sans-serif;
`;

const NoItemWrapper = styled.li`
    position: relative;
    display: flex;
    height: 160px;
    width: 346px;
    left: -11px;
    align-items: center;
    justify-content: center;
`;

const NoPost = styled.h4`
    position: absolute;
    display: flex;
    color: #757575;
    font: 16px/24px Roboto, sans-serif;
`

export default NewPostForm;