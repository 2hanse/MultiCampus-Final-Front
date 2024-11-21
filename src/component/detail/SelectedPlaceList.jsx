import React from 'react';
import styled from 'styled-components';

function SelectedPlaceList(props) {
  return (
    <Container>
      <Info>
        <Name>
          {props.place.custom_place_name ||
            props.place.place_info.placeName ||
            'Loading...'}
        </Name>
        <Details>{props.place.place_info.placeAddress || 'Loading...'}</Details>
      </Info>
    </Container>
  );
}

const Container = styled.div`
    position: relative;
    display: flex;
    height: 100px;
    width: 370px;
    padding: 3px 0px 0px 30px;
    margin: 0 auto 15px auto;
    align-items: center;
    background-color: #FFFFFF;
    border-bottom: 0.1px solid #CAC4D0;
    cursor: pointer;

    &:last-child {
    border-bottom: none;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 5px;
`;

const Name = styled.h3`
  color: #1d1b20;
  letter-spacing: 0.5px;
  font: 14px/22px Roboto, sans-serif;
  margin: 0;
`;

const Details = styled.p`
  color: #49454f;
  letter-spacing: 0.25px;
  font: 10px/16px Roboto, sans-serif;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
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

export default SelectedPlaceList;
