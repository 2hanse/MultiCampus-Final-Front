import React from "react";
import styled from "styled-components";

function ListItem({ name, distance, address, iconSrc }) {
  return (
    <RestaurantContainer>
      <RestaurantInfo>
        <RestaurantName>{name}</RestaurantName>
        <RestaurantDetails>
          {distance} | {address}
        </RestaurantDetails>
      </RestaurantInfo>
      <IconWrapper>
        <RestaurantIcon loading="lazy" src={iconSrc} alt="Restaurant icon" />
      </IconWrapper>
    </RestaurantContainer>
  );
}

const RestaurantContainer = styled.article`
  background-color: rgba(236, 230, 240, 0.08);
  position: relative;
  display: flex;
  min-height: 80px;
  margin-top: 29px;
  width: 100%;
  padding-left: 50px;
  flex-direction: column;
  font-weight: 400;
  justify-content: center;
`;

const RestaurantInfo = styled.div`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  justify-content: start;
  flex: 1;
  flex-basis: 0%;
  margin: auto 0;
  padding: 8px 16px;
`;

const RestaurantName = styled.h2`
  color: var(--M3-sys-light-on-surface, var(--Schemes-On-Surface, #1d1b20));
  letter-spacing: 0.5px;
  font: 16px / 24px Roboto;
`;

const RestaurantDetails = styled.p`
  color: var(--M3-sys-light-on-surface-variant, var(--Schemes-On-Surface-Variant, #49454f));
  letter-spacing: 0.25px;
  font: 14px / 20px Roboto;
`;

const IconWrapper = styled.div`
  background-color: rgba(253, 247, 255, 0.08);
  align-self: start;
  z-index: 10;
  display: flex;
  min-height: 48px;
  justify-content: center;
  margin: -64px 0 0 10px;
`;

const RestaurantIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  align-self: stretch;
  margin: auto 0;
  padding: 12px 16px;
`;

export default ListItem;