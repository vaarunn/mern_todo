import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  // console.log(isAuthenticated);
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        loading,
        setLoading,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UserContext = () => {
  return useContext(AppContext);
};
