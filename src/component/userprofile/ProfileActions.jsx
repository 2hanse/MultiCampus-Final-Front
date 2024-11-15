import { useNavigate } from 'react-router-dom';

const ProfileActions = ({ handleFollowButtonClick, isFollowing }) => {
  const navigate = useNavigate();

  const handleMessageButtonClick = () => {
    navigate('/user/chat/list'); // 이동할 경로 설정
  };

  return (
    <div style={styles.profileActions}>
      <button
        style={{
          ...styles.followButton,
          backgroundColor: isFollowing ? 'white' : 'skyblue', // 팔로잉일 때 배경색을 흰색으로 설정
          color: isFollowing ? '#000' : '#fff', // 팔로잉일 때 글자색을 검정색으로 설정
        }}
        onClick={handleFollowButtonClick}
      >
        {isFollowing ? '팔로잉' : '팔로우'}
      </button>
      <button style={styles.messageButton} onClick={handleMessageButtonClick}>
        메시지
      </button>
    </div>
  );
};

const styles = {
  profileActions: {
    display: 'flex',
    marginTop: '25px',
    marginBottom: '25px',
    width: '100%',
    gap: '20px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    padding: '0 28px',
  },
  messageButton: {
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
    padding: '9px 36px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  followButton: {
    borderRadius: '5px',
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',
    padding: '9px 36px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  },
};
export default ProfileActions;
