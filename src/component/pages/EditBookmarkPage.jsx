import React           from "react";
import styled          from "styled-components";
import { useNavigate } from "react-router-dom";
import Back            from "../mylocation/assets/Back.png";

const EditBookmarkPage = ({ name, author, count }) => {
    const navigate = useNavigate();

    return (
        <Main>
            <HeaderBox>
                <BackPage src={Back} alt="Back" onClick={() => navigate("/homepage", { state: { openBookmarkSheet: true } })} />
                <Title>그룹 목록 편집</Title>
            </HeaderBox>
            <Warning>
                ※ 삭제된 그룹은 복구가 불가합니다.
            </Warning>
            <Content>
                <ItemWrapper>
                    <ItemContent>
                        <GroupName>
                            {name} <AuthorName>({author})</AuthorName>
                        </GroupName>
                        <GroupCount>개수 {count}/500</GroupCount>
                    </ItemContent>
                </ItemWrapper>
            </Content>
        </Main>
    );
};

const Main = styled.main`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    height: 932px;
    background: #FFFFFF;
    margin: 0 auto;
    border: 0.5px solid #CAC4D0;
`;

const HeaderBox = styled.header`
    position: fixed;
    transform: translateX(-50%);
    max-width: 430px;
    width: 100%;
    height: 119px;
    left: 50%;
    top: 0px;
    background-color: #FFFFFF;
    border: 0.5px solid #CAC4D0;
    z-index: 10;
`;

const BackPage = styled.img`
    position: absolute;
    width: 24px;
    height: 24px;
    left: 28px;
    top: 62px;

    cursor: pointer;
`

const Title = styled.h1`
    position: absolute;
    width: 150px;
    height: 10px;
    left: calc(50% - 105px/2);
    top: 70px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;

    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
`

const Content = styled.div`
    display: flex;
    position: absolute;
    width: 410px;
    height: 730px;
    margin-top: 160px;
    padding: 10px;

    background-color: grey;
`

const Warning = styled.h3`
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    margin: 130px 0px 10px 20px;

    font-family: 'sans-serif';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;

    background: none;
    color: #ED6000;
`

const ItemWrapper = styled.li`
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    display: flex;
    min-height: 60px;
    width: 340px;
    padding: 16px 16px 16px 30px;
    margin-bottom: 15px;
    align-items: center;
`;

const ItemContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const GroupName = styled.h3`
    color: #757575;
    letter-spacing: 0.5px;
    font: 16px/24px Roboto, sans-serif;
    margin: 0;
`;

const AuthorName = styled.span`
    color: #757575;
`;

const GroupCount = styled.p`
    color: var(--M3-sys-light-on-surface-variant, #49454f);
    letter-spacing: 0.25px;
    font: 14px/20px Roboto, sans-serif;
    margin: 4px 0 0;
`;

export default EditBookmarkPage;