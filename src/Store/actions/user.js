//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
import { setModalWindowState } from "./globalModalWindow";

const URL = APIURL + "/users";

export const SET_USER = "SET_USER";
export const UPDATE_ERROR = "UPDATE_ERROR";
export const SET_USER_IS_ADMIN = "SET_USER_IS_ADMIN";

export function setUserAndAdmin(object) {
  return dispatch => {
    //Если админ — проставим
    if (object.role === "admin") {
      dispatch(setUserIsAdmin(true));
    }
    dispatch(setUser(object));
  };
}

export function setUser(object) {
  return { type: SET_USER, object };
}

export function clearUser() {
  return dispatch => {
    dispatch(setUserIsAdmin(false));
    dispatch(setUser({}));
  };
}

export function setUpdateError(text) {
  return { type: UPDATE_ERROR, text };
}

export function setUserIsAdmin(boolean) {
  return { type: SET_USER_IS_ADMIN, boolean };
}

//Обновить пользователя
export function updateUser(user) {
  return (dispatch, getState) => {
    const id = user.id;

    const headers = getHeaders();

    if (headers === null) {
      return;
    }

    const state = getState();

    Axios.put(URL + "/" + id, user, headers)
      .then(response => {
        if (typeof response.data.affectedRows === "number") {
          //Обновим пользователя
          dispatch(setUser(user));
          //Обнулим ошибку
          dispatch(setUpdateError(null));
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
        dispatch(setUpdateError(errorMessage));
      });
  };
}

//Получить пользователя по ID из API и записать его
export function setUserAndAdminByID(id) {
  return dispatch => {
    const headers = getHeaders();

    if (headers === null) {
      return;
    }
    Axios.get(URL + "/" + id, headers).then(response => {
      dispatch(setUserAndAdmin(response.data[0]));
    });
  };
}
