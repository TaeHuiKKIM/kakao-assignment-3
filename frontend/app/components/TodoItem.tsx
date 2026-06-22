import { useRouter } from 'next/navigation';
import { useState, memo } from 'react';

export default memo(function TodoItem({ todo, toggleTodo, deleteTodo }: { todo: any, toggleTodo: () => void, deleteTodo: () => void }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    await deleteTodo();
  };

  return (
    <li className={`bg-white/60 backdrop-blur-sm flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 transform hover:-translate-y-0.5 ${todo.completed ? 'border-gray-200/50 opacity-60' : 'border-white/80 shadow-sm hover:shadow-md'} ${isDeleting ? 'opacity-30 pointer-events-none scale-95' : ''}`}>
      <div className="flex items-center space-x-3 flex-1 overflow-hidden cursor-pointer group" onClick={toggleTodo}>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${todo.completed ? 'bg-gradient-to-br from-success to-emerald-400 border-transparent shadow-inner scale-110' : 'border-gray-300 group-hover:border-primary group-hover:bg-primary/10'}`}>
          {todo.completed && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
        <span className={`text-sm font-medium truncate transition-all duration-300 ${todo.completed ? 'text-gray-400 line-through decoration-gray-300 decoration-2' : 'text-gray-800 group-hover:text-primary'}`}>
          {todo.text}
        </span>
      </div>

      <div className="flex space-x-1 shrink-0 ml-2 opacity-80 hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/todos/${todo.id}`);
          }}
          className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all p-1.5 rounded-lg active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-danger hover:bg-red-50 transition-all p-1.5 rounded-lg active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
});
