import React, { useEffect } from 'react';
import styled from 'styled-components';

const LocationSearch = (selectedReceipt) => {
  useEffect(() => {
    console.log('전달된 selectedReceipt 값:', selectedReceipt);
  }, [selectedReceipt]);
  return (
    <SearchContainer>
      <SearchIcon
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3fcb252fdc47c3a89bcef31a8dab9e2e588ee15370a4f80e9e91bff0c23c4df2?placeholderIfAbsent=true&apiKey=96b0aafc0bca4efc865afcf9a032943c"
        alt="Location"
      />
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="가게 주소"
          value={selectedReceipt.selectedReceipt.restaurant_address}
          readOnly
        />
      </SearchInputWrapper>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  gap: 19px;
  padding: 0 20px;
  margin-top: 14px;
`;

const SearchIcon = styled.img`
  width: 16px;
  height: 20px;
  object-fit: contain;
`;

const SearchInputWrapper = styled.div`
  border-radius: 3px;
  background-color: #fff;
  border: 1px solid #b7b2b2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding: 7px 8px;
`;

const SearchInput = styled.input`
  font-size: 12px;
  color: #757575;
  border: none;
  outline: none;
  width: 100%;
`;

const SearchButton = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  cursor: pointer;
`;

export default LocationSearch;
