import React from "react";
import styled from "styled-components";

function InfoItem({ icon, label, additionalInfo, hasRating }) {
  return (
    <ItemWrapper>
      <Icon src={icon} alt="" />
      <Label>{label}</Label>
      {additionalInfo && <AdditionalInfo>{additionalInfo}</AdditionalInfo>}
      {hasRating && <RatingIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/76ac410de088f9ebb3f69908cec6437dacd93967deb82a0af6ee25fa4c0b0f4b?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" alt="Rating" />}
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000;
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const Label = styled.span`
  margin: auto 0;
`;

const AdditionalInfo = styled.span`
  color: #49454f;
`;

const RatingIcon = styled.img`
  width: 7px;
  height: 12px;
  object-fit: contain;
`;

export default InfoItem;