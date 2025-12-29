/** @jsxImportSource @emotion/react */
import { BiSend } from "react-icons/bi";
import  * as s  from "./styles";
import { useState } from "react";
import { useCreatePostCommentMutation } from "../../mutations/postMutations";
import { useGetCommentsQuery } from "../../queries/commentsQueries";

function Comment({postId}) {

    const [ inputValue, setInputValue ] = useState("");
    const [ recomment, setRecomment ] = useState({
        parentCommentId: 0,
        parentUserId: 0,
    });
    // 이 줄이 비동기 통신에 필요한 모든 상태 변수를 생성한 것과 같음. isLoading, error, onSuccess... 상태 묶음이라고 생각하면될듯
    const commentMutation = useCreatePostCommentMutation();
    const { isLoading, data, refetch } = useGetCommentsQuery(postId);
    
    const handleOnChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = async () => {  
        const data = {
            ...recomment,
            content: inputValue,
        };

        // mutateAsync에서 mutationFn 함수 호출됨
        await commentMutation.mutateAsync({ postId, data });
        await refetch();
        setInputValue("");
    }

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            handleOnSubmit();
        }
    }

    const handleRecommentOnClick = (commentId, userId) => {
        setRecomment({
            parentCommentId: commentId,
            parentUserId: userId,
        });
    }

    return <div css={s.layout}>
        <h2>댓글</h2>
        <div css={s.commentItemList}>
            {
                !isLoading && 
                data.data.map(comment => 
                    <div key={comment.commentId} css={s.commentItem(comment.level, comment.commentId === recomment.parentCommentId)}>
                        <div>
                            <div css={s.commentProfileImage(comment.imgUrl)}></div>
                            <div>{comment.nickname}</div>
                        </div>
                        <div><span>{!!comment.parentNickname && "@" + comment.parentNickname}</span> {comment.content}</div>
                        <div>
                            {new Date(comment.createdAt).toLocaleString()}
                            {
                                !comment.parentCommentId && (comment.commentId == recomment.parentCommentId 
                                ? <span onClick={() => handleRecommentOnClick(0, 0)}>답글취소</span> 
                                : <span onClick={() => handleRecommentOnClick(comment.commentId, comment.userId)}>답글달기</span>
                            )}
                        </div>
                    </div>
                )
            }

        </div>
        <div>
            <div css={s.commentInput}>
                <input type="text" 
                    placeholder="댓글을 입력하세요."
                    value={inputValue}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    />
                <BiSend onClick={handleOnSubmit}/>
            </div>
        </div>
    </div>
}

export default Comment;