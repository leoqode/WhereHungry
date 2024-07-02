import React, { useEffect, useState } from "react";
import QuickAccess from "./QuickAccess";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import HungryAI from "./HungryAI";
import RightHangCol from "./RightHangCol";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
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
    <div className='flex h-screen overflow-hidden'>
      <QuickAccess />

      <HungryAI user={user.username} />
      <RightHangCol />
    </div>
  );
};

export default Dashboard;
