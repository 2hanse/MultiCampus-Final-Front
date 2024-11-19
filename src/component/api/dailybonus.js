import api from "./axios";

const checkDailyAttendance = async () => {
    const lastCheck = localStorage.getItem('lastDailyCheck');
    const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 (YYYY-MM-DD)

    if (lastCheck !== today) {
        try {
            // 출석체크 API 호출
            api.put('/users/daily')
                .then((res) => {
                    localStorage.setItem('lastDailyCheck', today);
                });
        } catch (error) {
            console.error('출석체크 실패:', error);
        }
    } else {
        console.log('오늘은 이미 출석체크를 완료했습니다.');
    }
};

export default checkDailyAttendance;