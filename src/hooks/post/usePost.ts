import { postDetailDate, postDetailUserDate } from '@/api/posts';
import { PostDetailDateType, PostDetailUserType } from '@/types/posts';
import { useQuery } from '@tanstack/react-query';

export const usePostDetailDate = (postId: string | string[]) => {
  return useQuery<PostDetailDateType>({
    queryKey: ['post', postId],
    queryFn: () => postDetailDate(postId)
  });
};

export const usePostDetailUserDate = (userId: string | undefined) => {
  return useQuery<PostDetailUserType>({
    queryKey: ['postUser', userId],
    queryFn: () => postDetailUserDate(userId)
  });
};
