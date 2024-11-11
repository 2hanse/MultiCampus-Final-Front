import React, { useEffect, useState } from "react";

function Timer({ initialTime, onTimeUp }) {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    console.log(`Timer initialized with: ${initialTime}`);
    // initialTime이 변경될 때 remainingTime을 재설정
    setRemainingTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      if (onTimeUp) onTimeUp();
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [remainingTime, onTimeUp]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };



  return (
    <div>
      인증번호가 발송되었습니다: <span style={{ color: "red" }}>{formatTime(remainingTime)}</span>
    </div>
  );
}

export default Timer;