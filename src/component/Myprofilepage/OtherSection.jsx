// src/component/pages/OtherSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  sectionTitle: {
    color: "#000",
    font: "400 24px Inter, sans-serif",
    margin: "0 0 10px 20px",
  },
  otherList: {
    borderRadius: "30px",
    backgroundColor: "#fffbfb",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    color: "#dfa67b",
    padding: "15px 29px",
    listStyleType: "none",
    margin: "0",
  },
  otherItem: {
    font: "400 17px Inter, sans-serif",
    marginBottom: "10px",
  },
  otherItemLast: {
    marginBottom: "0",
  },
};

function OtherSection() {
  const navigate = useNavigate();

  const otherItems = [
    { name: '영수증', path: '/receipt-collection' },
    { name: '위치 인증', path: '/mylocation' },
  ];

  const handleItemClick = (path) => {
    if (path) navigate(path);
  };

  return (
    <section style={styles.otherSection}>
      <h2 style={styles.sectionTitle}>기타</h2>
      <ul style={styles.otherList}>
        {otherItems.map((item, index) => (
          <li
            key={index}
            style={{
              ...styles.otherItem,
              ...(index === otherItems.length - 1 ? styles.otherItemLast : {}),
              cursor: "pointer", // 손 모양 커서 스타일 추가
            }}
            onClick={() => handleItemClick(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default OtherSection;
