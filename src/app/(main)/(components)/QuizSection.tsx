import { getRecentQuizzes } from '@/api/quizzes';
import { useQuery } from '@tanstack/react-query';
import QuestionEx from './QuestionEx';
import Image from 'next/image';
import Link from 'next/link';

import type { Quiz } from '@/types/quizzes';
import { storageUrl } from '@/utils/supabase/storage';

const QuizSection = () => {
  const { data: quiz, isLoading } = useQuery<Quiz[]>({
    queryKey: ['recentQuiz'],
    queryFn: getRecentQuizzes,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <div className="w-[1440px] px-6 py-4 flex justify-between items-center text-lg font-bold text-pointColor1 bg-bgColor1 border-b-2 border-solid border-pointColor1">
        <p className="">최근 올라온 퀴즈</p>
        <Link href={`/quiz-list`} className="font-semibold text-pointColor1">
          더보기
        </Link>
      </div>
      <section className="px-6 py-4 grid grid-cols-4 gap-5">
        {quiz?.map((quiz) => (
          <div
            key={quiz.id}
            className="p-4 flex flex-col my-5 border border-solid border-grayColor1 rounded-t-3xl rounded-b-md transition duration-300 ease-in-out transform hover:border-blue-500"
          >
            <p className="font-bold text-lg mt-4 mb-3 truncate">{quiz.title}</p>
            <div className="flex flex-col gap-3">
              <Image
                src={`${storageUrl}/quiz-thumbnails/${quiz.thumbnail_img_url}`}
                alt="퀴즈 썸네일"
                width={250}
                height={250}
                quality={100}
                className="w-full h-[250px] object-cover border border-solid border-grayColor1 rounded-md"
              />
              <QuestionEx id={quiz.id} />
              <Link href={`/quiz/${quiz.id}`}>
                <div className="p-2 text-center text-white bg-pointColor1 rounded-md">퀴즈 풀기</div>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default QuizSection;
