import React  from "react";
import styled from "styled-components";
import Fire   from "./assets/Fire.png";

const HotPostForm = () => {
    return (
        <Wrapper>
            <Title>오늘의 HOT 게시물</Title>
            <Icon src={Fire} alt="Fire" />
            <PostBox>

            </PostBox>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 430px;
    height: 266px;
    top: 100px;
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
    height: 173px;
    left: calc(50% - 406px/2 - 2px);
    top: 70px;

    background: #FFFBFB;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
`

export default HotPostForm;