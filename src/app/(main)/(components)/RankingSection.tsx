import Image from 'next/image';
import LoadingImg from '@/components/common/LoadingImg';
import useMultilingual from '@/utils/useMultilingual';
import { getGameScore } from '@/api/game_scrore';
import { getQuizRank } from '@/api/quizzes';
import { getTopQuizScores } from '@/api/tries';
import { profileStorageUrl } from '@/utils/supabase/storage';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';

const RankingSection = () => {
  const [lang, setLang] = useAtom(langAtom);
  const m = useMultilingual(lang, 'ranking-section');

  const { data: gameScores, isLoading: isLoadingGameScores } = useQuery({
    queryKey: ['getScore'],
    queryFn: getGameScore
  });

  const { data: quizRank, isLoading: isLoadingQuizRank } = useQuery({
    queryKey: ['getQuizRanking'],
    queryFn: getQuizRank
  });

  const { data: quizScoreRank, isLoading: isLoadingQuizScoreRank } = useQuery({
    queryKey: ['topQuizScores'],
    queryFn: getTopQuizScores
  });

  if (isLoadingGameScores || isLoadingQuizRank || isLoadingQuizScoreRank) {
    return <LoadingImg height="400px" />;
  }

  return (
    <>
      <p className="w-[1440px] px-6 py-4 text-lg font-bold text-pointColor1 bg-bgColor1 border-y-2 border-solid border-pointColor1">
      {m('HALL_OF_FAME')}
      </p>
      <section className="flex">
        <div className="w-1/3 p-8 border-r border-solid border-pointColor1">
          <div className="flex">
            <h2 className="mb-4 text-lg font-bold">{m('QUIZ_CREATOR')}</h2>
          </div>
          {quizRank &&
            quizRank.map((item, index) => (
              <div
                key={index}
                className={`mt-4 pb-4 flex items-center ${
                  index !== quizRank.length - 1 && 'border-b border-solid border-pointColor1'
                }`}
              >
                {item.avatar_img_url && (
                  <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                    <Image
                      src={`${profileStorageUrl}/${item.avatar_img_url}`}
                      alt="프로필 이미지"
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                  <h2 className="text-pointColor1">{m('COUNT')} {item.quiz_count}</h2>
                </div>
              </div>
            ))}
        </div>
        <div className="w-1/3 p-8 border-r border-solid border-pointColor1">
          <div className="flex">
            <h2 className="mb-4 text-lg font-bold">{m('QUIZ_MASTER')}</h2>
          </div>
          {quizScoreRank &&
            quizScoreRank.map((item, index) => (
              <div
                key={index}
                className={`mt-4 pb-4 flex items-center ${
                  index !== quizScoreRank.length - 1 && 'border-b border-solid border-pointColor1'
                }`}
              >
                {item.avatar_img_url && (
                  <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                    <Image
                      src={`${profileStorageUrl}/${item.avatar_img_url}`}
                      alt="프로필 이미지"
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                  <h2 className="text-pointColor1">{m('SCORE')} {item.score}</h2>
                </div>
              </div>
            ))}
        </div>
        <div className="w-1/3 p-8 border-solid border-pointColor1">
          <div className="flex">
            <h2 className="mb-4 text-lg font-bold">{m('KEYBOARD_WARRIOR')}</h2>
          </div>
          {gameScores &&
            gameScores.map((score, index) => (
              <div
                key={index}
                className={`mt-4 pb-4 flex items-center ${
                  index !== gameScores.length - 1 && 'border-b border-solid border-pointColor1'
                }`}
              >
                {score.avatar_img_url && (
                  <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                    <Image
                      src={`${profileStorageUrl}/${score.avatar_img_url}`}
                      alt="프로필 이미지"
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium mb-1">{score.nickname}</h3>
                  <h2 className="text-pointColor1">{m('SCORE')} {score.score}</h2>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default RankingSection;
