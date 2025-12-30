/** @jsxImportSource @emotion/react */
import { Link, useLocation } from "react-router-dom";
import  * as s  from "./styles";

import { IoHomeOutline, IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { useMeQuery } from "../../queries/usersQueries";
import AddPostModal from "../post/AddPostModal";
import { useEffect, useRef, useState } from "react";
import { RiChatSmileAiLine } from "react-icons/ri";
import OpenaiApiModal from "../openai/OpenaiApiModal";

function LeftSideBar({children}) {
    const location = useLocation();
    const { pathname } = location;
    const [ addPostModalOpen, setAddPostModalOpen] = useState(false);
    const [ openaiModalOpen, setOpenaiModalOpen] = useState(false);
    const [ homeRefresh, setHomeRefresh ] = useState(false);
    const layoutRef = useRef();   // html 객체 선택
    const { isLoading, data } = useMeQuery();

    useEffect(() => {
        if (homeRefresh) {
            setHomeRefresh(false);
        }
    }, [homeRefresh]);
    
    const handleEscKey = (e) => {
        if (e.key === "Escape" && openaiModalOpen) {
            openaiModalClose();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEscKey);
        return () => document.removeEventListener("keydown", handleEscKey);
    }, [handleEscKey]);

    
    const handleAddPostModelOpenOnClick = () => {
        setAddPostModalOpen(true);
    }

    const addPostModalClose = () => {
        setAddPostModalOpen(false);
    }

    const handleOpenaiModalOpenOnClick = () => {
        setOpenaiModalOpen(true);
    }
    
    const openaiModalClose = () => {
        setOpenaiModalOpen(false);
    }

    return <div css={s.sideBarLayout} ref={layoutRef}>
        <aside css={s.sideBarContainer}>
            <h1>Social Board</h1>
            <ul>
                <Link to={"/"}><li css={s.menuListItem(pathname === "/")}><div><IoHomeOutline /></div>Home</li></Link>
                <Link to={"/search"}><li css={s.menuListItem(pathname === "/search")}><div><MdOutlineExplore /></div>Explore</li></Link>
                <Link><li css={s.menuListItem(false)} onClick={handleAddPostModelOpenOnClick}><div><IoAddCircleOutline /></div>Add a Post</li></Link>
                {
                    isLoading || <Link to={"/" + data.data.nickname}><li css={s.menuListItem(decodeURI(pathname) === "/" + data.data.nickname)}><div><div css={s.profileImg(data.data.imgUrl)}></div></div>{data.data.nickname}</li></Link>
                }
            </ul>
            <div>
                <Link to={"/logout"}>Logout</Link>
            </div>
        </aside>
        { !homeRefresh && children } 
        {    // ref가 없는 처음에는 랜더링을 시키지 않기 위해서 조건 사용
            !!layoutRef.current && addPostModalOpen &&
            <AddPostModal 
                isOpen={addPostModalOpen} 
                onRequestClose={addPostModalClose}
                layoutRef={layoutRef}
                setHomeRefresh={setHomeRefresh} />
        }
        <div css={s.aiChat} onClick={handleOpenaiModalOpenOnClick}><RiChatSmileAiLine /></div>
        <div css={s.aiChatLayout(openaiModalOpen)}>
            <div css={s.aiChatContainer}>
                <OpenaiApiModal />
            </div>
            <button css={s.aiChatClose} onClick={openaiModalClose}>닫기</button>
        </div>
    </div>
}

export default LeftSideBar;