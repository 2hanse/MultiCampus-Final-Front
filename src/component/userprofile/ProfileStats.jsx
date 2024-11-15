const ProfileStats = ({ countBoard, countFollow, countFoller, userImage }) => {
  return (
    <section style={styles.profileStats}>
      <img src={userImage} alt="Profile" style={styles.profileImage} />
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <p>{countBoard}</p>
          <p>게시물</p>
        </div>
        <div style={styles.statItem}>
          <p>{countFollow}</p>
          <p>팔로우</p>
        </div>
        <div style={styles.statItem}>
          <p>{countFoller}</p>
          <p>팔로워</p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  profileStats: {
    backgroundColor: '#fff4d2',
    display: 'flex',
    marginTop: '50px',
    width: '100%',
    maxWidth: '355px',
    gap: '20px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
  },
  profileImage: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
  },
  statsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '35px',
    justifyContent: 'start',
    margin: 'auto 0',
  },
  statItem: {
    width: '56px',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default ProfileStats;
