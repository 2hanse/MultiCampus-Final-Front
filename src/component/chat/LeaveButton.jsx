import React from "react";
import styled from "styled-components";

const LeaveButton = () => {
  return <StyledButton>나가기</StyledButton>;
};

const StyledButton = styled.button`
  align-self: stretch;
  border-radius: 6px;
  background-color: #f5f5f5;
  min-height: 21px;
  color: var(--sds-color-text-default-default);
  white-space: nowrap;
  margin: auto 0;
  padding: 5px 8px;
  font: var(--sds-typography-body-font-weight-regular) 16px/1 var(--sds-typography-body-font-family);
  border: none;
  cursor: pointer;
`;

export default LeaveButton;