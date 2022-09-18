import { User } from "components/screen/panal-list/search-panel";
const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);


export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (loginInfo: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(loginInfo);
    }
  });
};

export const register = (registerInfo: {
  username: string;
  password: string;
}) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerInfo),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(registerInfo);
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(await localStorageKey);
