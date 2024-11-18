import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import api from "../api/axios";
import { getUserIdFromToken } from "../api/jwt";
import ModalComponent from "./ModalComponent";

const PlaceInfoSheet = ({placeName, placeAddress, placeTele, place_id}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [rating, setRating] = useState();
  const [placeReviewCnt, setPlaceReviewCnt] = useState();
  const [imageUrl, setImageUrl] = useState("등록된 사진이 없습니다.");
  const [reviews, setRevies] = useState([]);
  const maxStars = 5; // 최대 별 개수

  useEffect(() => {
    //console.log(place_id)
    api.get(`/place/reviewscore/${place_id}`)
    .then((res) => {
      if(res.status === 200) {
        //console.log(res.data)
        const { score, imageUrl } = res.data;
        setRating(parseFloat(score).toFixed(1));
        //setRating(parseFloat(res.data).toFixed(1));
        setImageUrl(imageUrl || "등록된 사진이 없습니다.");
      }
    })
    .catch((error) => {
      console.error("Request failed:", error.response ? error.response.data : error.message);
    });
  },[]);

  useEffect(() => {
    api.get(`/place/reviews_count/${place_id}`)
    .then((res) => {
      //console.log(`장소 후기 개수 : ${res.data}`);
      setPlaceReviewCnt(res.data);
    })
    .catch((err) => {
      console.error(err.response.data)
    })
  },[]);

    // 별점 배열 생성 (가득 찬 별, 반 별 및 빈 별을 표시)
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      if (i <= Math.floor(rating)) {
        // 가득 찬 별
        stars.push(<RatingStar key={i} filled />);
      } else if (i - rating <= 0.5) {
        // 반 별
        stars.push(<RatingStar key={i} half />);
      } else {
        // 빈 별
        stars.push(<RatingStar key={i} />);
      }
    }
    return stars;
  };

    const handleIconClick = (placeTele) => {
        setSelectedData(placeTele); // 클릭된 데이터를 저장
        setIsModalOpen(true);  // 모달을 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달을 닫기
        setSelectedData(null); // 선택된 데이터 초기화
    };

    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [bookmarkList, setBookmarkList] = useState([]);

    useEffect(() => {
      if (getUserIdFromToken()) {
        api.get("/bookmarks")
        .then((res) => {
            setBookmarkList(res.data);
            //console.log(res.data);
        });
      }
    }, []);

    const handleIconClick2 = () => {
        setIsModalOpen2(true);  // 모달을 열기
    };

    const closeModal2 = () => {
        setIsModalOpen2(false); // 모달을 닫기
    };

    const handleBookmarkClick = (bookmark) => {
        const data = {
            bookmark_id: bookmark.bookmark_id,
            place_id: place_id,
            custom_place_name: null,
            icon_color: null,
        }
        if (getUserIdFromToken()) {
          api.post('/bookmarks/place', data)
              .then((res) => {
                  alert("북마크가 저장되었습니다");
                  // console.log('북마크가 저장되었습니다:', res.data);
                  // 필요시 추가 로직 처리
              })
              .catch((error) => {
                  // console.error('북마크 저장 중 오류 발생:', error);
                  if(error.status === 409){
                    alert("이미 저장되어 있습니다")
                  } else {
                    alert(error);
                  }
                  
              });
        }
    };

    const [board_info, setBoard_info] = useState([]);

    useEffect(() => {
      api.get(`place/reviews/${place_id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // 모든 board_info를 배열로 추출 후 상태에 저장
          const boardInfos = res.data;
          setBoard_info(boardInfos); 
          // console.log(boardInfos); // 배열 형태로 출력
          // console.log(board_info)
        } else {
          console.log("데이터가 없습니다");
        }
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생: ", error);
      });
    },[place_id]) 
      
    const [isArrowModalOpen, setIsArrowModalOpen] = useState(false);
    const openArrowModal = () => {
      //console.log('Opening modal'); // 상태 변경 전 로그 출력
      setIsArrowModalOpen(true)};
      //console.log('isModalOpen:', isArrowModalOpen); // 상태 변경 후 확인

    const closeArrowModal = () => setIsArrowModalOpen(false);

    return (
    <Container>
        <Header>
            <RestaurantName>{placeName}</RestaurantName>
        </Header>

        <RatingContainer>
          <Rating>{rating}</Rating>
          <StarWrapper>{generateStars()}</StarWrapper>
          <ReviewCount>후기 {placeReviewCnt}</ReviewCount>
          <ArrowIcon  loading="lazy" 
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/76ac410de088f9ebb3f69908cec6437dacd93967deb82a0af6ee25fa4c0b0f4b?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" 
                      alt="Arrow icon"
                      onClick={openArrowModal}
                      />
            <ModalComponent
              isOpen={isArrowModalOpen}
              onClose={closeArrowModal}
              board_info={board_info}
            />
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
                <Icon   loading="lazy" 
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7d52f98e5299a8b08ff643fede53eab7a4ff9261862a68328040c94b080e7b9?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" 
                        alt="Icon 3"
                        onClick={() => handleIconClick2()} />
            </IconContainer>
            </AddressInfo>
        </AddressContainer>

        <PhotoContainer>
          {imageUrl === "등록된 사진이 없습니다." ? (
            <p>{imageUrl}</p>
          ) : (
            // <img src={imageUrl} alt="Place" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <StyledImage src={imageUrl} alt="Place" />
          )}
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

            <ReactModal
                isOpen={isModalOpen2}
                onRequestClose={closeModal2}
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
                        height: '500px',
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
                <BookmarkListContainer>
                    <h2>북마크에 저장</h2>
                    {bookmarkList && bookmarkList.length > 0 ? (
                        bookmarkList.map((bookmark, index) => (
                            <BookmarkBox  key={index} 
                                onClick={() => handleBookmarkClick(bookmark)}
                                >
                                {bookmark.bookmark_title || `북마크 ${index + 1}`}
                            </BookmarkBox> // 예시로 name 속성 사용
                        ))
                    ) : (
                        <p>북마크가 없습니다.</p> // 북마크가 없을 경우 메시지 표시
                    )}
                    <CloseButton onClick={closeModal2}>닫기</CloseButton>
                </BookmarkListContainer>
            </ReactModal>
    </Container>
    );
}

const BookmarkBox = styled.p`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f1f1f1;
  }
`;

// 북마크 리스트 컨테이너 스타일링
const BookmarkListContainer = styled.div`
  padding: 0;
  margin: 0;
  max-width: 600px;
  margin: auto; /* 가운데 정렬 */

  h2 {
    margin-bottom: 20px;
  }
`;

// Styled-components for styling
const SmallModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseButton = styled.button`
    margin-top: 10px;
    padding: 10px 10px;
    border: none;
    border-radius: 5px;
    background-color: #ed6000;
    color: white;
    cursor: pointer;
    font-size: 16px;

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
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Rating = styled.span`
  color: #ed6000;
  font-size: 20px;
  letter-spacing: 0.61px;
  margin: auto 0;
`;

const StarWrapper = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 3px;
`;

const RatingStar = styled.div`
  width: 20px;
  height: 20px;
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 
    50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
  ); /* 별 모양을 만듭니다 */
  background: ${(props) => 
    props.filled ? '#ed6000' : 
    props.half ? 'linear-gradient(to right, #ed6000 50%, #d9d9d9 50%)' : 
    '#d9d9d9'};
  /* 가득 차면 orange, 반은 반만 색칠된 그라데이션, 빈 별은 회색 */
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
  margin-top: 9px;
  cursor: pointer;
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
  cursor: pointer;
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

// const PhotoContainer = styled.section`
//   border-radius: 10px;
//   background-color: #d9d9d9;
//   margin-top: 23px;
//   color: #000;
//   text-align: center;
//   letter-spacing: 0.52px;
//   padding: 94px 70px;
//   font: 400 17px/25px Roboto, sans-serif;
// `;
const PhotoContainer = styled.section`
  border-radius: 10px;
  background-color: #d9d9d9;
  margin-top: 23px;
  color: #000;
  text-align: center;
  letter-spacing: 0.52px;
  font: 400 17px/25px Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px; // Example height, adjust based on your needs
  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px; // Optional if you want rounded corners for the image
`;



export default PlaceInfoSheet;