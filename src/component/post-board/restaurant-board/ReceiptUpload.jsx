import styled from 'styled-components';
import Camera from '../asset/camera.png';

const ReceiptUpload = ({
  receipts,
  handleCameraButtonClick,
  toggleList,
  handleReceiptClick,
  isListVisible,
}) => {
  return (
    <UploadContainer>
      <UploadButton onClick={toggleList}>
        <UploadIcon
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/52f98d26698a0659d14a4a07d605db8b41092a626d8a73cbeb8380c9da592e0e?placeholderIfAbsent=true&apiKey=96b0aafc0bca4efc865afcf9a032943c"
          alt="Upload"
        />
        {/* UploadButton 바로 아래에 데이터 목록 표시 */}
        {isListVisible && (
          <DataList>
            {receipts.map((receipt, index) => (
              <DataItem
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleReceiptClick(receipt);
                }}
              >
                {receipt.restaurant_name}
              </DataItem>
            ))}
          </DataList>
        )}
        <UploadText>영수증 불러오기</UploadText>
      </UploadButton>
      <PhotoButton onClick={handleCameraButtonClick}>
        <img
          src={Camera}
          alt="Camera"
          style={{ width: '20px', height: '17px' }}
        />
      </PhotoButton>
    </UploadContainer>
  );
};

const UploadContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  padding: 0 20px;
  gap: 11px;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  background-color: #fff;
  padding: 5px 7px;
  border: 1px solid #dfa67b;
  cursor: pointer;
  position: relative; /* 위치 기준 */
`;

const UploadIcon = styled.img`
  width: 10px;
  height: 10px;
  object-fit: contain;
`;

const UploadText = styled.span`
  font-size: 10px;
  color: #dfa67b;
`;

const PhotoButton = styled.button`
  border-radius: 5px;
  background-color: #fff;
  width: 33px;
  height: 26px;
  border: 1px solid #dfa67b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DataList = styled.div`
  position: absolute;
  top: 100%; /* UploadButton 바로 아래에 배치 */
  left: 0;
  width: 100%;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #dfa67b;
  border-radius: 5px;
  z-index: 1; /* 다른 요소보다 위에 보이도록 설정 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const DataItem = styled.div`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default ReceiptUpload;
