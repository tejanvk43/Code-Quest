import React from 'react';

const rounds = [
  { 
    event: 'Technical Tic Tac Toe', 
    rounds: [
      { name: 'Round 1: The Quiz', desc: 'Basic technical MCQs.' },
      { name: 'Round 2: The Grid', desc: 'Code your way to the winning move.' }
    ]
  },
  { 
    event: 'Code Combat', 
    rounds: [
      { name: 'Round 1: Skirmish', desc: 'Easy to Medium algorithmic problems.' },
      { name: 'Round 2: Battle Royale', desc: 'Hard problems with time constraints.' }
    ]
  },
  // Add other events here
];

const RoundDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 pt-20">
      <h1 className="text-4xl font-bold mb-10 text-center text-cyan-400">Round Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {rounds.map((item, idx) => (
          <div key={idx} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4 border-b border-gray-600 pb-2">{item.event}</h2>
            <ul className="space-y-4">
              {item.rounds.map((r, rIdx) => (
                <li key={rIdx}>
                  <h3 className="font-bold text-lg">{r.name}</h3>
                  <p className="text-gray-400 text-sm">{r.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundDetails;
