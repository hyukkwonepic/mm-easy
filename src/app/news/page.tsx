import React from 'react';
import { naverApi } from '@/api/naverAPI';

export async function loader() {
  try {
    const newsData = await naverApi('한국어');
    console.log('newData', newsData.items);
    return newsData.items;
  } catch (error) {
    console.error('뉴스 가져오기 실패:', error);
    return [];
  }
}

const NewsPage = async () => {
  const news = await loader();
  return (
    <div>
      <h1>뉴스 목록</h1>
      <ul>
        {news &&
          news.map((article, index) => (
            <li key={index}>
              <div>
                <span>{article.title}</span>
                {/* <span>{article.pubDate}</span> */}
                <span>{article.link}</span>
                <span>{article.description.replace(/<[^>]+>/g, '')}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NewsPage;
