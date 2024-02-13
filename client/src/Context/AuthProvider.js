import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "./AuthContext";
import { googleLogout } from "@react-oauth/google";

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeToken] = useCookies(["access_token"]);
  const [accessToken, setAccessToken] = useState(cookies["access_token"] || "");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    setAccessToken(cookies.access_token);
    setIsAuthenticated(true);
    if (!cookies.access_token) {
      setIsAuthenticated(false);
      console.log("Not");
    }
    console.log("access token", accessToken);
  }, [cookies]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    googleLogout();
    removeToken(["access_token"]);
    setAccessToken("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
