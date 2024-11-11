import { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

const PlaceInfoSheet = ({placeName, placeAddress, placeTele}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleIconClick = (placeTele) => {
        setSelectedData(placeTele); // 클릭된 데이터를 저장
        setIsModalOpen(true);  // 모달을 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달을 닫기
        setSelectedData(null); // 선택된 데이터 초기화
    };

    return (
    <Container>
        <Header>
            <RestaurantName>{placeName}</RestaurantName>
        </Header>

        <RatingContainer>
            <Rating>3.5</Rating>
            <StarIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/913ddbb0684382d7d3632785d1938942c53fdd309cd226829d6c3139502f82fb?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" alt="Rating star" />
            <ReviewCount>후기 N</ReviewCount>
            <ArrowIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/76ac410de088f9ebb3f69908cec6437dacd93967deb82a0af6ee25fa4c0b0f4b?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" alt="Arrow icon" />
        </RatingContainer>

        <AddressContainer>
            <AddressInfo>
            <Address>{placeAddress}</Address>
            <IconContainer>

                <Icon   loading="lazy" 
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/40818f37db6d225adfa1c55c5357fa488e2f7c88cb6e0f8480e4a4945c862a7d?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" 
                        alt="Icon 1" 
                        onClick={() => handleIconClick(placeTele)}/>
                <Icon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/84e6d9b5de04ff203900ac7f5955f1ca91c45cce554d4fddfe190fe63360cc54?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" alt="Icon 2" />
                <Icon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7d52f98e5299a8b08ff643fede53eab7a4ff9261862a68328040c94b080e7b9?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" alt="Icon 3" />
            </IconContainer>
            </AddressInfo>
            <ArrivalButton>도착</ArrivalButton>
        </AddressContainer>

        <PhotoContainer>
            사진
        </PhotoContainer>

        {/* 모달 컴포넌트 */}
        <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Detail Modal"
                ariaHideApp={false} // optional: 모달의 접근성 관련 설정
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
                        position: 'fixed', // 모달이 화면에 고정되도록 설정
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)', // 중앙에 배치
                        padding: '20px',
                        borderRadius: '8px',
                        width: '300px',
                        height: '150px',
                        maxWidth: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 그림자 추가
                        zIndex: 100, // 모달의 z-index를 오버레이 위에 위치하도록 설정
                    },
                }}
            >
                <SmallModalContent>
                    <h3>{selectedData}</h3>
                    <CloseButton onClick={closeModal}>닫기</CloseButton>
                </SmallModalContent>
            </ReactModal>
    </Container>
    );
}

// Styled-components for styling
const SmallModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseButton = styled.button`
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #ed6000;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #d45500;
    }
`;

const Container = styled.main`
  display: flex;
  margin-top: 11px;
  width: 100%;
  flex-direction: column;
`;

const Header = styled.div`
  align-self: flex-start;
  display: flex;
  gap: 12px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
`;

const RestaurantName = styled.h1`
  color: #000;
  font-size: 23px;
  letter-spacing: 0.72px;
  border-color: #000;
  flex-grow: 1;
  margin: 0;
`;

const RatingContainer = styled.section`
  align-self: flex-start;
  display: flex;
  margin-top: 10px;
  gap: 8px;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.5;
`;

const Rating = styled.span`
  color: #ed6000;
  font-size: 20px;
  letter-spacing: 0.61px;
  margin: auto 0;
`;

const StarIcon = styled.img`
  aspect-ratio: 5.29;
  object-fit: contain;
  object-position: center;
  width: 106px;
  border-radius: 1px;
  max-width: 100%;
`;

const ReviewCount = styled.span`
  color: #757575;
  font-size: 17px;
  letter-spacing: 0.52px;
`;

const ArrowIcon = styled.img`
  aspect-ratio: 0.58;
  object-fit: contain;
  object-position: center;
  width: 7px;
  align-self: flex-start;
  margin-top: 6px;
`;

const AddressContainer = styled.section`
  display: flex;
  margin-top: 9px;
  gap: 20px;
  justify-content: space-between;
`;

const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Address = styled.p`
  color: #757575;
  letter-spacing: 0.52px;
  align-self: flex-start;
  font: 400 17px/1.5 Roboto, sans-serif;
  margin: 0;
`;

const IconContainer = styled.div`
  display: flex;
  margin-top: 14px;
  gap: 17px;
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 40px;
`;

const ArrivalButton = styled.button`
  border-radius: 50px;
  background-color: #ed6000;
  align-self: flex-end;
  margin-top: 32px;
  color: #fff;
  white-space: nowrap;
  text-align: center;
  letter-spacing: 0.52px;
  padding: 13px 18px;
  font: 400 17px/1.5 Roboto, sans-serif;
  border: none;
  cursor: pointer;
`;

const PhotoContainer = styled.section`
  border-radius: 10px;
  background-color: #d9d9d9;
  margin-top: 23px;
  color: #000;
  text-align: center;
  letter-spacing: 0.52px;
  padding: 94px 70px;
  font: 400 17px/25px Roboto, sans-serif;
`;


export default PlaceInfoSheet;