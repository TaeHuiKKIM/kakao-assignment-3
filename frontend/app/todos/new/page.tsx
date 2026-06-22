'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function NewTodoPage() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('할 일을 입력해주세요.');
      return;
    }
    
    await axios.post('/api/todos', { text, date, completed: false });
    router.push('/todos');
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-800 mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800">새 할 일 추가</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">날짜</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">할 일 내용</label>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="어떤 일을 하실 건가요?"
            className="w-full h-32 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary resize-none"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors shadow-md active:scale-95"
        >
          저장하기
        </button>
      </form>
    </div>
  );
}
