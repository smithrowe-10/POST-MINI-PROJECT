/** @jsxImportSource @emotion/react */
import { BiSend } from "react-icons/bi";
import  * as s  from "./styles";
import { useState } from "react";
import { useCreatePostCommentMutation } from "../../mutations/postMutations";
import { useGetCommentsQuery } from "../../queries/commentsQueries";

function Comment({postId}) {

    const [ inputValue, setInputValue ] = useState("");
    // 이 줄이 비동기 통신에 필요한 모든 상태 변수를 생성한 것과 같음. isLoading, error, onSuccess... 상태 묶음이라고 생각하면될듯
    const commentMutation = useCreatePostCommentMutation();
    const { isLoading, data } = useGetCommentsQuery(postId);
    
    const handleOnChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleOnSubmit = async () => {  
        const data = {
            parentCommentId: 0,
            parentUserId: 0,
            content: inputValue,
        };

        // mutateAsync에서 mutationFn 함수 호출됨
        await commentMutation.mutateAsync({ postId, data });
        alert("댓글 작성 완료")
    }

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            handleOnSubmit();
        }
    }

    return <div css={s.layout}>
        <h2>댓글</h2>
        <div css={s.commentItemList}>
            {
                !isLoading && 
                data.data.map(comment => 
                    <div css={s.commentItem}>
                        <div>
                            <div>{comment.imgUrl}</div>
                            <div>{comment.nickname}</div>
                        </div>
                        <div>{comment.content}</div>
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