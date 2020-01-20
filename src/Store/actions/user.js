//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
//Token
import { clearToken } from "./token";

const URL = APIURL + "/users";

export const SET_USER = "SET_USER";
export const UPDATE_ERROR = "UPDATE_ERROR";
export const CLEAR_USER = "CLEAR_USER";

export function setUser(object) {
  return { type: SET_USER, object };
}

export function clearUser(object) {
  return dispatch => {
    dispatch(clearToken());
    return { type: CLEAR_USER, object };
  };
}

export function setUpdateError(text) {
  return { type: UPDATE_ERROR, text };
}

//Обновить пользователя
export function updateUser(user) {
  return dispatch => {
    let id = user.id;

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.put(URL + "/" + id, user, headers)
      .then(response => {
        if (typeof response.data.affectedRows === "number") {
          dispatch(setUser(user));
          dispatch(setUpdateError(null));
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
