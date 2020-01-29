//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
const URL = APIURL + "/user_settings";

//Пользовательские настройки
export const SET_USER_SETTINGS = "SET_USER_SETTINGS";
export const CLEAR_USER_SETTINGS = "CLEAR_USER_SETTINGS";
export const IS_USER_SETTINGS_UPDATING = "IS_USER_SETTINGS_UPDATING";
export const USER_SETTINGS_UPDATE_ERROR = "USER_SETTINGS_UPDATE_ERROR";

export function setUserSettings(object) {
  return { type: SET_USER_SETTINGS, object };
}

export function clearUserSettings(object) {
  return { type: CLEAR_USER_SETTINGS, object };
}

export function setIsUpdating(boolean) {
  return { type: IS_USER_SETTINGS_UPDATING, boolean };
}

export function setUpdateError(text) {
  return { type: USER_SETTINGS_UPDATE_ERROR, text };
}

//Получить все настройки
export function fetchUserSettings() {
  return (dispatch, getState) => {
    const state = getState();

    //Если в сторе уже есть — ничего не делаем
    if (JSON.stringify(state.userSettings) !== "{}") {
      return;
    }

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.get(URL, headers).then(response => {
      dispatch(setUserSettings(response.data));
    });
  };
}

//Обновить настройки
export function updateUserSettings(userSettings) {
  return dispatch => {
    dispatch(setIsUpdating(true));

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.put(URL + "/" + userSettings.id, userSettings, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Обновим список
          dispatch(setUserSettings(userSettings));
          dispatch(setIsUpdating(false));
        }
      })
      .catch(error => {
        dispatch(
          setUpdateError("Не удалось обновить пользовательские настройки")
        );
        dispatch(setIsUpdating(false));
      });
  };
}

//Обновить обои
export function updateTasksWallpapers(taskWallpaper) {
  /* {extension : "png", data : binary} */

  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.post(URL + "/load_tasks_wallpaper", taskWallpaper, headers)
      .then(response => {})
      .catch(error => {});
  };
}
