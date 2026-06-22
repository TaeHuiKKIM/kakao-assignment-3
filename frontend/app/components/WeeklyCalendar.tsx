import { getWeekDays, formatDate } from '../utils/date';

export default function WeeklyCalendar({ selectedDate, setSelectedDate, todos }: { selectedDate: Date, setSelectedDate: (d: Date) => void, todos: any[] }) {
  const weekDays = getWeekDays(selectedDate);
  const selectedDateStr = formatDate(selectedDate);
  const todayStr = formatDate(new Date());

  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-xl p-3 shadow-sm border border-white/60 shrink-0">
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevWeek} className="p-1 text-gray-500 hover:bg-white/60 hover:shadow rounded-full transition-all active:scale-95">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <span className="font-extrabold text-base text-gray-800 tracking-tight">
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
        </span>
        <button onClick={handleNextWeek} className="p-1 text-gray-500 hover:bg-white/60 hover:shadow rounded-full transition-all active:scale-95">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, idx) => {
          const dateStr = formatDate(day);
          const isSelected = dateStr === selectedDateStr;
          const isToday = dateStr === todayStr;
          const dayTodos = todos.filter(t => t.date === dateStr);
          const todoCount = dayTodos.length;
          
          return (
            <div 
              key={dateStr}
              onClick={() => setSelectedDate(day)}
              className={`flex flex-col items-center justify-center py-1.5 rounded-xl cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'bg-gradient-to-b from-primary to-purple-600 text-white shadow-md shadow-purple-500/40 transform scale-105' 
                  : 'bg-white/50 hover:bg-white hover:shadow-sm text-gray-600 border border-white/40'
              }`}
            >
              <span className={`text-[10px] font-bold mb-0.5 ${idx === 0 ? 'text-pink-500' : idx === 6 ? 'text-blue-500' : ''} ${isSelected ? 'text-white/90' : ''}`}>
                {dayNames[day.getDay()]}
              </span>
              <span className={`text-sm ${isToday ? 'font-black underline decoration-wavy decoration-2 underline-offset-2' : 'font-bold'}`}>
                {day.getDate()}
              </span>
              <div className="mt-0.5 h-3 flex items-center justify-center">
                {todoCount > 0 && (
                  <span className={`text-[9px] px-1.5 rounded-full font-bold shadow-sm ${
                    isSelected ? 'bg-white text-primary' : 'bg-gradient-to-r from-primary to-purple-500 text-white'
                  }`}>
                    {todoCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
