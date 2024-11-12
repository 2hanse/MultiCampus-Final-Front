import React, { useState } from "react";
import styled              from "styled-components";

function GroupItem(props) {
    const [isActive, setIsActive] = useState([]);

    const handleToggle = () => {
        props.group.is_activated = !props.group.is_activated;
        setIsActive((prev) => !prev); // 
    };
    
    return (
        <ItemWrapper>
            <ItemContent>
                <GroupName>
                    {props.group.bookmark_title} <AuthorName>({props.group.user_nickname})</AuthorName>
                </GroupName>
                <GroupCount>개수 {props.group.list_count}/500</GroupCount>
            </ItemContent>
            {/* 
            <ExpandIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1541bad3fc27abbfb842592920ca5dba61084f952fe090a89d971ec02a989bf?placeholderIfAbsent=true&apiKey=a4eaf54e67064b758783ed5c744d50de"
                        alt="Expand" />
            */}
            <ToggleSwitch isActive={props.group.is_activated} onClick={handleToggle} />
        </ItemWrapper>
    );
};

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

const ExpandIcon = styled.img`
    position: absolute;
    top: 33px;
    left: 25px;
    aspect-ratio: 1;
    object-fit: contain;
    width: 24px;
`;

const ToggleSwitch = styled.div`
    border-radius: 100px;
    background-color: ${props => props.isActive ? "#F4B183" : "#ccc"};
    position: absolute;
    top: 29px;
    right: 26px;
    width: 48px;
    height: 32px;
    border: 1px solid ${props => props.isActive ? "#DFA67B" : "#ccc"};
    &::after {
        content: '';
        position: absolute;
        top: 3px;
        left: ${props => props.isActive ? "calc(100% - 28px)" : "2px"};
        width: 26px;
        height: 26px;
        background-color: white;
        border-radius: 50%;
        transition: 0.2s;
    }
`;

export default GroupItem;