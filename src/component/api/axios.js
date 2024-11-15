import axios from 'axios';

const api = axios.create({
  baseURL: 'http://211.225.141.117:8000/'
});


// 요청 인터셉터 추가 - Authorization 헤더 자동 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 로컬저장소에서 토큰 가져오기
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
