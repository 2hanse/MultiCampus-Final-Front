import styled from 'styled-components';

const ratingCategories = [
  { name: '맛', id: 'rate_flavor' },
  { name: '가성비', id: 'rate_price' },
  { name: '분위기', id: 'rate_mood' },
  { name: '서비스', id: 'rate_kind' },
  { name: '청결', id: 'rate_clean' },
];

const RatingSection = ({ ratings, onRatingChange }) => {
  return (
    <Container>
      <RatingContainer>
        {ratingCategories.map((category) => (
          <RatingItem key={category.id}>
            <RatingLabel htmlFor={category.id}>{category.name}</RatingLabel>
            <StarContainer>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => onRatingChange(category.id, star)}
                  isActive={ratings[category.id] >= star} // 현재 평가에 따라 색상 변경
                >
                  ★
                </Star>
              ))}
            </StarContainer>
          </RatingItem>
        ))}
      </RatingContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px; // 원하는 패딩 값으로 설정
`;

const RatingContainer = styled.section`
  border-radius: 3px;
  background-color: #fff;
  border: 1px solid #b7b2b2;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 15px 5px 10px;
  margin: 0 auto; // 화면 중앙으로 정렬
  align-items: center; // 수직 중앙 정렬 추가
  justify-content: space-between;
`;

const RatingLabel = styled.label`
  font-size: 13px;
  font-weight: bold;
  color: #ed6000;
  letter-spacing: 1px;
  text-align: center;
  overflow: visible; // 텍스트 잘리지 않도록
  white-space: nowrap; // 줄바꿈 방지
  width:40px;
`;

const RatingItem = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 5px;
  // width: 50%;
  flex: 0 1 calc(50% - 30px);
  margin-bottom: 14px;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 5px; // 별 사이 간격
`;


const Star = styled.span`
  font-size: 20px;
  cursor: pointer;
  color: ${({ isActive }) =>
    isActive ? '#ed6000' : '#b7b2b2'}; // 활성화된 별은 색상 변경
`;

export default RatingSection;
