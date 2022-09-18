import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endPoint: string,
  { data, token, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toLocaleLowerCase() === "get") {
    endPoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endPoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const resData = await res.json();
    if (res.ok) {
      return resData;
    } else {
      return Promise.reject(resData);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endPoint, config]: Parameters<typeof http>) =>
    http(endPoint, { ...config, token: user?.token });
};
