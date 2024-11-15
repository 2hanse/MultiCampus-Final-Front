import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

function CommentSection({ comments }) { // props로 comments 받음
  return (
    <CommentSectionContainer>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          avatar={comment.avatar}
          name={comment.name}
          content={comment.content}
          timestamp={comment.timestamp}
          likes={comment.likes}
        />
      ))}
    </CommentSectionContainer>
  );
}

const CommentSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  padding: 0;
`;

export default CommentSection;
