import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    // String matching with trim & lowercase (space issues handle karne ke liye)
    const cleanUser = username ? username.trim().toLowerCase() : '';
    const cleanPass = password ? password.trim() : '';

    if (cleanUser === 'admin' && cleanPass === 'admin123') {
      setIsAuthenticated(true);
      return true; // Success!
    }
    
    setIsAuthenticated(false);
    return false; // Invalid
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}