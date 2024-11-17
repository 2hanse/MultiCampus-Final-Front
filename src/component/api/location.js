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
            return response.data.documents[0].address.address_name; // 도로명 주소 또는 지번 주소
        } else {
            return "주소를 찾을 수 없습니다.";
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        return "주소 변환 중 오류 발생";
    }
};
