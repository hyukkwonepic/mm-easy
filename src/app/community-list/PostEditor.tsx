'use client';

import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';
import React from 'react';
import type { Params } from '@/types/posts';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import { CancelButton, SubmitButton } from '@/components/common/FormButtons';

const TextEditor = dynamic(() => import('../(components)/NoticeEditor'), { ssr: false });

type Props = {
  onCancel?: () => void;
  onSubmit?: (values: { category: string; title: string; content: ReactQuill.Value }) => void;
};

const PostEditor = ({ onCancel, onSubmit }: Props) => {
  const { getCurrentUserProfile } = useAuth();
  const params = useParams<Params>();

  // TODO: categories
  // TODO: 관리자는 공지 카테고리 추가하기
  const baseCategories = [
    { id: 'question', value: '질문', label: '질문' },
    { id: 'chat', value: '잡담', label: '잡담' },
    { id: 'study', value: '공부', label: '공부' },
    { id: 'diary', value: '일기', label: '일기' }
  ];
  const categories = [...baseCategories];

  const [selectedCategory, setSelectedCategory] = React.useState<string>(categories[0].value);
  const [title, setTitle] = React.useState('');
  const [textEditorValue, setTextEditorValue] = React.useState<ReactQuill.Value>('');

  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  if (isLoading) return null;

  if (error) return null;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (!onSubmit) {
          return;
        }
        onSubmit({
          category: selectedCategory,
          title,
          content: textEditorValue
        });
      }}
    >
      <section className="flex border-b border-pointColor1 border-solid">
        {categories.map(({ id, value, label }) => (
          <div key={id}>
            <div
              className={`font-bold rounded-tl-lg rounded-tr-lg text-lg px-6 pt-1 cursor-pointer  ${
                selectedCategory === value ? 'bg-pointColor1 text-white' : 'bg-white'
              }`}
              onClick={() => {
                setSelectedCategory(value);
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </section>
      <div>
        <input
          className="w-full focus:outline-none font-medium h-24 text-3xl placeholder-gray-300"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          placeholder=" 제목을 입력하세요."
          maxLength={36}
        />
      </div>
      <div>
        <TextEditor value={textEditorValue} onChange={setTextEditorValue} />
      </div>
      <div className="pt-14 flex justify-center gap-5 font-bold">
        <CancelButton text="취소" onClick={onCancel} width="w-[15%]" border="border-2" />
        <SubmitButton text="제출" width="w-[15%]" />
      </div>
    </form>
  );
};

export default PostEditor;
