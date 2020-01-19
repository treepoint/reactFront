//Модальное окно
export const SET_MODAL_WINDOW_STATE = "SET_MODAL_WINDOW_STATE";
export const SET_MODAL_WINDOW_NAME = "SET_MODAL_WINDOW_NAME";

export function setModalWindowState(boolean) {
  return { type: SET_MODAL_WINDOW_STATE, boolean };
}

export function setModalWindowName(text) {
  return { type: SET_MODAL_WINDOW_NAME, text };
}
