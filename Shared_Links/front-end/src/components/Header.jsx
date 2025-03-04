"use client";
import Link from "next/link";
import { useAuth } from "@src/context/AuthContext.js";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  console.log("Header Rendered - isAuthenticated:", isAuthenticated);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Notes App</Link>
        </h1>
        <nav>
          <Link href="/">
            <span className="mr-4 hover:underline">Home</span>
          </Link>
          <Link href="/notes">
            <span className="mr-4 hover:underline">My Notes</span>
          </Link>
          <Link href="/notes/public">
            <span className="mr-4 hover:underline">Public Notes</span>
          </Link>
          {isAuthenticated ? (
            <button onClick={logout} className="hover:underline">
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
