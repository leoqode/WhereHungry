import React, { useState, useEffect } from 'react';
import { User, Utensils, Split, Plus, Settings, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../contexts/AuthContext";

interface RecentOrder {
  id: string;
  restaurantName: string;
  date: string;
}

interface PendingSplit {
  id: string;
  restaurantName: string;
  amount: number;
  participants: number;
}

const QuickAccess: React.FC = () => {
  const { user, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentOrders] = useState<RecentOrder[]>([
    { id: "1", restaurantName: "Pizza Palace", date: "Yesterday" },
    { id: "2", restaurantName: "Sushi Spot", date: "3 days ago" },
    { id: "3", restaurantName: "Burger Barn", date: "Last week" },
  ]);
  const [pendingSplits] = useState<PendingSplit[]>([
    { id: "1", restaurantName: "Taco Tuesday", amount: 45.60, participants: 3 },
    { id: "2", restaurantName: "Pasta Party", amount: 78.25, participants: 4 },
  ]);

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

  return (
    <Card className={`fixed left-0 top-0 h-screen bg-gray-50 text-gray-800 rounded-r-lg rounded-l-none transition-all duration-300 flex flex-col 
      ${isExpanded ? 'w-full sm:w-64' : 'w-16'}
      ${isExpanded ? 'z-50' : 'z-40'}`}>
      <Button 
        className={`absolute top-4 p-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-300
        ${isExpanded ? '-right-3' : 'left-1/2 -translate-x-1/2'}`}
        onClick={toggleExpand}
      >
        {isExpanded ? <Menu size={20} /> : <Menu size={20} />}
      </Button>
      
      {isExpanded && (
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-8 h-8 text-gray-500" />
            <span className="text-sm font-medium text-gray-800">{user.username}'s WhereHungry</span>
          </div>

          <Button className="w-full mb-4 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
            <Plus className="w-4 h-4 mr-2" /> New Where
          </Button>

          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 mb-2">RECENT ORDERS</h3>
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-3 py-2 hover:bg-gray-200 rounded cursor-pointer">
                <Utensils className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{order.restaurantName}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">PENDING SPLITS</h3>
            {pendingSplits.map((split) => (
              <div key={split.id} className="flex items-center gap-3 py-2 hover:bg-gray-200 rounded cursor-pointer">
                <Split className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-800">{split.restaurantName}</p>
                  <p className="text-xs text-gray-500">${split.amount.toFixed(2)} • {split.participants} people</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <Separator className="my-4" />
            <Button 
              variant="ghost"
              className="w-full justify-start text-gray-800 hover:bg-gray-200" 
              onClick={logout}
            >
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
          </div>
        </CardContent>
      )}
      
      {!isExpanded && (
        <div className="flex flex-col items-center mt-16 gap-4">
          <Plus className="w-6 h-6 text-gray-500 cursor-pointer" />
          <Utensils className="w-6 h-6 text-gray-500 cursor-pointer" />
          <Split className="w-6 h-6 text-gray-500 cursor-pointer" />
          <Settings className="w-6 h-6 text-gray-500 cursor-pointer" onClick={logout} />
        </div>
      )}
    </Card>
  );
};

export default QuickAccess;
