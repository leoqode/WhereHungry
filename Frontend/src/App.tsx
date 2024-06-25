import React from "react";
import "./pages/LoginPage";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";

interface NavigationProps {
  goForward: () => void;
  goBackward: () => void;
}

const WithNavigation: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const navProps: NavigationProps = {
    goBackward: () => navigate(-1),
    goForward: () => navigate(+1),
  };

  return React.Children.map(children, (child) => {
    return child;
  });
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <WithNavigation>
                <LoginPage />
              </WithNavigation>
            }
          />
          <Route element={<Dashboard />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other protected routes here */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
