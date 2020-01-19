//Токен
export const SET_TOKEN = "SET_TOKEN";

export function setToken(text) {
  return { type: SET_TOKEN, text };
}
