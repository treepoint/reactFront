//Состояние приложения
export const SET_USER_LOGIN_STATE = "SET_USER_LOGIN_STATE";

//Генераторы действий для состояния приложения
export function setUserLoginState(boolean) {
  return { type: SET_USER_LOGIN_STATE, boolean };
}

//Типы действий для пользовательской информации
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_PASSWORD = "SET_USER_PASSWORD";

//Генераторы действий для пользовательской информации
export function setUserEmail(text) {
  return { type: SET_USER_EMAIL, text };
}

export function setUserPassword(text) {
  return { type: SET_USER_PASSWORD, text };
}

//Генераторы действий для модальных окон
export const SET_REGISTRATION_WINDOW_STATE = "SET_REGISTRATION_WINDOW_STATE";
export const SET_LOGIN_WINDOW_STATE = "SET_LOGIN_WINDOW_STATE";

//Типы действий для модального окна
export function setRegistrationWindowState(boolean) {
  return { type: SET_REGISTRATION_WINDOW_STATE, boolean };
}

export function setLoginWindowState(boolean) {
  return { type: SET_LOGIN_WINDOW_STATE, boolean };
}
