import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalComponent = ({ isOpen, onClose, board_info }) => {
    const [averageRating, setAverageRating] = useState([]);
    const navigate = useNavigate();

     // 평점 평균 계산
     useEffect(() => {
        if (board_info && board_info.length > 0) {
            const ratings = board_info.map((item) => {
                const {
                    rate_clean = 0,
                    rate_flavor = 0,
                    rate_kind = 0,
                    rate_mood = 0,
                    rate_price = 0,
                } = item; // 각 항목에서 평점 값 추출

                // 평점 계산
                const avg = (Number(rate_clean) + Number(rate_flavor) + Number(rate_kind) + Number(rate_mood) + Number(rate_price)) / 5;
                return avg.toFixed(1); // 소수점 둘째 자리까지 계산
            });
            setAverageRating(ratings);
        }
    }, [board_info]); // board_info가 변경될 때마다 평점 계산

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Place Info Modal"
            ariaHideApp={false}
            style={{
                overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
                zIndex: 99, // 오버레이의 z-index 설정
                position: 'fixed', // 오버레이가 화면을 덮도록 설정
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                },
                content: {
                maxWidth: '400px',
                height: '700px',
                margin: 'auto',
                padding: '0',
                border: 'none',
                borderRadius: '8px',
                overflow: 'auto',
                },
            }}
        >
        <SmallModalContent>
            {board_info && board_info.length > 0 ? (
                    board_info.map((item, index) => (
                        <ContentBox key={index} onClick={() => navigate(`/board/PostPage/${item.board_id}`)}>
                            <Title>제목: {item.board_info.title}</Title>
                            <Info>
                                별점: {averageRating[index]} / 조회수: {item.board_info.view_cnt !== null ? item.board_info.view_cnt : 0}
                            </Info>
                        </ContentBox>
                    ))
                ) : (
                    <div><br /><h3>등록된 후기가 없어요!</h3></div>
            )}
        </SmallModalContent>
        <CloseButtonContainer>
            <CloseButton onClick={onClose}>닫기</CloseButton>
            </CloseButtonContainer>
        </ReactModal>
    );
};

    
const SmallModalContent = styled.div`
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
    text-align: center;

    max-height: 400px; /* 모달창 세로 크기 제한 */
    overflow: hidden; /* 내용 넘칠 경우 스크롤 안 생기게 */
    position: relative; /* 절대 위치 지정할 때 사용 */
`;

const ContentBox = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 15px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        background-color: #e6e6e6;
    }
`;

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 600px;
    left: 50%;
    transform: translateX(-50%); /* 가운데 정렬 */
    text-align: center;
`;

const CloseButton = styled.button`
    padding: 8px 16px;
    background-color: #ed6000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
    background-color: #d45500;
    }
`;

const Title = styled.div`
    flex: 1;
    text-align: left;
    font-size: 16px;
    font-weight: bold; /* 제목을 굵게 */
    max-width: 150px;  /* 최대 너비를 설정 */
    overflow: hidden;  /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis;  /* 넘치는 텍스트에 '...' 추가 */
    white-space: nowrap;  /* 텍스트 줄 바꿈 방지 */
`;

const Info = styled.div`
    text-align: right;
    font-size: 16px;
`;

export default ModalComponent;
