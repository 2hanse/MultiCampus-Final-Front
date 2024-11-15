import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;;
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

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

function MypageActions() {
  const navigate = useNavigate();

  const handleMenuButtonClick = () => {
    navigate("/homepage");  // 메뉴 버튼 클릭 시 memberinfo 페이지로 이동
  };

  return (
    <ActionsWrapper>
      {/* 프로필 이미지 */}
      <ActionButtons>
        {/* 메뉴 버튼 */}
        <MenuButton aria-label="Open menu" onClick={handleMenuButtonClick}>
          <ButtonIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4671849f740627d3c98e72408b2f2d3f3f06c041bf32bb9316b1e960e12b0e6?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt="Menu"
          />
        </MenuButton>
      </ActionButtons>
    </ActionsWrapper>
  );
}

export default MypageActions;
