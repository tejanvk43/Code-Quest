import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfessionalNavbar from '../../components/ProfessionalNavbar';
import { eventsData } from '../../data/eventsData';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const event = eventsData.find(e => e.id === id);

  if (!event) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
             <h1 className="text-2xl font-bold text-slate-800 mb-4">Event Not Found</h1>
             <button onClick={() => navigate('/events')} className="text-blue-600 hover:underline">Return to Events</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <ProfessionalNavbar />

      <div className="container mx-auto px-6 py-12">
        <button 
          onClick={() => navigate('/events')} 
          className="text-slate-500 font-medium hover:text-blue-900 mb-8 flex items-center transition-colors hover:-translate-x-1 cursor-pointer"
        >
           &larr; BACK TO EVENTS
        </button>
        
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-slate-900 p-8 md:p-12 text-white relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{event.icon}</span>
                    <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-sm border border-white/20">
                        {event.venue}
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{event.name}</h1>
                <p className="text-xl text-slate-300 max-w-2xl text-balance">{event.shortDesc}</p>
             </div>
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl mix-blend-screen -mr-16 -mt-16 pointer-events-none" />
          </div>

          <div className="p-8 md:p-12 space-y-12">
             
             {/* Description */}
             <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <span className="w-8 h-1 bg-blue-600 rounded-full inline-block" />
                 About the Event
               </h2>
               <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                 {event.description}
               </p>
             </div>

             {/* Rounds & Process */}
             <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-4">Event Structure</h3>
                   <ul className="space-y-3">
                      {event.rounds.map((round, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-100 transition-colors">
                           <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 font-bold text-sm rounded-full flex items-center justify-center mt-0.5">
                             {idx + 1}
                           </span>
                           <span className="text-slate-700 font-medium">{round}</span>
                        </li>
                      ))}
                   </ul>
                </div>

                {event.process && (
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Process & Evaluation</h3>
                        <ul className="space-y-3">
                            {event.process.map((item, idx) => (
                                <li key={idx} className="text-slate-600 text-sm leading-relaxed border-l-2 border-slate-200 pl-4 py-1">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
             </div>

             {/* Venue Details */}
             <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Logistics</h3>
                <div>
                    <h4 className="font-bold text-slate-700 mb-2 text-sm uppercase tracking-wider">Venue</h4>
                    <p className="text-xl font-medium text-slate-900">{event.venue}</p>
                    
                    <h4 className="font-bold text-slate-700 mt-6 mb-2 text-sm uppercase tracking-wider">Time</h4>
                    <p className="text-xl font-medium text-slate-900">{event.time}</p>

                    {event.submissionDate && (
                         <p className="text-sm text-slate-500 mt-4 pt-4 border-t border-slate-200">Dataset Submission: {event.submissionDate}</p>
                    )}
                </div>
             </div>

             {/* Organizers */}
             <div>
               <h3 className="text-lg font-bold text-slate-900 mb-4">Organizing Team</h3>
               <div className="flex flex-wrap gap-3">
                  {event.organizers.map((org, i) => (
                      <div key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
                        {org}
                      </div>
                  ))}
               </div>
             </div>
          </div>
          
          {/* Footer Action */}
          <div className="bg-slate-50 p-8 border-t border-slate-100 flex justify-center">
              <button 
                onClick={() => navigate('/register')}
                className="px-10 py-4 bg-blue-900 text-white font-bold text-lg rounded-xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/10 hover:-translate-y-1 cursor-pointer"
              >
                Register for {event.name}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventDetail;
