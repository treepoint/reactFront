//Типы действий для пользовательской информации
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_SECOND_NAME = "SET_USER_SECOND_NAME";
export const SET_USER_THIRD_NAME = "SET_USER_THIRD_NAME";

//Генераторы действий для пользовательской информации
export function setUserName(text) {
  return { type: SET_USER_NAME, text };
}

export function setUserSecondName(text) {
  return { type: SET_USER_SECOND_NAME, text };
}

export function setUserThirdName(text) {
  return { type: SET_USER_THIRD_NAME, text };
}

//Генераторы действий для модальных окон
export const SET_REGISTRATION_WINDOW_STATE = "SET_REGISTRATION_WINDOW_STATE";

//Типы действий для модальных окон
export function setRegistrationWindowState(boolean) {
  return { type: SET_REGISTRATION_WINDOW_STATE, boolean };
}
