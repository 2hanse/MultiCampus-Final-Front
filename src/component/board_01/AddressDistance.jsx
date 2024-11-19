import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAddressFromCoordinates } from '../api/location';
import api from '../api/axios';


function AddressDistance({ handleEnteredAddress , handleEnteredDistance }) {
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState(10);
  const fetchLocation = async() => {
    try {
      const response = await api.get("/users/geolocation"); // 위치 정보 API
      if (response.status === 200 && response.data.verified_lat && response.data.verified_lng) {
          const { fullAddress } = await getAddressFromCoordinates(
              response.data.verified_lat,
              response.data.verified_lng
          );
          setAddress(fullAddress); // fullAddress 출력
      } else if (response.status === 204) {
        setAddress("내 동네 설정이 되지 않았습니다.");
      }
  } catch (error) {
      console.error("Error fetching user location:", error);
      setAddress("");
  }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDistanceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setDistance(value);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const numericDistance = parseFloat(distance) || 0;
      handleEnteredAddress(address);
      handleEnteredDistance(numericDistance);
      console.log('Submitted Data:', { address, distance: numericDistance });
    }
  };

  return (
    <Container onKeyPress={handleKeyPress}>
      <InputAddress 
        type="text" 
        value={address} 
        onChange={handleAddressChange} 
        placeholder="주소를 입력해 주세요" 
      />
      <DistanceWrapper>
        <InputDistance 
          type="text" 
          value={distance} 
          onChange={handleDistanceChange} 
          placeholder="0.0"
        />
        <Suffix>km</Suffix>
      </DistanceWrapper>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px; /* 입력창과 버튼 사이의 간격 */
`;

const InputAddress = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const DistanceWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const InputDistance = styled.input`
  width: 30px;
  padding: 10px;
  padding-right: 30px; /* 'km'가 보일 공간 확보 */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Suffix = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #777;
`;

export default AddressDistance;
