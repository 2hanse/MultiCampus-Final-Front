import React, { useState } from 'react';
import styled              from 'styled-components';
import dropdown            from "./assets/Dropdown.png";

const Dropdown = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('등록순');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option); // 선택한 옵션 전달
        setIsOpen(false);
    };

    return (
    <DropdownContainer>
        <DropdownButton onClick={toggleDropdown}>
            {selectedOption}
            <Icon src={dropdown} alt="Dropdown arrow" />
        </DropdownButton>
            {isOpen && (
                <DropdownList>
                    <DropdownItem onClick={() => handleOptionClick('등록순')}>등록순</DropdownItem>
                    <DropdownItem onClick={() => handleOptionClick('이름순')}>이름순</DropdownItem>
                </DropdownList>
            )}
        </DropdownContainer>
    );
};

const DropdownContainer = styled.div`
    position: absolute;
    display: inline-block;
    width: 100px;
    left: 100px;
`;

const DropdownButton = styled.button`
    width: 100%;
    padding: 5px 5px 10px 10px;
  
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 100%;

    border: none;
    background-color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 15px;
`;

const DropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 100%;

    list-style: none;
    border: none;
    background-color: #fff;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
`;

const DropdownItem = styled.li`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

export default Dropdown;