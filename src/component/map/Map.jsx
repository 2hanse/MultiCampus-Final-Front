import React, { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    // Kakao Map API가 로드될 때까지 기다리기
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=3a1e207cd7206916654c5fa136b2d388&autoload=false`;

    script.onload = () => {
      // Kakao API 로드 후에 실행
      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 지도를 표시할 div
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 초기 위치 설정 (예: 서울)
          level: 3, // 지도 확대 레벨
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        width: '430px',
        height: '632px', // 지도 높이 설정
      }}
    ></div>
  );
};

export default Map;