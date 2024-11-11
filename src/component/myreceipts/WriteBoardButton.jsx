import styled from 'styled-components';
import Camera from '../post-board/asset/camera.png';

const WriteBoardButton = ({ handleCameraButtonClick }) => {
  return (
    <PhotoButton onClick={handleCameraButtonClick}>
      게시글(리뷰) 작성하러 가기
    </PhotoButton>
  );
};

const PhotoButton = styled.button`
  border-radius: 5px;
  background-color: #ffd966;
  width: auto;
  height: 26px;
  border: 2px solid #ffd966;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export default WriteBoardButton;
