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
            let region = address.region_1depth_name; // 시/도
            const city = address.region_2depth_name; // 구
            let district = address.region_3depth_name; // 동/읍/면

            // '특별시', '광역시', '도', '특별자치도' 처리
            if (region === "제주특별자치도") {
                region = "제주"; // 제주특별자치도 → 제주
            } else if (region.endsWith("강원특별자치도")) {
                region = region.replace("특별자치도", ""); // 강원특별자치도 → 강원
            } else if (region.endsWith("전북특별자치도")) {
                region = region.replace("특별자치도", ""); // 전북특별자치도 → 전북
            } else if (region.endsWith("특별시")) {
                region = region.replace("특별시", ""); // 서울특별시 → 서울
            } else if (region.endsWith("광역시")) {
                region = region.replace("광역시", ""); // 부산광역시 → 부산
            } else if (region.endsWith("도")) {
                region = region.replace("도", ""); // 경기도 → 경기
            }

            // 읍/리 정보만 포함하도록 district 가공
            if (district.includes("읍")) {
                district = district.split("읍")[0] + "읍"; // "읍"까지만 출력
            } else if (district.includes("리")) {
                district = district.split("리")[0] + "리"; // "리"까지만 출력
            }

            // 반환 값 구성
            return {
                region,   // 시/도
                city,     // 구
                district, // 동/읍/면
                fullAddress: `${region} ${city} ${district}`, // 전체 주소
            };
        } else {
            return {
                region: null,
                city: null,
                district: null,
                fullAddress: "주소를 찾을 수 없습니다.",
            };
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        return {
            region: null,
            city: null,
            district: null,
            fullAddress: "주소 변환 중 오류 발생",
        };
    }
};
