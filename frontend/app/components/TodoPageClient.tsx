'use client'

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import WeeklyCalendar from './WeeklyCalendar';
import TodoItem from './TodoItem';
import axios from 'axios';
import { formatDate } from '../utils/date';

export default function TodoPageClient({ initialTodos }: { initialTodos: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentFilter = searchParams.get('filter') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter === 'all') params.delete('filter');
    else params.set('filter', filter);
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (!search) params.delete('search');
    else params.set('search', search);
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    await axios.put(`/api/todos/${id}`, { completed: !completed });
    startTransition(() => {
      router.refresh();
    });
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`/api/todos/${id}`);
    startTransition(() => {
      router.refresh();
    });
  };

  const dateStr = formatDate(selectedDate);
  const filteredByDate = initialTodos.filter(t => t.date === dateStr || !t.date);

  return (
    <div className="flex flex-col h-full space-y-4">
      <WeeklyCalendar 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
        todos={initialTodos} 
      />

      {/* 검색 및 필터 */}
      <div className="space-y-3 bg-white/40 backdrop-blur-md rounded-2xl p-3 border border-white/60 shadow-sm shrink-0">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          defaultValue={currentSearch}
          onChange={(e) => {
            handleSearchChange(e);
          }}
          className="w-full bg-white/80 border border-gray-200/60 rounded-xl p-2 outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
        />
        
        <div className="flex space-x-2 overflow-x-auto pb-1 custom-scrollbar">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 transform active:scale-95 whitespace-nowrap ${
                currentFilter === f 
                  ? 'bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30 scale-105' 
                  : 'bg-white/70 text-gray-600 hover:bg-white hover:shadow border border-gray-200/50'
              }`}
            >
              {f === 'all' ? '✨ 전체' : f === 'active' ? '🔥 진행 중' : '✅ 완료'}
            </button>
          ))}
        </div>
      </div>

      {/* 투두 목록 */}
      <div className="flex-1 min-h-[150px] overflow-y-auto custom-scrollbar pr-2 relative bg-white/30 backdrop-blur-xl rounded-2xl p-3 border border-white/50 shadow-sm">
        {isPending && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
            <span className="text-primary font-bold animate-pulse">데이터 업데이트 중...</span>
          </div>
        )}
        {filteredByDate.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
            <div className="text-4xl">📭</div>
            <p className="font-medium text-sm">할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredByDate.map((todo: any) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                toggleTodo={() => toggleTodo(todo.id, todo.completed)}
                deleteTodo={() => deleteTodo(todo.id)}
              />
            ))}
          </ul>
        )}
      </div>

      <button 
        onClick={() => router.push('/todos/new')}
        className="w-full shrink-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:opacity-90 text-white font-black text-lg py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 active:scale-95"
      >
        + 새 할 일 추가하기
      </button>
    </div>
  );
}
