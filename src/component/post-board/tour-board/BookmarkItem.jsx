import styled from 'styled-components';

const BookmarkItem = ({ bookmark_title, list_count }) => {
  return (
    <ItemWrapper>
      <ItemContent>
        <GroupName>
          {bookmark_title} <AuthorName>(user이름 가져와야댐)</AuthorName>
        </GroupName>
        <GroupCount>개수 수정해야댐 {list_count}/500</GroupCount>
      </ItemContent>
      <ExpandIcon
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1541bad3fc27abbfb842592920ca5dba61084f952fe090a89d971ec02a989bf?placeholderIfAbsent=true&apiKey=96b0aafc0bca4efc865afcf9a032943c"
        alt="Expand"
      />
    </ItemWrapper>
  );
};

const ItemWrapper = styled.li`
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  min-height: 80px;
  width: 100%;
  padding-left: 50px;
  margin-bottom: 15px;
  align-items: center;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const GroupName = styled.h3`
  color: #757575;
  letter-spacing: 0.5px;
  font: 400 16px/24px Roboto, sans-serif;
  margin: 0;
`;

const AuthorName = styled.span`
  color: #757575;
`;

const GroupCount = styled.p`
  color: #49454f;
  letter-spacing: 0.25px;
  font: 400 14px/20px Roboto, sans-serif;
  margin: 0;
`;

const ExpandIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
`;

const ToggleSwitch = styled.div`
  border-radius: 100px;
  background-color: ${(props) => (props.isActive ? '#f4b183' : '#ccc')};
  position: absolute;
  right: 26px;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 32px;
  border: 1px solid #dfa67b;
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${(props) => (props.isActive ? 'calc(100% - 26px)' : '2px')};
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 50%;
    transition: 0.2s;
  }
`;

export default BookmarkItem;
