// src/component/pages/NotificationSection.jsx
import React, { useState } from 'react';

const styles = {
  sectionTitle: {
    color: "#000",
    font: "400 24px Inter, sans-serif",
    margin: "0 0 10px 20px",
  },
  notificationList: {
    borderRadius: "30px",
    backgroundColor: "#fffbfb",
    boxShadow: "1px 1px 4px rgba(0, 0, 0, 0.25)",
    color: "#dfa67b",
    padding: "15px 29px",
    listStyleType: "none",
    margin: "0",
  },
  notificationItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  notificationLabel: {
    color: "#dfa67b",
    font: "400 17px Inter, sans-serif",
  },
  toggleSwitch: {
    width: "40px",
    height: "22px",
    backgroundColor: "#e0e0e0",
    borderRadius: "50px",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  switchHandle: {
    width: "18px",
    height: "18px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: "2px",
    transition: "transform 0.3s ease",
  },
  enabledSwitch: {
    backgroundColor: "#ff5c5c",
  },
  enabledSwitchHandle: {
    transform: "translateX(18px)",
  },
};

function NotificationSection() {
  const [notifications, setNotifications] = useState([
    { label: "게시물 알람", enabled: true },
    { label: "댓글 알람", enabled: true },
    { label: "좋아요 알람", enabled: false },
    { label: "구독 알람", enabled: false },
  ]);

  const toggleNotification = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification, idx) =>
        idx === index
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  return (
    <section style={styles.notificationSection}>
      <h2 style={styles.sectionTitle}>알림 설정</h2>
      <ul style={styles.notificationList}>
        {notifications.map((notification, index) => (
          <li key={index} style={styles.notificationItem}>
            <span style={styles.notificationLabel}>{notification.label}</span>
            <div
              style={{
                ...styles.toggleSwitch,
                ...(notification.enabled ? styles.enabledSwitch : {}),
              }}
              onClick={() => toggleNotification(index)}
            >
              <div
                style={{
                  ...styles.switchHandle,
                  ...(notification.enabled ? styles.enabledSwitchHandle : {}),
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default NotificationSection;
