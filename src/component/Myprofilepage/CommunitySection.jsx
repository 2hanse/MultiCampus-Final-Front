import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Section = styled.section`
  margin-top: 31px;
  padding: 0 15px;
`;

const SectionTitle = styled.h2`
  color: #000;
  font: 400 24px Inter, sans-serif;
  margin: 0 0 10px 20px;
`;

const List = styled.ul`
  border-radius: 30px;
  background-color: #fffbfb;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  color: #dfa67b;
  padding: 31px 29px;
  list-style-type: none;
  margin: 0;
`;

const ListItem = styled.li`
  font: 400 17px Inter, sans-serif;
  margin-bottom: 10px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;

function CommunitySection() {
  const navigate = useNavigate();

  const communityItems = [
    { name: '내가 쓴 게시글', path: '/profile' },
    { name: '내가 쓴 리뷰', path: '/review-history' },
    { name: '내가 쓴 댓글', path: '/comment-history' },
    { name: '북마크', path: '/homepage', openBookmarkSheet: true },
    { name: '좋아요 누른 게시글', path: '/liked-posts' },
    { name: '팔로우/팔로워', path: '/subscribe' },
  ];

  const handleItemClick = (path, openBookmarkSheet) => {
    if (path) navigate(path, { state: { openBookmarkSheet } });
  };

  return (
    <Section>
      <SectionTitle>커뮤니티</SectionTitle>
      <List>
        {communityItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => handleItemClick(item.path, item.openBookmarkSheet)}
          >
            {item.name}
          </ListItem>
        ))}
      </List>
    </Section>
  );
}

export default CommunitySection;