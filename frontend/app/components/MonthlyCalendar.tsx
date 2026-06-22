import { getMonthDays, formatDate } from '../utils/date';

export default function MonthlyCalendar({ selectedDate, setSelectedDate, todos }: { selectedDate: Date, setSelectedDate: (d: Date) => void, todos: any[] }) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const monthWeeks = getMonthDays(year, month);
  const selectedDateStr = formatDate(selectedDate);
  const todayStr = formatDate(new Date());

  const handlePrevMonth = () => {
    const newDate = new Date(year, month - 1, selectedDate.getDate());
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(year, month + 1, selectedDate.getDate());
    setSelectedDate(newDate);
  };

  // getMonthDays always returns weeks starting on Monday.
  const headerDays = [
    { name: '월', color: 'text-gray-500' },
    { name: '화', color: 'text-gray-500' },
    { name: '수', color: 'text-gray-500' },
    { name: '목', color: 'text-gray-500' },
    { name: '금', color: 'text-gray-500' },
    { name: '토', color: 'text-blue-500' },
    { name: '일', color: 'text-pink-500' },
  ];

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-xl p-2 shadow-sm border border-white/60 shrink-0">
      <div className="flex justify-between items-center mb-1.5">
        <button onClick={handlePrevMonth} className="p-1 text-gray-500 hover:bg-white/60 hover:shadow rounded-full transition-all active:scale-95">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <span className="font-extrabold text-sm text-gray-800 tracking-tight">
          {year}년 {month + 1}월
        </span>
        <button onClick={handleNextMonth} className="p-1 text-gray-500 hover:bg-white/60 hover:shadow rounded-full transition-all active:scale-95">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {headerDays.map((hd, idx) => (
          <div key={idx} className={`text-center text-[10px] font-bold ${hd.color}`}>
            {hd.name}
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-1">
        {monthWeeks.map((week, wIdx) => (
          <div key={wIdx} className="grid grid-cols-7 gap-1">
            {week.map((day, dIdx) => {
              const dateStr = formatDate(day);
              const isSelected = dateStr === selectedDateStr;
              const isToday = dateStr === todayStr;
              const isCurrentMonth = day.getMonth() === month;
              const hasTodos = todos.some(t => t.date === dateStr);
              
              // day.getDay() -> 0: Sun, 6: Sat
              const isSunday = day.getDay() === 0;
              const isSaturday = day.getDay() === 6;
              const dayColor = isSunday ? 'text-pink-500' : isSaturday ? 'text-blue-500' : 'text-gray-700';
              
              return (
                <div 
                  key={dateStr}
                  onClick={() => setSelectedDate(day)}
                  className={`flex flex-col items-center justify-center py-0.5 rounded-md cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-b from-primary to-purple-600 text-white shadow-md shadow-purple-500/40 transform scale-105' 
                      : 'bg-white/30 hover:bg-white hover:shadow-sm border border-white/20'
                  } ${!isCurrentMonth ? 'opacity-40' : ''}`}
                >
                  <span className={`text-[11px] ${isToday ? 'font-black text-primary' : 'font-semibold'} ${isSelected && isToday ? 'text-white' : ''} ${!isCurrentMonth && !isSelected ? 'text-gray-400' : isSelected ? 'text-white' : dayColor}`}>
                    {day.getDate()}
                  </span>
                  <div className="mt-0 h-1.5 flex items-center justify-center">
                    {hasTodos && (
                      <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-primary'}`}></span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
