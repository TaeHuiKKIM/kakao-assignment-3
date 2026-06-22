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
    <div className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevWeek} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <span className="font-bold text-gray-700">
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
        </span>
        <button onClick={handleNextWeek} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
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
              className={`flex flex-col items-center justify-center py-2 rounded-lg cursor-pointer transition-all ${
                isSelected 
                  ? 'bg-primary text-white shadow-md transform scale-105' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <span className={`text-xs mb-1 ${idx === 0 ? 'text-danger' : idx === 6 ? 'text-blue-500' : ''} ${isSelected ? 'text-white/80' : ''}`}>
                {dayNames[day.getDay()]}
              </span>
              <span className={`text-sm ${isToday ? 'font-extrabold underline decoration-2 underline-offset-2' : 'font-semibold'}`}>
                {day.getDate()}
              </span>
              <div className="mt-1 h-4 flex items-center justify-center">
                {todoCount > 0 && (
                  <span className={`text-[10px] px-1.5 rounded-full font-bold ${
                    isSelected ? 'bg-white text-primary' : 'bg-primary text-white'
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
