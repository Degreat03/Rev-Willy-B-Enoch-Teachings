import { useState } from 'react';

const Teachings = ({ teaching }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-6 transition-all">
      <h2 className="text-2xl font-bold text-[#a52a2a] mb-3">{teaching.title}</h2>
      
      {/* Intro Text */}
      <p className="text-gray-700 font-medium leading-relaxed">
        {teaching.intro}
      </p>

      {/* Expandable Section */}
      <div 
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isOpen ? 'max-h-[2500px]' : 'max-h-0'
        }`}
      >
        <div className="mt-4 pt-4 border-t border-gray-100 text-gray-600 whitespace-pre-wrap leading-relaxed">
          {teaching.fullText}
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="mt-4 text-[#a52a2a] font-semibold hover:text-[#db3838] flex items-center 
        gap-1 transition-colors cursor-pointer"
      >
        {isOpen ? 'Show Less ▲' : 'Continue Reading ▼'}
      </button>
    </div>
  );
};

export default Teachings;