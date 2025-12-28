import { useMutation } from "@tanstack/react-query";
import { createPost } from "../apis/posts/postsApi";
import { createComments } from "../apis/posts/CommentsApi";

// 게시글 생성을 위한 커스텀 Hook 정의
export const useCreatePostMutation = () => useMutation({
    // mutation을 식별하는 고유 키 (캐싱이나 직접적인 상태 변경 시 참조됨)
    mutationKey: ["createPost"], 
    // 실제 비동기 요청을 수행하는 함수. data를 인자로 받아 API 호출 결과를 기다림(await)
    mutationFn: async(data) => {
        return await createPost(data);
    }
});

export const useCreatePostCommentMutation = () => useMutation({
    mutationKey: ["createPostComment"],
    mutationFn: async({postId, data}) => {
        return await createComments(postId, data);
    }
});