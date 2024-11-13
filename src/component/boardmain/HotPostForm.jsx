import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Fire   from "./assets/Fire.png";
import api    from "../api/axios";

const HotPostForm = () => {
    const [hotPosts, setHotPosts] = useState([]);

    useEffect(() => {
        api.get("/boards/hot-posts")
        .then((res) => {
            console.log(res.data)
            setHotPosts(res.data);
            console.log(hotPosts);
        })
    }, []);

    return (
        <Wrapper>
            <Title>오늘의 HOT 게시물</Title>
            <Icon src={Fire} alt="Fire" />
            <PostBox>
                <ListWrapper>
                    {hotPosts.length > 0 ? ( hotPosts.map((post, index) => (
                    <ItemWrapper key={index}>
                        <PostCategory>{post.category}</PostCategory>
                        &nbsp;&nbsp;&nbsp;&nbsp; 
                        <PostTitle>{post.title.length > 10 ? `${post.title.slice(0, 10)}...` : post.title}</PostTitle>
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
    top: 105px;
`

const Title = styled.h1`
    position: absolute;
    width: 227px;
    height: 43px;
    left: 28px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24.32px;
    line-height: 29px;
    display: flex;
    align-items: center;

    color: #000000;
    cursor: default;
`

const Icon = styled.img`
    position: absolute;
    width: 25px;
    height: 25px;
    left: 58%;
    top: 25px;
`

const PostBox = styled.div`
    position: absolute;
    width: 406px;
    height: 193px;
    left: calc(50% - 406px/2 - 2px);
    top: 70px;

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
    padding-top: 15px;
    flex-direction: column;
    list-style-type: none;
`;

const ItemWrapper = styled.li`
    position: relative;
    display: flex;
    height: 30px;
    width: 346px;
    left: -15px;
    margin-bottom: 3px;
    align-items: center;
`;

const PostCategory = styled.h3`
    color: #757575;
    letter-spacing: 0.5px;
    font: 18px/24px Roboto, sans-serif;
    margin: 0;
    cursor: default;
`;

const PostTitle = styled.span`
    color: #000000;
    font: 18px/24px Roboto, sans-serif;
    cursor: pointer;
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

export default HotPostForm;