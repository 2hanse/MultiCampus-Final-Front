import { useNavigate } from 'react-router-dom';

const ProfileContent = ({ writedBoardData, handleBookmarkIconClick }) => {
  return (
    <section style={styles.profileContent}>
      {/* <nav style={styles.contentNav}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/89b61b15b519fe221e92df692e5820956878259d34838bb629e95066ac325275?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="Nav Icon"
          style={styles.navIcon}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/596b40e055c6c3096f41336ca0531e628e401ac369dec262300bba7467721588?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="Nav Icon"
          style={styles.navIcon}
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b18b77b5d6ce2798eaa729bc37d9585e29111b1ff6db2012daebed19d8146a53?placeholderIfAbsent=true&apiKey=f3a728c5dc79403b94fb2cecdb1f03f4"
          alt="Nav Icon"
          style={{ ...styles.navIcon, cursor: 'pointer' }} // 커서가 pointer로 변경
          onClick={handleBookmarkIconClick} // 이미지 클릭 시 북마크 모달 열기
        />
      </nav> */}
      <section style={styles.reviewList}>
        {writedBoardData.map((review) => (
          <ReviewListItem key={review.board_id} {...review} />
        ))}
      </section>
    </section>
  );
};

function ReviewListItem({ created_time, title, content, board_id }) {
  const nav = useNavigate();

  return (
    <article onClick={() => nav(`${board_id}`)}>
      <hr />
      <time style={styles.created_time}>{created_time}</time>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.content}>{content}</p>
    </article>
  );
}
const styles = {
  profileContent: {
    backgroundColor: '#fff',
    display: 'flex',
    marginTop: '10px',
    width: '100%',
    flexDirection: 'column',
    padding: '16px 0',
  },
  navIcon: {
    width: '30px',
    height: '30px',
    objectFit: 'contain',
  },
  reviewList: {
    marginLeft: '20px', // This will shift the review content to the right
  },
  contentNav: {
    display: 'flex',
    width: '286px',
    maxWidth: '100%',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'space-between',
    margin: '0 auto',
  },
  timestamp: {
    color: '#49454f',
    letterSpacing: '0.5px',
    font: '500 12px/16px Roboto, sans-serif',
  },
};
export default ProfileContent;
