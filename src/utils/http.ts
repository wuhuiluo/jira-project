import qs from "qs";
import * as auth from "auth-provider";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token: string;
}

export const http = async (
  endPoint: string,
  { data, token, ...customConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endPoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data);
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
