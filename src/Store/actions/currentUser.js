//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
//Модалки
import { setModalWindowState, setModalWindowName } from "./globalModalWindow";
import { login } from "../../Components/GlobalModalWindow/GLOBAL_MODAL_WINDOWS";

const URL = APIURL + "/users";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_CURRENT_USER_IS_ADMIN = "SET_CURRENT_USER_IS_ADMIN";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";

export function setCurrentUserAndAdmin(object) {
  return dispatch => {
    //Если админ — проставим
    if (object.role === "admin") {
      dispatch(setCurrentUserIsAdmin(true));
    }
    dispatch(setCurrentUser(object));
  };
}

export function setCurrentUser(object) {
  return { type: SET_CURRENT_USER, object };
}

export function clearCurrentUser() {
  return dispatch => {
    dispatch(setCurrentUserIsAdmin(false));
    dispatch(setCurrentUser({}));
  };
}

export function setUpdateProfileError(text) {
  return { type: UPDATE_PROFILE_ERROR, text };
}

export function setRegistrationError(text) {
  return { type: REGISTRATION_ERROR, text };
}

export function setCurrentUserIsAdmin(boolean) {
  return { type: SET_CURRENT_USER_IS_ADMIN, boolean };
}

//Зарегистрировать пользователя
export function registration() {
  return (dispatch, getState) => {
    const state = getState();

    //Роль по умолчанию — пользователь, вторая
    const newUser = Object.assign({}, state.currentUser, { role_id: 2 });

    Axios.post(URL + "/registration", newUser, getHeaders())
      .then(response => {
        if (typeof response.data.insertId === "number") {
          //Откроем модалку входа
          dispatch(setModalWindowState(true));
          dispatch(setModalWindowName(login));
        }
      })
      .catch(error => {
        let errorMessage = null;

        switch (error.response.status) {
          case 409:
            errorMessage = "Пользователь с таким email уже зарегистрирован";
            break;
          default:
            errorMessage = "Произошла неизвестная ошибка";
        }
        dispatch(setRegistrationError(errorMessage));
      });
  };
}

//Обновить пользователя
export function updateProfile(user) {
  return (dispatch, getState) => {
    const id = user.id;

    const headers = getHeaders();

    if (headers === null) {
      return;
    }

    const state = getState();

    Axios.put(URL + "/" + id, user, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Обновим пользователя
          dispatch(setCurrentUser(user));
          //Обнулим ошибку
          dispatch(setUpdateProfileError(null));
          //Если открыто модальное окно — закроем
          if (state.modalWindowState === true) {
            dispatch(setModalWindowState(false));
          }
        }
      })
      .catch(error => {
        let errorMessage = null;

        switch (error.response.status) {
          case 409:
            errorMessage = "Такой email уже есть в базе";
            break;
          default:
            errorMessage = "Произошла неизвестная ошибка";
        }
        dispatch(setUpdateProfileError(errorMessage));
      });
  };
}
