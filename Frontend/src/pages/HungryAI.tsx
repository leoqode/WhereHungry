import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface HungryAIProps{
  user: string;
}


const HungryAI: React.FC<HungryAIProps> = ({ user }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputWidth, setInputWidth] = useState('38%');



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', inputValue);
    setInputValue('');
  };

  return (
    <div className="relative left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out" style={{ width: inputWidth, top: '20%' }}>
      <form onSubmit={handleSubmit} className="relative">
      <h3 className='translate-x-6 mb-10 text-center'  >Welcome back, {user && <span className='font-bold' >{user}</span>} </h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full py-4 px-6 bg-white text-gray-800 placeholder-gray-500 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-lime-500 transition duration-300"
          placeholder="Where are we eating today?"
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
