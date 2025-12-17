/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import  * as s  from "./styles";

import { IoHomeOutline, IoAddCircleOutline} from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { useMeQuery } from "../../queries/usersQueries";


function LeftSideBar({children}) {
    // 활성화된 메뉴에 따라 다른 스타일을 주기위해 현재 URL 경로 가져오기
    const location = useLocation();
    const {pathname} = location;

    // 정보 가져오기 (자세한 설명은 AuthRoute 참고)
    const {isLoading, data} = useMeQuery();

    return <div css={s.sideBarLayout}>
        <aside css={s.sideBarContainer}>
            <h1>Social Board</h1>
            <ul>
                <Link to={"/"}><li css={s.menuListItem(pathname === "/")}><div><IoHomeOutline /></div>Home</li></Link>
                <Link to={"/search"}><li css={s.menuListItem(pathname === "/search")}><div><MdOutlineExplore /></div>Explore</li></Link>
                <Link to={"/post/add"}><li css={s.menuListItem(pathname === "/post/add")}><div><IoAddCircleOutline /></div>Add a Post</li></Link>
                {
                    isLoading ||
                    <Link to={"/" + data.data.nickname}>
                                {/* 한글닉 인코딩 가능하게 바꾸기 */}
                        <li css={s.menuListItem(decodeURI(pathname) === "/" + data.data.nickname)}>
                            <div><div css={s.profileImg(data.data.imgUrl)}></div></div>
                        {data.data.nickname}</li>
                    </Link>
                }
            </ul>
            <div>
                <Link to={"/logout"}>Logout</Link>
            </div>
        </aside>
        <div>
            {/* children이 뭘까? AuthRoute 참고 */}
            {children}
        </div>
    </div>
}

export default LeftSideBar;