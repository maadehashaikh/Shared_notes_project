"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token found in localStorage:", token);

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    console.log("Auth state updated:", isAuthenticated);
  }, [isAuthenticated]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    console.log("User logged in, token stored:", token);
    router.push("/notes");
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("token");
      setIsAuthenticated(false);
      console.log("User logged out, token removed.");
      alert("Logout successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {isAuthenticated === null ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

// Custom Hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
