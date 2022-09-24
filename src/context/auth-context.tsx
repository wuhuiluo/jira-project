import React, { useContext, ReactNode } from "react";
import { http } from "utils/http";
import { useMount } from "utils";
import * as auth from "../auth-provider";
import { User } from "../components/screen/panal-list/search-panel";
import { useAsync } from "utils/use-async";
import { FullPageErrorCallBack, FullPageLoading } from "components/lib";
import { DevTools } from "jira-dev-tool";
interface AuthForm {
  username: string;
  password: string;
}

const InitUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token: token })
    user = data.user
  }
  return user
};

type InitContext = {
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<InitContext | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isIdle, isLoading, isError, run, setData: setUser, data: user, error } = useAsync<User>()
  const login = (form: AuthForm) =>
    auth.login(form).then((res) => setUser(res));
  const register = (form: AuthForm) =>
    auth.register(form).then((res) => setUser(res));
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(InitUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <div>
      <DevTools></DevTools>
      <FullPageErrorCallBack error={error}></FullPageErrorCallBack>
    </div>
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用")
  }
  return context;
};
