const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Event', 'EventDetail.tsx');

const content = `import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mapping specific event IDs to potential content keys or names
  const eventName = id ? id.replace(/-/g, ' ').toUpperCase() : 'EVENT DETAILS';

  return (
    <div className="min-h-screen bg-[#1a1b4b] text-white p-6 pt-20">
      <button onClick={() => navigate(-1)} className="text-[#e63946] font-bold hover:underline mb-6">
         &larr; Back to Events
      </button>
      
      <div className="max-w-4xl mx-auto bg-[#242661] p-8 rounded-2xl border border-[#f4a261]">
        <h1 className="text-4xl font-bold text-[#f4a261] mb-4 font-serif">{eventName}</h1>
        
        <div className="space-y-4 text-gray-300">
           {/* Placeholder for content extraction */}
           <div className="p-4 bg-gray-900 rounded border border-gray-700">
              <p className="italic text-yellow-500">
                AI Note: I could not automatically read the .docx file associated with this event ({id}).
                Please open "reference_docs/{id}.docx" (or similar) and paste the content here.
              </p>
           </div>
           
           {/* Standard structure for event details */}
           <div>
             <h2 className="text-2xl font-bold text-white mb-2">Description</h2>
             <p>[Event Description Placeholder]</p>
           </div>
           
           <div>
             <h2 className="text-2xl font-bold text-white mb-2">Rules</h2>
             <ul className="list-disc pl-5">
                <li>[Rule 1]</li>
                <li>[Rule 2]</li>
             </ul>
           </div>
           
           <div>
             <h2 className="text-2xl font-bold text-white mb-2">Coordinators</h2>
             <p>[Coordinator Names]</p>
           </div>
        </div>
        
        <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('https://app-8gixcp0ztqtd.appmedo.com/register')}
              className="px-8 py-3 bg-[#e63946] text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
            >
              REGISTER FOR THIS EVENT
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
`;

try {
    // Write file with 'utf8' encoding (no BOM by default in Node)
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully wrote EventDetail.tsx with UTF-8 encoding (no BOM).');
} catch (err) {
    console.error('Error writing file:', err);
    process.exit(1);
}
