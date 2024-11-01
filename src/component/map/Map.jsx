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
          level: 3 // 지도 확대 레벨
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성

        // HTML5의 geolocation으로 현재 위치를 확인
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude; // 위도
            const lon = position.coords.longitude; // 경도
            const locPosition = new window.kakao.maps.LatLng(lat, lon); // 현재 위치

            // 현재 위치에 마커 표시
            displayMarker(map, locPosition);
            
            // 지도 중심을 현재 위치로 설정
            map.setCenter(locPosition);
          },
          () => {
            // 위치를 가져올 수 없을 때
            displayMarker(
              map,
              new window.kakao.maps.LatLng(37.5665, 126.978),
              '<div style="padding:10px;">현재 위치를 알 수 없습니다.</div>'
            );
          });
        } else {
          // geolocation을 지원하지 않을 때 기본 위치에 인포윈도우 표시
          displayMarker(
            map,
            new window.kakao.maps.LatLng(37.5665, 126.978),
            '<div style="padding:10px;">현재 위치를 알 수 없습니다.</div>'
          );
        }

        // 마커와 인포윈도우를 표시하는 함수
        function displayMarker(map, locPosition, message = null) {
          const imageSrc = `${process.env.PUBLIC_URL}/Marker.png`;
          const imageSize = new window.kakao.maps.Size(30, 36.8);
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          const marker = new window.kakao.maps.Marker({
            map: map,
            position: locPosition,
            image: markerImage, // 사용자 지정 마커 이미지
          });

          // 메시지가 존재할 때만 인포윈도우를 생성
          if (message) {
            const infowindow = new window.kakao.maps.InfoWindow({
              content: message,
              removable: true
            });
            infowindow.open(map, marker);
          }
        }
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
        height: '932px'
      }}
    ></div>
  );
};

export default Map;