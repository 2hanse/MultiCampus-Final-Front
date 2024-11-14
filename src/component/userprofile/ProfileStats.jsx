const ProfileStats = () => {
    return (
      <section style={styles.profileStats}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7a38cc5eac3bdddc15bd83f752ef5b7883c36669787fc9f39a59bad39fb1d40?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="Profile"
          style={styles.profileImage}
        />
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <p>N</p>
            <p>게시물</p>
          </div>
          <div style={styles.statItem}>
            <p>N</p>
            <p>팔로우</p>
          </div>
          <div style={styles.statItem}>
            <p>N</p>
            <p>팔로워</p>
          </div>
        </div>
      </section>
    );
  };

  const styles = {
    profileStats: {
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