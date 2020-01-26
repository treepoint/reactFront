//Токен
export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";

export function setToken(text) {
  return { type: SET_TOKEN, text };
}

export function clearToken(text) {
  return { type: CLEAR_TOKEN, text };
}
