import React, { useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import BottomSheetHeader from "./BottomSheetHeader";
import useBottomSheet, { MIN_Y } from "./useBottomSheet";


const BottomSheet = ({ data }) => {

    const { sheet, content, isOpen, setIsOpen } = useBottomSheet();

    const BOTTOM_SHEET_HEIGHT = useMemo(() => window.innerHeight - MIN_Y, []);

    return (
        <Wrapper ref={sheet} isOpen={isOpen} height={BOTTOM_SHEET_HEIGHT}>
            <BottomSheetHeader isOpen={isOpen} setIsOpen={setIsOpen} sheet={sheet} />
            <BottomSheetContent ref={content}>

            </BottomSheetContent>
        </Wrapper>
    );
};

const Wrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    position: absolute;
    z-index: 5;
    width: 430px;
    height: ${({ height }) => height}px;
    top: 452px;

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #FFFFFF;
    filter: drop-shadow(0px -1px 2px rgba(0, 0, 0, 0.25));
`;

const BottomSheetContent = styled.div`
    padding: 0px 20px 140px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    flex-grow: 1;
`;

export default BottomSheet;