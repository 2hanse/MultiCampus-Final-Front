import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

function Modal() {

    

    return (
        <Wrapper>
            <BottomSheet>
                <SheetHeader>
                    <DregHandle />
                </SheetHeader>
            </BottomSheet>
        </Wrapper>
        
    );
    
}

const MIN_Y = 60;
const MAX_Y = window.innerHeight - 160;
const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y;

const Wrapper = styled.div`
    display: flex;
    width: 430px;
    height: 480px;
`

const BottomSheet = styled(motion.div)`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    position: absolute;
    z-index: 5;
    width: 430px;
    height: ${BOTTOM_SHEET_HEIGHT}px;
    top: 452px;

    background-color: #FFFFFF;
    filter: drop-shadow(0px -1px 2px rgba(0, 0, 0, 0.25));
    border-radius: 20px;

    transition: transform 650ms ease-out;
`

const SheetHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    gap: 12px;

    position: absolute;
    height: 36px;
    left: 0px;
    right: 0px;
    top: 0px;
`

const DregHandle = styled.div`
    width: 32px;
    height: 4px;

    background: #79747E;
    border-radius: 100px;

    flex: none;
    order: 0;
    flex-grow: 0;

    cursor: pointer;
`

const BottomSheetContent = styled.div`
  overflow: auto;                            
  -webkit-overflow-scrolling: touch;
`

export default Modal;