import React from 'react';
import styled from 'styled-components';

const ActionButtons = () => {
  return (
    <ButtonContainer>
      <ActionButton type="button">임시저장</ActionButton>
      <ActionButton type="submit">등록</ActionButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 69px;
  padding: 0 20px 47px;
`;

const ActionButton = styled.button`
  border-radius: 10px;
  background-color: #fff;
  color: #49454f;
  font-size: 15px;
  padding: 17px 32px;
  border: 1px solid #49454f;
  cursor: pointer;
  white-space: nowrap;
`;

export default ActionButtons;
