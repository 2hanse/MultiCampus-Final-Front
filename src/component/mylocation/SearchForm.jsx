import React, { useState, useEffect } from "react";
import styled                         from "styled-components";
import axios                          from "axios";
import Location                       from "./assets/Location.png";
import { getAddressFromCoordinates }  from "../api/location";

const SearchForm = ({ setOutputValue }) => {

    const [query, setQuery] = useState(""); // 검색어 상태
    const [regions, setRegions] = useState([]); // 행정구역 정보를 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태 표시
    const KAKAO_API_KEY = 'e0a9f4d745de8d0ac6ef83712dd97df7'; // 카카오 API 키 입력

    useEffect(() => {
        // 검색어가 변경될 때마다 카카오 API 호출
        const fetchRegions = async () => {
            if (query.trim() === "") {
                setRegions([]);
                return;
            }
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://dapi.kakao.com/v2/local/search/address.json`,
                    {
                        headers: {
                            Authorization: `KakaoAK ${KAKAO_API_KEY}`
                        },
                        params: {
                            query: query
                        }
                    }
                );
                // 필요한 주소 정보만 추출해 상태에 저장
                const regionList = response.data.documents.map((item) => ({
                    region: item.address.region_1depth_name,
                    city: item.address.region_2depth_name,
                    district: item.address.region_3depth_name,
                    district_h:item.address.region_3depth_h_name,
                    lat: item.y, // 위도
                    lng: item.x  // 경도
                }))
                .filter((item, index, self) =>
                    index === self.findIndex((t) => (
                        t.city === item.city && t.district === item.district
                    ))
                ) // 중복 제거
                .slice(0, 5); // 최대 5개 항목만
                
                setRegions(regionList);
            } catch (error) {
                console.error('Error fetching regions:', error);
            } finally {
                setLoading(false);
            }
        };

        // 입력 딜레이 후 API 호출
        const delayDebounceFn = setTimeout(() => {
            fetchRegions();
        }, 500);

        // cleanup function: 이전 타이머 클리어
        return () => clearTimeout(delayDebounceFn);
    }, [query]); // query가 변경될 때마다 실행

    const handleMyLocationClick = async () => {
        if (!navigator.geolocation) {
            alert("현재 위치를 가져올 수 없습니다. 브라우저 설정을 확인하세요.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const address = await getAddressFromCoordinates(latitude, longitude);

                    setOutputValue({
                        address: address.fullAddress,
                        lat: latitude,
                        lng: longitude,
                    });

                } catch (error) {
                    console.error("현재 위치 정보 요청 오류:", error);
                    alert("현재 위치 정보를 가져오는 데 실패했습니다.");
                }
            },
            (error) => {
                console.error("현재 위치를 가져오는 데 실패했습니다:", error);
                alert("현재 위치를 가져오는 데 실패했습니다.");
            }
        );
    };
  
    return (
        <Wrapper>
            <TopWrapper>
                <Input 
                    placeholder="내 동네 이름(읍/면/동)으로 검색"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // 입력값 업데이트
                />
                <MyLocationBtn onClick={handleMyLocationClick}>
                    <LocationImg src={Location} alt="Location" />
                    &nbsp;&nbsp;&nbsp;&nbsp;현재 위치로 찾기
                </MyLocationBtn>
            </TopWrapper>
            <PrintLocations>
                {query.trim() === "" ? (
                    <Text>주소를 입력해주세요</Text>
                ) : loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {regions.map((region, index) => (
                            <React.Fragment key={index}>
                                <RegionBlock
                                    onClick={() => {
                                        setOutputValue({
                                            address: `${region.region} ${region.city} ${region.district || region.district_h}`,
                                            lat: region.lat,
                                            lng: region.lng
                                        });
                                    }}
                                >
                                    {region.region} {region.city} {region.district || region.district_h}
                                </RegionBlock>
                                {index < regions.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </PrintLocations>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    height: 500px;
`;

const TopWrapper = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 430px;
    height: 180px;
    background-color: #FFF4D2;
    z-index: 5;
`;

const Input = styled.input`
    box-sizing: border-box;
    position: fixed;
    width: 375px;
    height: 57px;
    left: calc(50% - 375px/2 + 0.5px);
    top: 145px;
    background: #FFFFFF;
    border: 0.5px solid #DFA67B;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-family: 'Inter';
    font-style: normal;
	font-weight: 500;
	font-size: 17px;
    padding: 0px 15px 0px 15px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        font-family: 'Inter';
        color: #CAC4D0;
        font-size: 17px;
    }
`;

const MyLocationBtn = styled.button`
    position: fixed;
    width: 223px;
    height: 46px;
    left: calc(50% - 223px/2 + 0.5px);
    top: 225px;
    font-family: 'sans-serif';
    font-style: normal;
	font-weight: 600;
	font-size: 17px;
    padding: 0px 15px 0px 15px;
    background: #DFA67B;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
  
    &:active {
        transform: scale(0.95);
    }
`;

const LocationImg = styled.img`
    position: absolute;
    width: 20px;
    height: 20px;
    left: 30px;
    top: 14px;
`;

const PrintLocations = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 420px;
    height: 300px;
    top: 180px;
    left: 5px;
`;

const Text = styled.h1`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: 30px;

    font-family: 'sans-serif';
    font-style: normal;
	font-weight: 400;
	font-size: 18px;
`

const RegionBlock = styled.div`
    font-family: 'Inter';
    font-style: normal;
	font-weight: 500;
	font-size: 18px;

    cursor: pointer;
    padding-bottom: 8px;
    margin-bottom: 16px;
    margin-left: 30px;
`;

const Divider = styled.hr`
    width: 360px;
    border: none;
    border-top: 1px solid #ccc; // 원하는 선 스타일 설정
    margin: 16px 0;
    margin-left: 30px;
`;

export default SearchForm;