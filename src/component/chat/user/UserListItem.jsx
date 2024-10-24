import * as React from "react";
import styled from "styled-components";

function UserListItem({ avatar, nickname }) {
  return (
    <UserListContainer>
      <UserInfo>
        <Avatar loading="lazy" src={avatar} alt={`${nickname}의 프로필 사진`} />
        <Nickname>{nickname}</Nickname>
      </UserInfo>
      <SelectIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5596d7fb08c82f2a75e3febc7897eaf3f01b90494460a3e3cb68edab63556f4d?placeholderIfAbsent=true&apiKey=12c88cfd4a664977958acab9caf9f3bf" alt="선택" />
    </UserListContainer>
  );
}

const UserListContainer = styled.article`
  display: flex;
  margin-top: 22px;
  width: 100%;
  max-width: 356px;
  gap: 20px;
  white-space: nowrap;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;
`;

const Avatar = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 60px;
  border-radius: 50%;
`;

const Nickname = styled.span`
  margin: auto 0;
  max-width: 220px; /* 라벨 크기 고정 */
  text-overflow: ellipsis; /* 넘칠 경우 ... 처리 */
  white-space: nowrap;
  overflow: hidden;
`;

const SelectIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 24px;
  margin: auto 0;
  cursor: pointer;
`;

export default UserListItem;