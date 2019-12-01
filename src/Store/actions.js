//Токен
export const SET_TOKEN = "SET_TOKEN";

export function setToken(text) {
  return { type: SET_TOKEN, text };
}

//Пользователь
export const SET_USER = "SET_USER";

export function setUser(object) {
  return { type: SET_USER, object };
}

//Модальное окно
export const SET_MODAL_WINDOW_STATE = "SET_MODAL_WINDOW_STATE";
export const SET_MODAL_WINDOW_NAME = "SET_MODAL_WINDOW_NAME";

export function setModalWindowState(boolean) {
  return { type: SET_MODAL_WINDOW_STATE, boolean };
}

export function setModalWindowName(text) {
  return { type: SET_MODAL_WINDOW_NAME, text };
}
