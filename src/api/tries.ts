import { supabase } from '@/utils/supabase/supabase';
import type { QuizTry, QuizTryRank } from '@/types/quizzes';

export const insertQuizTry = async (quizTries: QuizTry) => {
  try {
    const { error } = await supabase.from('quiz_tries').insert([quizTries]).select('*');
    if (error) throw error;
  } catch (error) {
    console.log('퀴즈 점수 등록 실패', error);
    alert('퀴즈 점수를 등록하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const updateQuizScore = async (userId: string | null, quizId: string | string[], score: number) => {
  try {
    const { error } = await supabase.from('quiz_tries').update({ score }).eq('user_id', userId).eq('quiz_id', quizId);
    if (error) throw error;
  } catch (error) {
    console.log('퀴즈 점수 업데이트 실패', error);
    alert('퀴즈 점수를 업데이트하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getTopQuizScores = async (): Promise<QuizTryRank[]> => {
  try {
    const { data: quizScores, error } = await supabase.rpc('get_quiz_tries_with_details').limit(3);
    
    if (error) throw error;

    return quizScores;

  } catch (error) {
    console.log('퀴즈 점수 가져오기 실패:', error);
    // alert('퀴즈 점수를 가져오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

