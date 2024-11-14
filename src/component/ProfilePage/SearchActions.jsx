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

function ChatActions() {
  const navigate = useNavigate();

  const handleAddChat = () => {
    navigate("/user/chat/invite");
  }

  return (
    <ActionsWrapper>
      <ActionButtons>
        <ActionButton aria-label="Search" >
          <ButtonIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" alt="" />
        </ActionButton>
      </ActionButtons>
    </ActionsWrapper>
  );
}

export default ChatActions;