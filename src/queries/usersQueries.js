import { useQuery } from "@tanstack/react-query"
import { requestMe } from "../apis/users/usersApi"

export const useMeQuery = () => {
    const accessToken = localStorage.getItem("AccessToken");
                        // localStorage는 F12 application에있음
    return useQuery({
        queryKey: ["me", accessToken],
        queryFn: async () => {
            try {
                return await requestMe();
            } catch (error) {
                return error.response;
            }

        },
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
}