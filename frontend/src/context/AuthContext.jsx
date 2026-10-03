import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, refreshAccessToken } from "../api/auth.api";
import socket from "../socket";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();

      setUser(response.data);
    } catch (error) {
    
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const initializeAuth = async () => {
  try {
    const response = await getCurrentUser();
    setUser(response.data);
  } catch (error) {
    try {
      await refreshAccessToken();

      const response = await getCurrentUser();
      setUser(response.data);
    } catch (refreshError) {

      setUser(null);
    }
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  initializeAuth();
}, []);


  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
  if (!user) return;
  socket.connect();
  return () => {
    socket.disconnect();
  };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ 
        user,
        setUser,
        loading,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};