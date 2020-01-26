//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
import { fetchUserRoles } from "./userRoles";
const URL = APIURL + "/users";

export const SET_USERS = "SET_USERS";
export const IS_USERS_UPDATING = "IS_USERS_UPDATING";
export const REMOVE_USER = "REMOVE_USER";
export const CLEAR_USERS = "CLEAR_USERS";
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR";
export const USER_DELETE_ERROR = "USER_DELETE_ERROR";

export function setUsers(object) {
  return { type: SET_USERS, object };
}

export function setIsUpdating(boolean) {
  return { type: IS_USERS_UPDATING, boolean };
}

export function clearUsers(object) {
  return { type: CLEAR_USERS, object };
}

export function setUpdateError(text) {
  return { type: USER_UPDATE_ERROR, text };
}

export function setDeleteError(text) {
  return { type: USER_DELETE_ERROR, text };
}

//Получить всех пользователей
export function fetchUsers() {
  return (dispatch, getState) => {
    const state = getState();

    //Если в сторе уже есть — ничего не делаем
    if (JSON.stringify(state.users) !== "{}") {
      return;
    }

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.get(URL, headers).then(response => {
      //Получим пользователей
      dispatch(setUsers(response.data));
      //А потом их роли
      dispatch(fetchUserRoles());
    });
  };
}

//Обновить пользователя
export function updateUser(user) {
  return dispatch => {
    dispatch(setIsUpdating(true));

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.put(URL + "/" + user.id, user, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Обновим список
          dispatch(setUsers(response.data));
          dispatch(setIsUpdating(false));
        }
      })
      .catch(error => {
        dispatch(setUpdateError("Не удалось обновить пользователя"));
        dispatch(setIsUpdating(false));
      });
  };
}

//Удалить пользователя
export function deleteUser(id) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.delete(URL + "/" + id, headers)
      .then(response => {
        if (typeof response.data.affectedRows === "number") {
          //Удалим объект и обновим список
          dispatch(removeUser(id));
        }
      })
      .catch(error => {
        dispatch(setDeleteError("Не удалось удалить пользователя"));
      });
  };
}

function removeUser(id) {
  return { type: REMOVE_USER, id };
}
