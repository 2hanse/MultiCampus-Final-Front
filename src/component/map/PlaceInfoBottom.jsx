import styled from "styled-components";
import InfoItem from "./InfoItem";
import { useEffect, useState } from "react";
import api from "../api/axios";
import ModalComponent from "./ModalComponent";



function PlaceInfoBottom({placeAddress, placeTele, bookmarkCnt, place_id}) {
  const [placeReviewCnt, setPlaceReviewCnt] = useState(0);
  const [rating, setRating] = useState();

  useEffect(() => {
    //console.log(place_id)
    api.get(`/place/reviewscore/${place_id}`)
    .then((res) => {
      if(res.status === 200) {
        //console.log(res.data)
        const { score, imageUrl } = res.data;
        setRating(parseFloat(score).toFixed(1));
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

  const bookmarkLabel = bookmarkCnt > 0 ? `북마크로 등록된 수: ${bookmarkCnt}개` : `아무도 북마크로 등록하지 않았어요`;
  const placeReviewLabel = placeReviewCnt > 0 ? `후기 ${placeReviewCnt}` : `후기가 없어요`;

  const restaurantInfo = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/58fcf066bbd0ececdcc922fb68661db9af61007ab6ee311589369a2e1c8f883d?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c", 
      label: bookmarkLabel},
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/505231605dd364a27201e7c04a7330d353fc1329466f824a1cdcaa539889bd26?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c", 
      label: placeAddress },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6b1e0fa28ea6902c284a879a74f19628b80d2e14ec018d9b73090e58c8d150f?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c", 
      label: placeReviewLabel,
      hasRating: true },
      //hasRating: true
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/508d3db85d0eeefa5303fea0ac92cb0782d7dfb40db44bba14d6d42a29a4293d?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c", 
      label: placeTele },
  ];

  return (
    <CardContainer>
      {restaurantInfo.map((item, index) => (
        <InfoItem key={index} 
                  {...item}
                  openArrowModal={openArrowModal} />
      ))}
      <ModalComponent
        isOpen={isArrowModalOpen}
        onClose={closeArrowModal}
        board_info={board_info}
      />
    </CardContainer>
  );
}

const CardContainer = styled.section`
  background-color: #fff;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 18px;
`;

export default PlaceInfoBottom;