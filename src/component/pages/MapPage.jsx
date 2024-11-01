import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../boardmain/Footer";
import Header from "../map/Header";
import Map from "../map/Map";
import { Sheet } from 'react-modal-sheet';

function MapPage() {

    // BottomSheet 상태 관리
    const [isOpen, setOpen] = useState(false)

    return (
        <Main>
            <Header onClickBookmark={() => setOpen(true)} />
            <Map />
            <CustomSheet    isOpen={isOpen}
                            onClose={() => setOpen(false)}
                            snapPoints={[1000, 500, 0]}
                            initialSnap={1}
                            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>{/* 여기에 북마크 관련 컴포넌트 */} test</Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onClick={() => setOpen(false)}/>
            </CustomSheet>
            <Footer />
        </Main>
    )
}

const CustomSheet = styled(Sheet)`
    margin: 0 auto;
    max-width: 430px;

    /* sheet 라이브러리 css 덮어 쓰려면 !important 끝에 들어가야합니다 */
    .react-modal-sheet-backdrop {
        background-color: rgba(0, 0, 0, 0.3) !important;
    }
    .react-modal-sheet-container {
        background-color: #FFFFFF !important;
        border-radius: 20px 20px 0px 0px !important;
    }
    .react-modal-sheet-header {
        /* custom styles */
    }
    .react-modal-sheet-drag-indicator {
        background: #999 !important;
        border-radius: 5px !important;
        cursor: grab;
    }
    .react-modal-sheet-content {
        /* custom styles */
    }
`;

const Main = styled.main`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    max-height: 932px;
    min-height: 732px;
    background: #FFF4D2;
    margin: 0 auto;
    border: 0.5px solid #CAC4D0;
`

export default MapPage;