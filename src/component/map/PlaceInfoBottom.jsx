import styled from "styled-components";
import InfoItem from "./InfoItem";
import { useEffect, useState } from "react";
import api from "../api/axios";



function PlaceInfoBottom({placeAddress, placeTele, bookmarkCnt, place_id}) {
  const [placeReviewCnt, setPlaceReviewCnt] = useState(0);

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

  const bookmarkLabel = bookmarkCnt > 0 ? `북마크로 등록된 수: ${bookmarkCnt}개` : `아무도 북마크로 등록하지 않았어요`;
  const placeReviewLabel = placeReviewCnt > 0 ? `후기 ${placeReviewCnt}` : `후기가 없어요`;

  const restaurantInfo = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/58fcf066bbd0ececdcc922fb68661db9af61007ab6ee311589369a2e1c8f883d?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c", 
      label: bookmarkLabel},
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/505231605dd364a27201e7c04a7330d353fc1329466f824a1cdcaa539889bd26?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c", 
      label: placeAddress },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6b1e0fa28ea6902c284a879a74f19628b80d2e14ec018d9b73090e58c8d150f?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c", 
      label: placeReviewLabel },
      //hasRating: true
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/508d3db85d0eeefa5303fea0ac92cb0782d7dfb40db44bba14d6d42a29a4293d?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c", 
      label: placeTele },
  ];

  return (
    <CardContainer>
      {restaurantInfo.map((item, index) => (
        <InfoItem key={index} {...item} />
      ))}
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