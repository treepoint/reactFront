//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import { setNotifications } from "./notifications";
import Axios from "axios";
const URL = APIURL + "/roles";

export const SET_USER_ROLES = "SET_USER_ROLES";
export const CLEAR_USER_ROLES = "CLEAR_USER_ROLES";

export function setUserRoles(object) {
  return { type: SET_USER_ROLES, object };
}

export function clearUsersRoles(object) {
  return { type: CLEAR_USER_ROLES, object };
}

//Получить все роли пользователе
export function fetchUserRoles() {
  return (dispatch, getState) => {
    const state = getState();

    //Если в сторе уже есть — ничего не делаем
    if (JSON.stringify(state.userRoles) !== "{}") {
      return;
    }

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.get(URL, headers)
      .then(response => {
        dispatch(setUserRoles(response.data));
      })
      .catch(error => {
        let message =
          "Не удалось получить роли пользователей. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}
