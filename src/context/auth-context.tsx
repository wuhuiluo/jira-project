import React, { useState, useContext, ReactNode } from "react";
import * as auth from "../auth-provider";
import { User } from "../components/screen/panal-list/search-panel";
interface AuthForm {
  username: string;
  password: string;
}

type InitContext = {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<InitContext | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) =>
    auth.login(form).then((res) => setUser(res));
  const register = (form: AuthForm) =>
    auth.register(form).then((res) => setUser(res));
  const logout = () => auth.logout().then(() => setUser(null));
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用")
  }
  return context;
};
