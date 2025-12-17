import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});


    // 브라우저에서 서버로 요청이 '날아가기 직전'에 이 코드가 가로챔
api.interceptors.request.use(config => {
    // 브라우저의 로컬 스토리지에서 "AccessToken"이라는 이름으로 저장된 값을 꺼내옴
    const accessToken = localStorage.getItem("AccessToken");

    // 백엔드의 Spring Security(JwtFilter)는 Bearer를 보고 식별하기때문에 신분증 만들어줌
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
})