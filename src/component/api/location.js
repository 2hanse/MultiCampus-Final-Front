import axios from "axios";

export const getAddressFromCoordinates = async (lat, lng) => {
    const KAKAO_API_KEY = "e0a9f4d745de8d0ac6ef83712dd97df7"; // 카카오 API 키
    try {
        const response = await axios.get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`
            },
            params: {
                x: lng, // 경도
                y: lat  // 위도
            }
        });

        // 주소 변환 결과 반환
        if (response.data.documents.length > 0) {
            const address = response.data.documents[0].address;

            // 행정구역 단위 추출
            let region1 = address.region_1depth_name; // 시/도
            const region2 = address.region_2depth_name; // 구
            const region3 = address.region_3depth_name; // 동/읍/면

            // '특별시', '광역시', '도', '특별자치도' 처리
            if (region1 === "제주특별자치도") {
                region1 = "제주"; // 제주특별자치도 → 제주
            } else if (region1.endsWith("특별시")) {
                region1 = region1.replace("특별시", ""); // 서울특별시 → 서울
            } else if (region1.endsWith("광역시")) {
                region1 = region1.replace("광역시", ""); // 부산광역시 → 부산
            } else if (region1.endsWith("도")) {
                region1 = region1.replace("도", ""); // 경기도 → 경기
            }

            return `${region1} ${region2} ${region3}`; // 반환 형식: "서울특별시 강남구 삼성동"
        } else {
            return "주소를 찾을 수 없습니다.";
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        return "주소 변환 중 오류 발생";
    }
};
