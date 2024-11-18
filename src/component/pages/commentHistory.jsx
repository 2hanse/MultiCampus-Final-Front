import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import SearchActions from '../ProfilePage/SearchActions';
import api from '../api/axios';
import {getUserIdFromToken} from '../api/jwt'; // userid




function CommentHistory() {

  // const navigate = useNavigate();
 
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  

  const getUserInfo = async () => {
    try {
      const response = await api.get('/users/me/comments');
      console.log("data: " , response);
      setCommentList(response.data);
      console.log("댓글: ", commentList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Main>
      <Header color="#fff4d2" title="남긴 댓글" actions={<SearchActions />} />
      <SortSection>
        {/* <FilterButton>
          등록순
          <SortIcon
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/745f4a325798408d80543bbacf1852135593f5c0514bd614a697a7386fbb93c1?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
            alt=""
          />
        </FilterButton> */}
      </SortSection>
      <CommentList>
        {commentList.map((comment, index) => (
          // comment는 각각 하나의 객체를 의미함. 0번, 1번, ... 큰 테두리
          <CommentItem
            key={index}
            created_at={comment.created_at}
            // comment : 0번째에서 , created_at : 2024- ~ 를 의미.
            comment={comment.comment}
          />
        ))}
      </CommentList>
      <Footer />
    </Main>
  );
}

function CommentItem({ created_at, comment}) {

  return (
    <StyledCommentItem>
      <CommentContent>
        <time className="timestamp">{created_at}</time>
        <p className="comment-text">{comment}</p>
      </CommentContent>
      <Divider />
    </StyledCommentItem>
  );
}

// Styled Components
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 430px;
  margin: 0 auto;
  border: 0.5px solid #CAC4D0;
  background: #ffffff;
`;

const SortSection = styled.div`
  display: flex;
  align-items: center;
  margin: 27px 38px 0 0;
  align-self: flex-end;
`;

// const FilterButton = styled.button`
//   display: flex;
//   align-items: center;
//   color: #000;
//   font: 400 13px/1 Roboto, sans-serif;

//   .sort-text {
//     margin-right: 8px;
//   }
// `;

// const SortIcon = styled.img`
//   width: 16px;
//   height: 16px;
// `;

const CommentList = styled.section`
  width: 100%;
  height: calc(100vh - 216px);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;  /* IE 및 Edge */
  scrollbar-width: none;  /* Firefox */
`;

const StyledCommentItem = styled.article`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  margin-top: 11px;
`;

const CommentContent = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: column;

  .timestamp {
    color: #49454f;
    font: 500 12px/16px Roboto;
    letter-spacing: 0.5px;
  }

  .comment-text {
    color: #1d1b20;
    font: 16px/24px Roboto;
    letter-spacing: 0.5px;
  }

  .post-title {
    color: #49454f;
    font: 14px/20px Roboto;
    letter-spacing: 0.25px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #cac4d0;
  margin: 0 16px;
`;

export default CommentHistory;
