import React from "react";
import "./Pages/LoginPage";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import LoginwEmail from "./Pages/LoginwEmail";

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
        <Route
          path='/email-login'
          element={
            <WithNavigation>
              <LoginwEmail />
            </WithNavigation>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
