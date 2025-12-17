import { useQuery } from "@tanstack/react-query"
import { requestMe } from "../apis/users/usersApi"

export const useMeQuery = () => {
    const accessToken = localStorage.getItem("AccessToken");
                        // localStorage는 F12 application에있음
    return useQuery({
        // me라는 키에 accessToken value를 집어넣음 map 형식
        queryKey: ["me", accessToken],

        queryFn: async () => {
            // user 엔티티를 받아옴 성공하면 { id: 1, name: "서민재", email: "..." } 같은값 들어옴
            try {
                return await requestMe();
            } catch (error) {
            // 로그인이 안된 상태라면 401 반환 (401뜻 = 니 누고 시벌럼.) (백엔드 JwtAuthenticationEntryPoint, SecurityConfig 참고)
                return error.response;
            }
        },

        // 둘이 하나라고 보면됨 유통기한 / 폐기시간
        // 가져온 데이터를 얼마나 오래 유지할건지? (이 시간동안은 재로그인 필요없음)
        staleTime: 1000 * 60 * 60 * 24,
        // 쿼리가 24시간 동안 사용되지 않았다면 메모리에서 삭제
        gcTime: 1000 * 60 * 60 * 24,
    });
}