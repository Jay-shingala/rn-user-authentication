import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

function AuthContentProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContentProvider;