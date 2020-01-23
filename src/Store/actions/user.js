//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
//Модалки
import { setModalWindowState, setModalWindowName } from "./globalModalWindow";
import { login } from "../../Components/GlobalModalWindow/GLOBAL_MODAL_WINDOWS";

const URL = APIURL + "/users";

export const SET_USER = "SET_USER";
export const UPDATE_ERROR = "UPDATE_ERROR";
export const CREATE_ERROR = "CREATE_ERROR";
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

export function setCreateError(text) {
  return { type: CREATE_ERROR, text };
}

export function setUserIsAdmin(boolean) {
  return { type: SET_USER_IS_ADMIN, boolean };
}

//Создать пользователя
export function createUser() {
  return (dispatch, getState) => {
    const state = getState();

    //Роль по умолчанию — пользователь, вторая
    const newUser = Object.assign({}, state.user, { role_id: 2 });

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
        dispatch(setCreateError(errorMessage));
      });
  };
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
