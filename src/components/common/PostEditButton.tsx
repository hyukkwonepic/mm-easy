import { FormButtonProps } from '@/types/posts';
import { useRouter } from 'next/navigation';

export const PostEditButton: React.FC<FormButtonProps> = ({ text, width, redirectUrl }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(redirectUrl);
  };

  return (
    <button
      type="submit"
      onClick={handleEditClick}
      className={`rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white ${width}`}
    >
      {text}
    </button>
  );
};
