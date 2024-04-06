'use client';

import Image from 'next/image';
import Link from 'next/link';
import SubHeader from '@/components/common/SubHeader';
import Comment from '../../(components)/Comment';
import CommunityMenu from '../../(components)/CommunityMenu';
import CommunityForm from '../../(components)/CommunityForm';
import DOMPurify from 'dompurify';
import Like from '../../(components)/Like';
import { useEffect, useState } from 'react';
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import { formatToLocaleDateTimeString } from '@/utils/date';

import type { Post, PostDetailDateType } from '@/types/posts';
import { getPosts } from '@/api/posts';
import { toast } from 'react-toastify';

const DetailPage = () => {
  const [post, setPost] = useState<PostDetailDateType>();
  const [nextBeforePost, setNextBeforePost] = useState<Post[]>([]);

  const params = useParams();
  const router = useRouter();

  /**해당 게시글 정보가져오기 */
  useEffect(() => {
    const postDetailDate = async () => {
      try {
        const { data: post, error } = await supabase
          .from('posts')
          .select(`*, profiles!inner(nickname,avatar_img_url)`)
          .eq('id', params.id);
        if (error) throw error;
        setPost(post![0]);
      } catch (error) {
        throw error;
      }
    };
    const nextPosts = async () => {
      const allPost = await getPosts();
      setNextBeforePost(allPost);
    };

    postDetailDate();
    nextPosts();
  }, []);

  const beforePostBtn = (postId: string) => {
    const nowPostNum = nextBeforePost.findIndex((prev) => prev.id === postId);
    console.log('nextBeforePost.length', nextBeforePost.length);
    console.log(nowPostNum + 1);
    if (nowPostNum + 1 >= nextBeforePost.length) {
      toast.warning('첫 게시물 입니다!');
      return;
    } else {
      router.push(`/community-list/${nextBeforePost[nowPostNum + 1].id}`);
    }
  };

  const nextPostBtn = (postId: string) => {
    const nowPostNum = nextBeforePost.findIndex((prev) => prev.id === postId);
    console.log(nowPostNum);
    if (nowPostNum - 1 < 0) {
      toast.warning('가장 최신글 입니다!');
      return;
    } else {
      router.push(`/community-list/${nextBeforePost[nowPostNum - 1].id}`);
    }
  };

  return (
    <article>
      <SubHeader text="커뮤니티" />
      <div className="flex bg-bgColor1 justify-center text-pointColor1 pb-12">
        {/* <CommunityMenu /> */}
        <div className="py-10 bg-white px-20 border-2 border-solid border-t-0 border-r-0 border-pointColor1 w-full">
          {post && post.profiles && (
            <div>
              <div className="flex justify-between">
                <p>{post.category}</p>
                <time>{formatToLocaleDateTimeString(post.created_at)}</time>
              </div>
              <div className="flex border-solid border-b-2 border-t-2">
                <div className="m-5 w-70 h-70 rounded-full overflow-hidden border-2 border-solid border-pointColor1">
                  <Image
                    src={post.profiles.avatar_img_url}
                    alt="프로필이미지"
                    width={70}
                    height={70}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center text-blackColor">
                  <p>{post.profiles.nickname}</p>
                  <p className="text-2xl font-bolder">{post.title}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-solid border-b-2">
                <div className="flex items-center">
                  <Like postId={params.id} />
                </div>
                <div>
                  <button className="border-2 border-solid border-pointColor1 py-3 px-4 border-r-0 border-t-0 border-b-0">
                    수정
                  </button>
                  <button className="border-2 border-solid border-pointColor1 py-3 px-4 border-l-2 border-t-0 border-r-0 border-b-0">
                    삭제
                  </button>
                </div>
              </div>
              <p
                className="ql-editor m-5 text-blackColor"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              ></p>
              <div className="border-solid border-t-2">
                <span>댓글</span>
                <Comment postId={params.id} />
              </div>
              <div className="flex justify-center item items-center">
                <p onClick={() => nextPostBtn(post.id)}>
                  <IoMdArrowDropleft />
                </p>

                <Link href="/community-list">목록으로</Link>
                <p onClick={() => beforePostBtn(post.id)}>
                  <IoMdArrowDropright />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default DetailPage;
