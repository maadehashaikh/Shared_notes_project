"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@src/context/AuthContext.js";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signup"); // Redirect to signup if not logged in
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Don't render anything until redirect happens
  }

  return children;
};

export default ProtectedRoute;
