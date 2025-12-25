import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  id: string;
  name: string;
  desc: string;
  icon?: string;
  color?: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, name, desc, color = 'blue' }) => {
  const navigate = useNavigate();

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200 group-hover:border-blue-400',
    red: 'bg-red-50 text-red-600 border-red-200 group-hover:border-red-400',
    cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200 group-hover:border-cyan-400',
  }[color] || 'bg-slate-50 text-slate-600 border-slate-200';

  return (
    <div 
      onClick={() => navigate(`/event/${id}`)}
      className="group card-panel p-6 cursor-pointer flex flex-col h-full bg-white relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-20 transition-transform group-hover:scale-150 ${color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} />
      
      <div className="mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 ${
          color === 'red' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {name.charAt(0)}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-800 transition-colors">{name}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">{desc}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">Details &rarr;</span>
        <button className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
          color === 'red' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-900 text-white hover:bg-blue-900'
        }`}>
          Register
        </button>
      </div>
    </div>
  );
};

export default EventCard;
