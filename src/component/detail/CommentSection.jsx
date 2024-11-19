import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

function CommentSection({ comments, detail }) {
  
  return (
    <CommentSectionContainer>
      {comments.map((comment) => (
        <Comment
          key={comment.comment_id}
          comment={comment}
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
