'use client';

import QuestionForm from './QuestionForm';
import Image from 'next/image';
import PlusQuestionBtn from './PlusQuestionBtn';
import PageUpBtn from '@/components/common/PageUpBtn';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertQuizToTable } from '@/api/quizzes';

import { QuestionType, type Question, type Quiz } from '@/types/quizzes';
import { BlueInput, BlueLevelSelect, BlueTextArea } from '@/components/common/BlueInput';

const QuizForm = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState('');
  const [selectedImg, setSelectedImg] = useState('https://via.placeholder.com/208x208');
  const [file, setFile] = useState(null);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: crypto.randomUUID(),
      type: QuestionType.objective,
      title: '',
      options: [
        {
          id: crypto.randomUUID(),
          content: '',
          isAnswer: false
        },
        {
          id: crypto.randomUUID(),
          content: '',
          isAnswer: false
        }
      ]
      // imgUrl: '',
      // correctAnswer: ''
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  /** 스크롤 이동 추적 이벤트 */
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  /** 썸네일 이미지 클릭 이벤트 */
  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  /** 썸네일 이미지 클릭하여 이미지 파일 첨부하기 */
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /** 취소 버튼 클릭 핸들러 */
  const handleCancelBtn = () => {
    if (!window.confirm('작성하던 내용이 모두 사라집니다. 취소하시겠습니까?')) return;
    router.push('/quiz-list');
  };

  /** 문제 추가하기 버튼 클릭 핸들러 */
  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          id: crypto.randomUUID(),
          type: QuestionType.objective,
          title: '',
          options: [
            {
              id: crypto.randomUUID(),
              content: '',
              isAnswer: false
            },
            {
              id: crypto.randomUUID(),
              content: '',
              isAnswer: false
            }
          ]
        }
      ]);
    } else {
      alert('최대 5개까지만 문제를 추가할 수 있습니다.');
      return;
    }
  };

  /** 퀴즈 등록 mutation */
  // const insertQuizMutation = useMutation({
  //   mutationFn:
  // });

  /** 등록 버튼 클릭 핸들러 */
  const handleSubmitBtn = () => {
    if (!level) {
      alert('난이도를 선택해주세요.');
      return;
    }
    if (!title || !info) {
      alert('제목과 설명을 입력해주세요.');
      return;
    }

    try {
      const fileName = file.name;
      const newQuiz = {
        creatorId: 'cocoa@naver.com',
        level,
        title,
        info,
        thumbnailImgUrl: selectedImg
      };
      insertQuizMutation.mutate(newQuiz, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['quizzes'] });
          router.replace('/quiz-list');
        }
      });
      console.log('등록될 게시글', newQuiz);
    } catch (error) {
      console.error('퀴즈 등록 중 오류 발생', error);
    }
  };

  return (
    <main className="bg-blue-50 flex gap-5 flex-col justify-center items-center">
      <form
        className="flex flex-col min-w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitBtn();
        }}
      >
        <div className="p-10 flex gap-10 bg-white justify-center items-center">
          <div
            onClick={handleImgClick}
            className="bg-gray-200 w-52 h-52 border-solid border border-blue-500 flex items-center"
          >
            <Image
              src={selectedImg}
              alt="샘플이미지"
              className="object-cover"
              style={{ cursor: 'pointer' }}
              width={208}
              height={208}
            />
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              onChange={handleImgChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <BlueLevelSelect value={level} onChange={(value) => setLevel(value)} />
            <BlueInput value={title} onChange={(e) => setTitle(e.target.value)} />
            <BlueTextArea value={info} onChange={(e) => setInfo(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col">
          <QuestionForm questions={questions} setQuestions={setQuestions} />
        </div>
        <PlusQuestionBtn onClick={handleAddQuestion} />
        <div className="flex gap-2">
          <button type="button" onClick={handleCancelBtn}>
            취소하기
          </button>
          <button type="submit">등록하기</button>
        </div>
      </form>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px;' }}>
        <PageUpBtn scrollPosition={scrollPosition} />
      </div>
    </main>
  );
};

export default QuizForm;
