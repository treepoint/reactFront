//Состояние приложения
export const SET_USER_LOGIN_STATE = "SET_USER_LOGIN_STATE";

//Генераторы действий для состояния приложения
export function setUserLoginState(boolean) {
  return { type: SET_USER_LOGIN_STATE, boolean };
}

//Типы действий для пользовательской информации
export const SET_USER = "SET_USER";

//Генераторы действий для пользовательской информации
export function setUser(object) {
  return { type: SET_USER, object };
}

//Генераторы действий для модального окона
export const SET_MODAL_WINDOW_STATE = "SET_MODAL_WINDOW_STATE";
export const SET_MODAL_WINDOW_NAME = "SET_MODAL_WINDOW_NAME";

//Типы действий для модального окна
export function setModalWindowState(boolean) {
  return { type: SET_MODAL_WINDOW_STATE, boolean };
}

export function setModalWindowName(text) {
  return { type: SET_MODAL_WINDOW_NAME, text };
}
