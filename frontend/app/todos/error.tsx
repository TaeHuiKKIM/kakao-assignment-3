'use client'

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-bold text-danger">앗, 문제가 발생했어요!</h2>
      <p className="text-gray-500">데이터를 불러오는 중 에러가 발생했습니다.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
      >
        다시 시도하기
      </button>
    </div>
  );
}
