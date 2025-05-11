import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  accessToken: string | null;
  setLogin: (token: string) => void;
  setLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false); // prevent flicker

  useEffect(() => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
      }
    } catch (err) {
      console.warn("LocalStorage not available or blocked", err);
    } finally {
      setInitialized(true);
    }
  }, []);

  const setLogin = (token: string) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const setLogout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  const value: AuthContextType = {
    isAuthenticated: !!accessToken,
    accessToken,
    setLogin,
    setLogout,
  };

  if (!initialized) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
