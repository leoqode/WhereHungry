import './QuickAccess.css';
import LogoutModal from './LogoutModal';
import React, { useState, useEffect } from "react";
import { User, Utensils, Split, Plus, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const [isLoading, setIsLoading] = useState(true);
  const [recentOrders] = useState<RecentOrder[]>([
    { id: "1", restaurantName: "Pizza Palace", date: "Yesterday" },
    { id: "2", restaurantName: "Sushi Spot", date: "3 days ago" },
    { id: "3", restaurantName: "Burger Barn", date: "Last week" },
  ]);
  const [pendingSplits] = useState<PendingSplit[]>([
    { id: "1", restaurantName: "Taco Tuesday", amount: 45.60, participants: 3 },
    { id: "2", restaurantName: "Pasta Party", amount: 78.25, participants: 4 },
  ]);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  if (isLoading) {
    return (
      <Card className="w-64 h-screen overflow-y-auto bg-gray-50 text-gray-800">
        <CardContent className="p-4 flex justify-center items-center h-full">
          <div className="text-gray-500">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-64 h-screen overflow-y-auto bg-gray-50 text-gray-800">
        <CardContent className="p-4 flex justify-center items-center h-full">
          <div className="text-gray-500">Please log in to view this content.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-64 h-screen overflow-y-auto bg-gray-50 text-gray-800">
      <CardContent className="p-4">
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

        <Separator className="my-4" />

        <Button 
          className="w-full justify-start text-gray-800 hover:bg-gray-200" 
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <Settings className="w-4 h-4 mr-2" /> Settings
        </Button>

        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onLogout={handleLogout}
        />
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
