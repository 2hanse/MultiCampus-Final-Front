import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 40%;
  margin-left: 20px;
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
`;

const ButtonIcon = styled.img`
  aspect-ratio: 1.36;
  object-fit: contain;
  object-position: center;
  width: 30px;
`;

function ChatActions() {
  const navigate = useNavigate();

  const handleAddChat = () => {
    navigate("/user/chat/invite");
  }

  return (
    <ActionsWrapper>
      <ActionButtons>
        <ActionButton aria-label="Add Chat" onClick={handleAddChat}>
          <ButtonIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6846e8b6c092256cedc926d14ef28241234aff373684855b711db7644210d2c4?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" alt="" />
        </ActionButton>
        <ActionButton aria-label="Search" >
          <ButtonIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4043db299d9ceb138c2e374dca4840d7d3ff7f4252651ed455139c571b71f73?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" alt="" />
        </ActionButton>
      </ActionButtons>
    </ActionsWrapper>
  );
}

export default ChatActions;