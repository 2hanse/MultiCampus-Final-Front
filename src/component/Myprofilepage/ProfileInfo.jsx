import React, { useState } from 'react';
import MembershipInfoModal from '../ProfilePage/MembershipInfoModal';
import styled from 'styled-components';


const ProfileInfoWrapper = styled.section`
  margin-top: 14px;
  padding: 0 15px;
`;

const Divider = styled.div`
  border-top: 1px solid #ddd;
  margin-bottom: 16px;
`;

const UserDetails = styled.div`
  border-radius: 30px;
  background-color: #fffbfb;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  color: #000;
  justify-content: space-between;
  padding: 16px 29px;
  font: 400 16px Inter, sans-serif;
`;

const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const UserName = styled.h2`
  margin: 0;
  font-size: 20px;
  margin-right: 120px;
`;

const UserRank = styled.span`
  text-align: center;
  font-size: 16px;
  cursor: pointer;
`;

function ProfileInfo({ userImage, nickname }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ProfileInfoWrapper>
      <Divider />
      <UserDetails>
        <UserAvatar
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a41dabe80615eacb53b883e9e94b260996b558b97729747665bca20736adc395?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="User Avatar"
        />
        <UserNameWrapper>
          <UserName>{nickname}</UserName>
          <UserRank onClick={openModal}>(회원 등급)</UserRank>
        </UserNameWrapper>
      </UserDetails>
      {isModalOpen && <MembershipInfoModal closeModal={closeModal} />}
    </ProfileInfoWrapper>
  );
}

export default ProfileInfo;