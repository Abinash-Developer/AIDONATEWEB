import React, { createContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(()=>{
     return localStorage.getItem("logged_in")?true:false;
  });
  const [userRole, setUserRole] = useState(()=>{
    return localStorage.getItem("role") || '';
  });
console.log("hjfjsfhj= ",userRole)
  const login = (user_details) => {
    localStorage.setItem("logged_in",true);
    localStorage.setItem("role", user_details?.data?.data?.role);
    localStorage.setItem("token", user_details?.data?.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("logged_in");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    return <Navigate to="/" />;

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
