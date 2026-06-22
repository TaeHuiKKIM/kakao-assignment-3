'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { use } from 'react';

export default function EditTodoPage({ params }: { params: Promise<{ todoId: string }> }) {
  const router = useRouter();
  const { todoId } = use(params);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, we might fetch single todo via API or pass data. 
    // Since we don't have GET /todos/{id}, we fetch all and filter, or just add GET /todos/{id}.
    // Actually we can just fetch all and find it.
    axios.get('/api/todos')
      .then(res => {
        const todo = res.data.find((t: any) => t.id === parseInt(todoId));
        if (todo) {
          setText(todo.text);
          setDate(todo.date || '');
        }
        setIsLoading(false);
      });
  }, [todoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('할 일을 입력해주세요.');
      return;
    }
    
    await axios.put(`/api/todos/${todoId}`, { text, date });
    router.push('/todos');
    router.refresh();
  };

  if (isLoading) return <div className="text-center py-8">로딩 중...</div>;

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-800 mr-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800">할 일 수정</h2>
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
            className="w-full h-32 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary resize-none"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors shadow-md active:scale-95"
        >
          수정 완료
        </button>
      </form>
    </div>
  );
}
