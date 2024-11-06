import React, { useState } from "react";
import styled              from "styled-components";

const CreateBookmark = ({ onCancel }) => {
    const [isPublished, setIsPublished] = useState(false);

    return (
        <Wrapper>
            <Title>새 그룹 추가</Title>
            <CancelBtn onClick={onCancel}>취소</CancelBtn>
            <Text>공개 허용</Text>
            <PublishBtn isPublished={isPublished}
                        onClick={() => setIsPublished(true)}>
                공개
            </PublishBtn>
            <UnPublishBtn isPublished={isPublished}
                          onClick={() => setIsPublished(false)}>
                비공개
            </UnPublishBtn>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    width: 390px;
    height: 610px;
    margin: 0 auto;
`

const CancelBtn = styled.button`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    top: -55px;
    right: -5px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;

    background: none;
    border: none;
    cursor: pointer;
    color: #ED6000;
`;

const Title = styled.h1`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: -51px;
    left: 50%;
    transform: translateX(-50%);

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 100%;

    background-color: #FFFFFF;
    cursor: pointer;
    color: #000000;
`

const Text = styled.h1`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 10px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;

    background: none;
    color: #000000;
`

const PublishBtn = styled.button`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 40px;
    top: 10px;
    right: 130px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;

    background-color: ${(props) => (props.isPublished ? "#ED6000" : "#FFFFFF")};
    color: ${(props) => (props.isPublished ? "#FFFFFF" : "#ED6000")};
    border: 1px solid #F4B183;
    border-radius: 30px;
    cursor: pointer;
`

const UnPublishBtn = styled.button`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 40px;
    top: 10px;
    right: 0px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;

    background-color: ${(props) => (props.isPublished ? "#FFFFFF" : "#ED6000")};
    color: ${(props) => (props.isPublished ? "#ED6000" : "#FFFFFF")};
    border: 1px solid #F4B183;
    border-radius: 30px;
    cursor: pointer;
`

export default CreateBookmark;