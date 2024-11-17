import React           from "react";
import styled          from "styled-components";
import { useNavigate } from "react-router-dom";
import api             from "../api/axios";

const CompleteButtonForm = ({ outputValue }) => {
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!outputValue.lat || !outputValue.lng) {
            alert("유효한 위치를 선택하세요.");
            return;
        }

        try {
            console.log("위치 저장 요청 데이터:", {
                verified_lat: outputValue.lat,
                verified_lng: outputValue.lng,
            });

            const response = await api.put("/users/geolocation", {
                verified_lat: outputValue.lat,
                verified_lng: outputValue.lng
            });

            console.log("서버 응답 데이터:", response.data);

            if (response.status === 200) {
                alert("위치가 성공적으로 저장되었습니다.");
                console.log("위치 저장 성공:", response);
                navigate(-1);
            } else {
                alert("위치 저장에 실패했습니다.");
                console.warn("위치 저장 실패 상태 코드:", response.status);
            }
        } catch (error) {
            console.error("위치 저장 중 오류 발생:", error);
            alert("서버 요청 중 문제가 발생했습니다.");
        }
    };

    return (
        <Wrapper>
            <PrintLocation isPlaceholder={!outputValue.address}>
                {outputValue.address || PlaceholderText}
            </PrintLocation>
            <CompleteButton onClick={handleSubmit}>선택 완료</CompleteButton>
        </Wrapper>
    );
}

const PlaceholderText = '선택한 주소지';

const Wrapper = styled.div`
    position: fixed;
    width: 430px;
    height: 200px;
    bottom: 100px;
    transform: translateX(-0.2%);
    background-color: #FFF4D2;
    border-left: 0.5px solid #CAC4D0;
    border-right: 0.5px solid #CAC4D0;
`

const PrintLocation = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 375px;
    height: 57px;
    left: calc(50% - 375px/2 + 0.5px);
    top: 38px;

    background: #FFFFFF;
    border: 0.5px solid #DFA67B;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding-top: 13.5px;

    font-family: 'Inter';
    font-size: 17px;
    font-style: normal;
	font-weight: 500;
    text-align: center;
    color: ${(props) => (props.isPlaceholder ? '#CAC4D0' : '#000')};
`

const CompleteButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;

    position: absolute;
    width: 130px;
    height: 35px;
    left: calc(50% - 130px/2);
    top: 127px;

    font-family: 'Inter';
    font-size: 15px;
    font-weight: 700;
    text-align: center;

    background: #FFD966;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    border: none;

    cursor: pointer;

    transition: transform 0.1s ease-in-out;
  
    &:active {
        transform: scale(0.95);
    }
`

export default CompleteButtonForm;