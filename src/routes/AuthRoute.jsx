import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import { useEffect } from "react";
import OAuth2 from "../pages/auth/OAuth2";
import { useMeQuery } from "../queries/usersQueries";
import Logout from "../pages/auth/Logout";
import Loading from "../components/common/Loading";
import Home from "../pages/home/Home";
import LeftSideBar from "../components/common/LeftSideBar";

function AuthRoute() {
    const navigate = useNavigate();
    // location에서 구조분해할당으로 pathname만 가져옴 pathname은 /search 이런식의 url 주소
    // console.log(pathname);
    const location = useLocation();
    const {pathname} = location;


    // userEntity정보 AccessToken, 상태, 에러 등등 담겨있음
    const meQuery = useMeQuery();
    console.log(meQuery);

    useEffect(() => {
        // 구조분해할당으로 meQuery에서 isLoading과 data를 가져옴
        // data는 data:{userId: 1, oauth2Id: '비밀~', nickname: '유쾌한클로버', name: '서민재', status: 200, …} 요따구로 생김
        const { isLoading, data } = meQuery;
        if (!isLoading) {

            // 로그인 안됐는데 ["/auth/login", "/auth/login/oauth2"] 말고 다른 url로 들어가면 로그인 창으로 보내겠다
            if (data.status !== 200) {
                if (!pathname.startsWith("/auth")) {
                    navigate("/auth/login");
                }

            // 로그인 됐는데 ["/auth/login", "/auth/login/oauth2"]로 들어가면 홈으로 보내겠다  
            } else {
                if (pathname.startsWith("/auth")) {
                    navigate("/");
                }
            }
        }

        // url이나 meQuery.data 바뀔때마다 useEffect 실행 
    }, [pathname, meQuery.data]);

    // 로딩중에 실행
    if (meQuery.isLoading) {
        return <Loading />;
    }
    // 로딩 끝났는데 200아니면(토큰이 유효하지 않으면) 로그인창으로 돌려보내기
    if (meQuery.isSuccess && meQuery.data.status !== 200) {
        return <Routes>
            <Route path="/auth/login" element={<Login/>}></Route>
            <Route path="/auth/login/oauth2" element={<OAuth2/>}></Route>
        </Routes>
    }

    // 모든 조건을 통과했다면 로그인성공 => 홈으로
    return <LeftSideBar>
        {/* <LeftSideBar> 태그 사이에 있는 아래 내용들이 전부 'children'으로 전달됨 */} 
        {/* 웹사이트의 전체적인 틀(레이아웃)을 children만 갈아끼우면서 한곳에서 관리하기 위함 (LeftSideBar는 고정 Home, Logout만 바뀜)*/}
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/logout" element={<Logout/>} />
        </Routes>
    </LeftSideBar>

}

export default AuthRoute;