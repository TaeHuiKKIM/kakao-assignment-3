import { ReactNode } from 'react';

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        <p className="text-gray-500 font-semibold">데이터를 불러오는 중입니다...</p>
      </div>
    </div>
  );
}
