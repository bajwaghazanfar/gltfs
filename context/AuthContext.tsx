import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { User } from "../types/user";
interface IAuthContextProps {
  user: User | null;
  isloggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loginUser: () => void;
}

export const AuthContext = React.createContext<IAuthContextProps>({
  user: null,
  isloggedIn: true,
  setUser: () => {},
  setIsLoggedIn: () => {},
  loginUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isloggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const loginUser = () => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    if (token != undefined) {
      const decoded: User = jwt_decode(token);
      setUser(decoded);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isloggedIn,
        setIsLoggedIn,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
