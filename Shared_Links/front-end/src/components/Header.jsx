"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Notes App</Link>
        </h1>
        <nav>
          <Link href="/notes">
            <span className="mr-4 hover:underline">My Notes</span>
          </Link>
          <Link href="/notes/public">
            <span className="mr-4 hover:underline">Public Notes</span>
          </Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          ) : (
            <Link href="/signup">
              <span className="hover:underline">Signup</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
