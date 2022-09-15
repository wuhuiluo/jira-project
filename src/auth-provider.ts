import { User } from "components/screen/panal-list/search-panel";
const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (loginInfo: { username: string; password: string }) => {
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
  });
};

export const register = (registerInfo: { username: string; password: string }) => {
    fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInfo),
    }).then(async (res) => {
      if (res.ok) {
        handleUserResponse(await res.json());
      }
    })
}

export const logout = () => window.localStorage.removeItem(localStorageKey)