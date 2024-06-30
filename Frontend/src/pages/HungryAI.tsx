import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface HungryAIProps {
  isLeftSidebarExpanded: boolean;
  isRightSidebarExpanded: boolean;
}

const HungryAI: React.FC<HungryAIProps> = ({ isLeftSidebarExpanded, isRightSidebarExpanded }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputWidth, setInputWidth] = useState('100%');

  useEffect(() => {
    const updateWidth = () => {
      const baseWidth = window.innerWidth;
      const leftSidebarWidth = isLeftSidebarExpanded ? 256 : 64; // 256px when expanded, 64px when collapsed
      const rightSidebarWidth = isRightSidebarExpanded ? 384 : 64; // 384px when expanded, 64px when collapsed
      const availableWidth = baseWidth - leftSidebarWidth - rightSidebarWidth;
      
      let newWidth = '100%';
      if (baseWidth >= 768) { // For tablets and larger
        newWidth = `${Math.min(availableWidth, 600)}px`; // Max width of 600px
      } else {
        newWidth = `${availableWidth}px`;
      }
      
      setInputWidth(newWidth);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [isLeftSidebarExpanded, isRightSidebarExpanded]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', inputValue);
    setInputValue('');
  };

  return (
    <div className="relative left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out" style={{ width: inputWidth, top: '20%' }}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full py-4 px-6 bg-white text-gray-800 placeholder-gray-500 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-500 transition duration-300"
          placeholder="Where are your tastebuds craving today?"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-lime-500 text-white p-2 rounded-full hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-700 transition duration-300"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default HungryAI;
