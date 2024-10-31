import React from "react";
import styled from "styled-components";

const BottomSheetHeader = ({ isOpen, setIsOpen, sheet }) => {
    
    const handleClick = () => {
        setIsOpen(false);
        sheet.surrent.style.setProperty("top", "382px");
    };

    return (
        <Wrapper>
            <div className="flex justify-center" onClick={handleClick}>
                <DragHandle />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
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
`;

const DragHandle = styled.div`
    width: 32px;
    height: 4px;

    background: #79747E;
    border-radius: 100px;

    flex: none;
    order: 0;
    flex-grow: 0;

    cursor: pointer;
`;

export default BottomSheetHeader;