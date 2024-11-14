import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const ButtonIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  height: 24px;
`;

function AlaramActions() {
  const navigate = useNavigate();

  const handleAddAlaram = () => {
    navigate("/myprofilepage");
  }

  return (
    <ActionsWrapper>
      <ActionButtons>
        <ActionButton aria-label="Add alaram" onClick={handleAddAlaram}>
          <ButtonIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/75a8b4cc620548771893340c85cf407976981dbfdc941c79c0a38b05d9f27b4e?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4" alt="" />
        </ActionButton>
      </ActionButtons>
    </ActionsWrapper>
  );
}

export default AlaramActions;