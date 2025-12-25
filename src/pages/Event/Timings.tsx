import React from 'react';
import ProfessionalNavbar from '../../components/ProfessionalNavbar';
import Footer from '../../components/Footer';
import RevealOnScroll from '../../components/RevealOnScroll';

const schedule = [
  { time: '09:00 AM to 9:40 AM', event: 'Apptitude & Reasoning Test', location: 'CP1 & CP2' },
  { 
    time: '09:40 AM TO 12:10 PM', 
    event: 'Hireready Workshop', 
    location: 'CSI Room',
    subEvents: [
      { time: '09:40 AM TO 10:10 AM', event: 'Technical Round / Coding Round' },
      { time: '10:10 AM TO 10:40 AM', event: 'Group Discussion' },
      { time: '10:40 AM TO 11:10 AM', event: 'HR Round' },
      { time: '11:10 AM TO 12:10 PM', event: 'Final Round' }
    ]
  },
  { time: '09:40 AM TO 12:00 PM', event: 'Technical Tic Tac Toe (Round 1)', location: 'Seminar Hall' },
  { time: '09:40 AM TO 12:00 PM', event: 'Brain Quest (Round 1)', location: 'Seminar Hall' },
  { time: '09:40 AM TO 12:00 PM', event: 'SpotX (Round 1)', location: 'Seminar Hall' },
  { time: '09:40 AM TO 12:00 PM', event: 'Code Combat (Round 1)', location: 'CP1 ' },
  { time: '12:10 PM TO 1:00 PM', event: 'Lunch Break', location: 'Respective Class Rooms' },
  { time: '01:00 PM TO 02:30 PM', event: 'Final Rounds (All Events)', location: 'Respective Venues' },
  { time: '02:30 PM TO 04:00 PM', event: 'Prize Distribution & Closing', location: 'Seminar Hall' },
];

const Timings: React.FC = () => {
  const [expandedRow, setExpandedRow] = React.useState<number | null>(null);

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <ProfessionalNavbar />

      <main className="flex-grow container mx-auto px-6 py-8 relative z-10 flex flex-col justify-center min-h-[calc(100vh-80px)]">
        <RevealOnScroll>
          <div className="text-center mb-6">
             <div className="inline-block px-4 py-1 bg-white border border-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wide mb-2 shadow-sm">
               DECEMBER 29 • SCHEDULE
             </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Event Timeline</h1>
          </div>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-slate-500 font-bold uppercase tracking-wider text-base">Time</th>
                  <th className="py-4 px-6 text-slate-500 font-bold uppercase tracking-wider text-base">Event Name</th>
                  <th className="py-4 px-6 text-slate-500 font-bold uppercase tracking-wider text-base">Location</th>
                  <th className="py-4 px-6 text-slate-500 font-bold uppercase tracking-wider text-base w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr 
                      className={`transition-colors group ${item.subEvents ? 'cursor-pointer hover:bg-blue-50/50' : 'hover:bg-blue-50/30'}`}
                      onClick={() => item.subEvents && toggleRow(index)}
                    >
                      <td className="py-4 px-6 align-middle">
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-lg font-mono font-bold text-lg group-hover:bg-blue-200 transition-colors whitespace-nowrap">
                          {item.time}
                        </div>
                      </td>
                      <td className="py-4 px-6 align-middle">
                        <div className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                          {item.event}
                          {item.subEvents && (
                            <span className="ml-2 text-xs text-blue-500 font-normal bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                               {item.subEvents.length} Sessions
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 align-middle">
                        <div className="flex items-center gap-2 text-lg text-slate-600 font-medium">
                          <span className="text-blue-400 opacity-50">📍</span>
                          {item.location}
                        </div>
                      </td>
                      <td className="py-4 px-6 align-middle text-center">
                        {item.subEvents && (
                          <div className={`transition-transform duration-300 transform ${expandedRow === index ? 'rotate-180' : ''}`}>
                            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        )}
                      </td>
                    </tr>
                    {/* Expandable Sub-events Row */}
                    {item.subEvents && expandedRow === index && (
                      <tr className="bg-slate-50/80 animate-fade-in">
                         <td colSpan={4} className="p-0">
                            <div className="py-4 px-6 border-b border-slate-100 shadow-inner">
                               <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 pl-2 border-l-4 border-blue-400">Workshop Schedule</p>
                               <div className="grid gap-2">
                                  {item.subEvents.map((sub, idx) => (
                                     <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 ml-4 hover:border-blue-300 transition-colors">
                                        <div className="flex items-center gap-3">
                                           <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                           <span className="font-bold text-slate-800 text-lg">{sub.event}</span>
                                        </div>
                                        <div className="font-mono text-blue-700 font-medium bg-blue-50 px-3 py-1 rounded">
                                           {sub.time}
                                        </div>
                                     </div>
                                  ))}
                               </div>
                            </div>
                         </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />
      
      <Footer />
    </div>
  );
};

export default Timings;
