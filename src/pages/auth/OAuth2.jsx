import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeQuery } from "../../queries/usersQueries";

function OAuth2() {
    const [ searchParams ] = useSearchParams();
        // get요청때 사용된 params를 가져오는것
    const accessToken = searchParams.get("accessToken");

    const navigate = useNavigate();
    if (!!accessToken) {
        localStorage.setItem("AccessToken", accessToken);
    }
    const meQuery = useMeQuery();

    useEffect(() => {
        const { isLoading, data } = meQuery;
        if (!isLoading) {
            if (data.status !== 200) {
                alert("인증이 필요합니다.");
                navigate("/auth/login");
            } else {
                alert("로그인 성공");
                navigate("/");
            }
        }
    }, [meQuery.data]);

    return <></>
}

export default OAuth2;