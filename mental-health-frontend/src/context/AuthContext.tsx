import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
