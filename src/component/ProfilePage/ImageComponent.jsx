import React from 'react';
import { useNavigate } from 'react-router-dom';

const ImageComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Profile"); // 프로필 페이지로 이동
  };

  return (
    <>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7a38cc5eac3bdddc15bd83f752ef5b7883c36669787fc9f39a59bad39fb1d40?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
        alt=""
        className="image-content"
        onClick={handleClick} // 이미지 클릭 시 프로필로 이동
        style={{ cursor: 'pointer' }} // 클릭 가능하게 표시
      />
      <style jsx>{`
        .image-content {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 80px;
        }
      `}</style>
    </>
  );
};

export default ImageComponent;
