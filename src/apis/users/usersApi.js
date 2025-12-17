import { api } from "../config/axiosConfig"

export const requestMe = () => {
    return api.get("/api/users/me");
    // get 요청 (백엔드 UserController 참고)
}