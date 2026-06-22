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
      <div className="space-y-2">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          defaultValue={currentSearch}
          onChange={(e) => {
            // 디바운싱 효과를 주기 위해 setTimeout 활용 가능하지만 간단히 바로 적용
            handleSearchChange(e);
          }}
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-primary"
        />
        
        <div className="flex space-x-2">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentFilter === f 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {f === 'all' ? '전체' : f === 'active' ? '진행 중' : '완료'}
            </button>
          ))}
        </div>
      </div>

      {/* 투두 목록 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 relative">
        {isPending && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
            <span className="text-primary font-semibold">로딩 중...</span>
          </div>
        )}
        {filteredByDate.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            할 일이 없습니다. 새로운 할 일을 추가해보세요!
          </div>
        ) : (
          <ul className="space-y-3">
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
        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors shadow-md active:scale-95"
      >
        새 할 일 추가하기
      </button>
    </div>
  );
}
