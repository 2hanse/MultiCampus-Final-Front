// src/component/pages/AccountSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  sectionTitle: {
    color: "#000",
    font: "400 24px Inter, sans-serif",
    margin: "0 0 10px 20px",
  },
  accountInfoList: {
    borderRadius: "30px",
    backgroundColor: "#fffbfb",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    color: "#dfa67b",
    padding: "15px 29px",
    listStyleType: "none",
    margin: "0",
  },
  accountItem: {
    color: "#dfa67b",
    font: "400 17px Inter, sans-serif",
    marginBottom: "10px",
    marginTop: "10px",
    cursor: "pointer",
  },
};

function AccountSection({ openLogoutModal }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    openLogoutModal();
  };

  return (
    <section style={styles.accountSection}>
      <h2 style={styles.sectionTitle}>계정</h2>
      <ul style={styles.accountInfoList}>
        <li
          style={styles.accountItem}
          onClick={() => navigate("/user/me/changePassword")}
        >
          비밀번호 변경
        </li>
        <li
          style={styles.accountItem}
          onClick={handleLogout}
        >
          로그 아웃
        </li>
      </ul>
    </section>
  );
}

export default AccountSection;
