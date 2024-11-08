import React, { useState, useEffect } from "react";
import styled                         from "styled-components";
import { useLocation }                from "react-router-dom";
import Header                         from "../map/Header";
import Map                            from "../map/Map";
import { Sheet }                      from 'react-modal-sheet';
import BookmarkList                   from "../bookmark/BookmarkList";
import CreateBookmark                 from "../bookmark/CreateBookmark";
import Footer from "../layout/footer/Footer";

function MapPage() {

    // BottomSheet 상태 관리
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const openBottomSheet = () => {
        setIsOpen(true);
        setIsClosing(false); // 열 때는 닫기 애니메이션이 아님
    };
    const closeBottomSheet = () => {
        setIsClosing(true); // 닫기 애니메이션 시작
        setTimeout(() => setIsOpen(false), 300); // 애니메이션 지속 시간 이후에 완전히 숨김
    };

    return (
        <Main>
            <Header openBottomSheet={openBottomSheet} />
            <Map />
            {isOpen && <BottomSheet onClose={closeBottomSheet} />}
            <Footer />
        </Main>
    )
}

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