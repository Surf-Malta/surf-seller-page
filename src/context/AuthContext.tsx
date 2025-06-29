"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";

interface User {
  id: string;
  name: string;
  email?: string;
  boothTitle: string;
  status: "pending" | "active" | "suspended";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Optionally sync with Firebase to get latest user data
        if (realtimeDb && parsedUser.id) {
          const userRef = ref(realtimeDb, `sellers/${parsedUser.id}`);
          onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
              const firebaseUser = snapshot.val();
              const updatedUser = {
                id: parsedUser.id,
                name: `${firebaseUser.firstName} ${firebaseUser.lastName}`,
                email: firebaseUser.email || "",
                boothTitle: firebaseUser.boothTitle,
                status: firebaseUser.status,
              };
              setUser(updatedUser);
              localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            }
          });
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("currentUser");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
