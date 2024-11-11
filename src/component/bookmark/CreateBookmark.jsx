import React, { useState } from "react";
import styled              from "styled-components";
import api from "../api/axios";

const CreateBookmark = ({ onCancel }) => {
    const [isPublished, setIsPublished] = useState(false);
    const [groupName, setGroupName] = useState("");  // InputName의 상태 추가

    // Input 값 변경 시 호출되는 함수
    const handleInputChange = (e) => {
        setGroupName(e.target.value);
    };

    const onComplete = () => {
        api.post('/bookmarks', {bookmark_title: groupName, visibility: isPublished}).then(
            (res) => {
                if (res.status == 200) {
                    onCancel();
                }
            }
        ).catch(
            (err) => {
                alert("북마크를 생성하는중 알 수 없는 에러가 발생했습니다: " + err);
            }
        );
    };

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
            <Warning>
                ※ 그룹 공개 시 다른 사용자가 볼 수 있고 구독 할 수 있으니 민감 정보가 노출되지 않도록 주의해주세요.
            </Warning>
            <InputName placeholder="그룹명을 입력하세요"
                       value={groupName}
                       onChange={handleInputChange} />
            {/* <IconSelect>아이콘 선택</IconSelect> */}
            <CompleteBtn disabled={!groupName} onClick={() => onComplete()}>완료</CompleteBtn>
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
    font-size: 16px;
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
    font-size: 16px;
    line-height: 100%;

    background-color: ${(props) => (props.isPublished ? "#FFFFFF" : "#ED6000")};
    color: ${(props) => (props.isPublished ? "#ED6000" : "#FFFFFF")};
    border: 1px solid #F4B183;
    border-radius: 30px;
    cursor: pointer;
`

const Warning = styled.h3`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 50px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;

    background: none;
    color: #ED6000;
`

const InputName = styled.input`
    box-sizing: border-box;

    position: absolute;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 55px;
    top: 130px;

    background: #FFFFFF;
    border: 0.7px solid #DFA67B;
    border-radius: 10px;

    font-family: 'sans-serif';
    font-style: normal;
	font-weight: 400;
	font-size: 16px;
    color: #ED6000;

    padding: 0px 20px 0px 20px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-family: 'sans-serif';
        color: #F4B183;
        font-size: 16px;
    }
`

const IconSelect = styled.h1`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 200px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;

    background: none;
    color: #000000;
`

const CompleteBtn = styled.button`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 55px;
    top: 380px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;

    background-color:  ${(props) => (props.disabled ? "#E1E1E3" : "#ED6000")};
    color:  ${(props) => (props.disabled ? "#A7A7A7" : "#FFFFFF")};
    border: none;
    border-radius: 10px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`

export default CreateBookmark;