"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth'; 
import { FcGoogle } from "react-icons/fc";
import { SiKakaotalk } from "react-icons/si";
import SubHeader from '@/components/common/SubHeader';
import { supabase } from '@/utils/supabase/supabase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading, error, signInWithGoogle, signInWithKakao } = useAuth(); 
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginSuccess = await signIn(email, password);
    if (loginSuccess) {
      router.push('/'); 
    } else {
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };
  
  const handleKakaoSignIn = async () => {
    await signInWithKakao();
  };

  return (
    <article>
      <SubHeader text="로그인" />
    <div className="flex min-h-screen bg-bgColor1">
    <div className="flex-1 flex items-center justify-center">
      <div className="w-80 h-80 bg-gray-400 rounded-full flex items-center justify-center">
        {/* 고양이 예시 */}
      </div>
    </div>
    <div className="flex-1 flex items-center bg-white justify-center">
      <div className="w-full max-w-md p-8 bg-white">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
            </label>
            <div className="mt-1">
              <input 
                id="email"
                type="email" 
                required
                className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
            </label>
            <div className="mt-1">
              <input 
                id="password"
                type="password" 
                required
                className="w-full px-3 py-4 rounded-md border border-pointColor1 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex mt-6 justify-between">
          <Link className="text-sm font-medium text-pointColor1 hover:underline" href="/terms">
              회원가입
          </Link>
          <Link className="text-sm font-medium text-pointColor1 hover:underline" href="/">
              아이디 찾기 | 비밀번호 찾기
          </Link>
        </div>
          <div>
            <button 
              type="submit" 
              className="w-full px-4 py-5 rounded-md text-white bg-pointColor1 shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
              disabled={loading} 
            >
              로그인
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-3">
        <button 
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full mr-3 px-1 py-3 text-pointColor1 border border-pointColor1 hover:bg-gray-300 rounded-md shadow"
        >
          <FcGoogle className="mr-2" size="2em" />Google 로그인
        </button>
        <button
          onClick={handleKakaoSignIn}
          className="flex items-center justify-center w-full px-1 py-3 text-pointColor1 border border-pointColor1 hover:bg-gray-300 rounded-md shadow"
        >
        <SiKakaotalk className="mr-2 bg-black text-yellow-500" size="2em" />
        Kakao 로그인
        </button>
        </div>
      </div>
    </div>
  </div>
  </article>
  );
};

export default LoginPage;
