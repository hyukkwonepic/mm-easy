'use client';

import CommunityForm from '../(components)/CommunityForm';
import CommunityMenu from '../(components)/CommunityMenu';
import { useState } from 'react';
import SubHeader from '@/components/common/SubHeader';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  return (
    <article>
      <SubHeader text="커뮤니티" />
      <div className="flex">
        <div>
          <CommunityMenu setSelectedCategory={setSelectedCategory} />
          <button>
            <a href="/community-post">작성하기</a>
          </button>
        </div>
        <div className="flex justify-center w-full">
          <CommunityForm selectedCategory={selectedCategory} />
        </div>
      </div>
    </article>
  );
};

export default CommunityPage;
