/** @jsxImportSource @emotion/react */
import Loading from "../../components/common/Loading";
import { useGetFeeds } from "../../queries/postQueries";
import * as s  from "./styles";

function Home() {
    const { isLoading, data } = useGetFeeds();
    console.log("isLoading:", isLoading);
    console.log("data:", data)
    return <div css={s.layout}>
        <div css={s.feedContainer} >
            {
                (isLoading && <Loading />) 
                || data.pages.map(feeds => 
                    feeds.data.contents.map(feed => (
                <div css={s.feedItemContainer}>
                    <header>
                        <div css={s.profileImage(feed.user.imgUrl)}></div>
                        <div css={s.userInfo}>
                            <div>{feed.user.nickname}</div>
                            <div>{feed.createdAt}</div>
                        </div>
                    </header>
                    <main></main>
                    <footer></footer>
                </div>
                )))
            }
        </div>
        <div css={s.followInfoContainer} ></div>
    </div>
}

export default Home;