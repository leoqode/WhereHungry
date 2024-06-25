import React, {createContext, useState, useContext, ReactNode} from 'react'
import axios from 'axios';


interface User{
  email: string;
}


interface AuthContextType{
  user: User | null;
  login: (email: string, password:string) => Promise<boolean>
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children : ReactNode}> = ({children}) => {
  const [user, setUser] = useState< User | null>(null);

  const login = async (email : string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', {email, password});
      if (response.data.success){
        setUser({email});
        localStorage.setItem('token', response.data.token);
        return true;
      }
      return false;
    }
    catch(error){
      console.error('Login error', {error});
      return false;
    }

  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value = {{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () =>{
  const context = useContext(AuthContext);
  if (context === undefined){
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
