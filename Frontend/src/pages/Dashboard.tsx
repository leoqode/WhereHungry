import React, { useEffect, useState } from 'react';
import QuickAccess from "./QuickAccess";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <QuickAccess />
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your dashboard, {user.username}. This is where your main content will go.</p>
      </main>
    </div>
  );
};

export default Dashboard;
