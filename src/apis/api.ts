import axios from "axios";

// api 호출 시 서버 주소 설정
const api = axios.create(
    {
        baseURL : "http://localhost:8080"
    }
);

// http://localhost:8080로 호출되는 요청을 가져옴
// config = 요청되고 있는 정보
api.interceptors.request.use((config) => {   
    // 로그인 성공 시 넣어둔 토큰값 가져오기
    const token = localStorage.getItem("token");

    if(token) {
        // 요청된 헤더에 
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

});

export default api;