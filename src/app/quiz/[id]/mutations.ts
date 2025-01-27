import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertAdmin, insertReport } from '@/api/admin';
import { insertQuizTry, updateQuizScore  } from '@/api/tries';
import { deleteQuiz } from '@/api/quizzes';
import { toast } from 'react-toastify';

import type { QuizTry } from '@/types/quizzes';
import type { Admin, Report } from '@/types/admin';

export const useSubmitQuizTry = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (quizTry: QuizTry) => {
      try {
        const result = await insertQuizTry(quizTry);
        return result;
      } catch (error) {
        console.log('퀴즈 점수 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz_tries'] });
    }
  });

  return mutation;
};

export const useUpdateQuizTry = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (quizTry: QuizTry) => {
      try {
        const result = await updateQuizScore(quizTry);
        return result;
      } catch (error) {
        console.log('퀴즈 점수 업데이트 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz_tries'] });
    }
  });

  return mutation;
};

export const useSubmitAdmin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (admin: Admin) => {
      try {
        const result = await insertAdmin(admin);
        return result;
      } catch (error) {
        console.log('관리 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    }
  });

  return mutation;
};

export const useSubmitReport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (report: Report) => {
      try {
        const result = await insertReport(report);
        return result;
      } catch (error) {
        console.log('신고 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    }
  });

  return mutation;
};

/** quizzes 테이블에서 id에 해당하는 퀴즈 삭제 */
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  const deleteQuizMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await deleteQuiz(id);
      } catch (error) {
        console.error('퀴즈 삭제 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('퀴즈가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    }
  });

  return deleteQuizMutation;
};
