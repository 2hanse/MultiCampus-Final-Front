import React, { useEffect, useState } from "react";
import styled                         from "styled-components";
import api                            from "../api/axios";
import { getUserIdFromToken }         from "../api/jwt";
import { useNavigate }                from "react-router-dom";
import { Sheet }                      from 'react-modal-sheet';
import Back                           from "../mylocation/assets/Back.png";
import Edit                           from "../bookmark/assets/Edit.png";
import Delete                         from "../bookmark/assets/Delete.png";
import EditBookmark                   from "../bookmark/edit/EditBookmark";

const EditBookmarkPage = () => {
    const navigate                  = useNavigate();
    const [isEditOpen, setEditOpen] = useState(false);
    const [groupData, setGroupData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/bookmarks`);
                setGroupData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = () => {
        alert("북마크 그룹을 삭제하였습니다.");
    };

    return (
        <Main>
            <HeaderBox>
                <BackPage src={Back} alt="Back" onClick={() => navigate("/", { state: { openBookmarkSheet: true } })} />
                <Title>그룹 목록 편집</Title>
            </HeaderBox>
            <Warning>
                ※ 삭제된 그룹은 복구가 불가합니다.
            </Warning>
            <Content groupData={groupData}>
                <ListWrapper >
                    {groupData.map((group, index) => (
                        <ItemWrapper key={index} {...group} >
                            <ItemContent>
                                <GroupName>
                                    {group.bookmark_title} <AuthorName>({group.user_nickname})</AuthorName>
                                </GroupName>
                                <GroupCount>개수 {group.list_count}/500</GroupCount>
                            </ItemContent>
                            <EditBtn onClick={() => setEditOpen(true)}>
                                <Icon src={Edit} alt="Edit" />
                            </EditBtn>
                            <DeleteBtn onClick={handleDeleteClick}>
                                <Icon src={Delete} alt="Delete" />
                            </DeleteBtn>
                        </ItemWrapper>
                    ))}
                </ListWrapper>
            </Content>
            <CustomSheet isOpen={isEditOpen}
                         onClose={() => {
                            setEditOpen(true);
                         }}
                         snapPoints={[500, 500, 0]} initialSnap={1}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <EditBookmark onCancel={() => {
                                            setEditOpen(false);
                                        }} />
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onClick={() => {
                                    setEditOpen(false)
                                }} />
            </CustomSheet>
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
    margin-top: 150px;
    padding: 10px;
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

const ListWrapper = styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0px 0px;
    list-style-type: none;
    overflow-y: auto;
    align-items: center;
`;

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

const EditBtn = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6px;

    border: none;
    background-color: #fff;
    cursor: pointer;

    position: absolute;
    width: 30px;
    height: 30px;
    right: 65px;
`

const DeleteBtn = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6px;

    border: none;
    background-color: #fff;
    cursor: pointer;

    position: absolute;
    width: 30px;
    height: 30px;
    right: 25px;
`

const Icon = styled.img`
    width: 15px;
    height: 15px;
`;

const CustomSheet = styled(Sheet)`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    margin-bottom: 10px;
    max-width: 430px;
    z-index: 5;

    /* sheet 라이브러리 css 덮어 쓰려면 !important 끝에 들어가야합니다 */
    .react-modal-sheet-backdrop {
        position: absolute !important;
        width: 430px !important;
        margin-bottom: 100px !important;
        background-color: rgba(0, 0, 0, 0.1) !important;
    }
    .react-modal-sheet-container {
        background-color: #FFFFFF !important;
        border-radius: 20px 20px 0px 0px !important;
        padding-top: 10px !important;
    }
    .react-modal-sheet-header {
        cursor: pointer !important;
    }
    .react-modal-sheet-drag-indicator {
        background: #999 !important;
        border-radius: 5px !important;
        cursor: grab;
    }
    .react-modal-sheet-content {
        margin: 10px 20px !important;
    }
`;

export default EditBookmarkPage;