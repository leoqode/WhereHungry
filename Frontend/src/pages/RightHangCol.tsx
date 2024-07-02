import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: number;
  text: string;
}

interface FoodResult {
  id: number;
  name: string;
  imageUrl: string;
}

const RightHangCol: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [foodResults, setFoodResults] = useState<FoodResult[]>([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const addAIResponse = (response: string) => {
    setMessages(prev => [...prev, { id: Date.now(), text: response }]);
  };

  const updateFoodResults = (results: FoodResult[]) => {
    setFoodResults(results);
  };

  return (
    <Card className={`fixed right-0 top-0 h-screen bg-gray-50 text-gray-800 rounded-l-lg rounded-r-none transition-all duration-300 flex flex-col 
      ${isExpanded ? 'w-full sm:w-96' : 'w-16'}
      ${isExpanded ? 'z-50' : 'z-40'}`}>
      <Button 
        className={`absolute top-4 p-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-300
        ${isExpanded ? '-left-3' : 'left-1/2 -translate-x-1/2'}`}
        onClick={toggleExpand}
      >
        {isExpanded ? <ChevronRight size={20} /> : <MessageCircle size={20} />}
      </Button>
      
      {isExpanded && (
        <CardContent className="flex flex-col h-full p-4">
          <ScrollArea className="flex-grow mb-4">
            {messages.map(message => (
              <div key={message.id} className="mb-4">
                <span className="inline-block p-2 rounded-lg bg-blue-100">
                  {message.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          
          <div className="relative py-4">
          <Separator className="absolute left-0 right-0 h-2 bg-black shadow-md my-4" />

            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-2 text-sm font-medium text-gray-500">
              Food Results
            </span>
          </div>

          <div className="h-1/3 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {foodResults.map(result => (
                <div key={result.id} className="bg-white p-2 rounded-lg shadow">
                  <img src={result.imageUrl} alt={result.name} className="w-full h-20 object-cover rounded-md mb-2" />
                  <p className="text-sm text-center">{result.name}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RightHangCol;
