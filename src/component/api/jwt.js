export const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    // 토큰 payload 부분 추출 (중간 부분)
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;
  
    try {
      // 디코딩하여 JSON 객체로 변환
      const payload = JSON.parse(atob(payloadBase64));
      return payload.user_id; // user_id 필드에서 추출
    } catch (error) {
      console.error("Failed to decode token payload:", error);
      return null;
    }
  };