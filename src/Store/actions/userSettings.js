//Обвязка для API
import {
  APIURL,
  getHeaders
} from "../APIConfiguration";
import { setNotifications } from "./notifications";
import Axios from "axios";
const URL = APIURL + "/user_settings";

//Пользовательские настройки
export const SET_USER_SETTINGS = "SET_USER_SETTINGS";
export const CLEAR_USER_SETTINGS = "CLEAR_USER_SETTINGS";
export const IS_USER_SETTINGS_UPDATING = "IS_USER_SETTINGS_UPDATING";

export function setUserSettings(object) {
  return { type: SET_USER_SETTINGS, object };
}

export function clearUserSettings(object) {
  return { type: CLEAR_USER_SETTINGS, object };
}

export function setIsUpdating(boolean) {
  return { type: IS_USER_SETTINGS_UPDATING, boolean };
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
      let userSettings = {};

      if (response.data.wallpaper !== null) {
        Object.assign(userSettings, response.data, {
          wallpaper: response.data.wallpaper
        });
      } else {
        Object.assign(userSettings, response.data, {
          wallpaper: ""
        });
      }

      dispatch(setUserSettings(userSettings));
    });
  };
}

//Обновить обои
export function updateWallpapers(file) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    var formData = new FormData();
    formData.append("file", file, file.name);

    Axios.post(URL + "/load_wallpaper", formData, headers)
      .then(response => {
        dispatch(
          setUserSettings({
            wallpaper: response.data.filename
          })
        );
      })
      .catch(error => {
        let message =
          "Не удалось обновить обои. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Обновить настройки
export function updateUserSettings(userSettings) {
  return (dispatch, getState) => {
    dispatch(setIsUpdating(true));

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    //Соберем новые настройки
    let newUserSettings = Object.assign(getState().userSettings, userSettings);

    Axios.put(URL + "/" + newUserSettings.id, newUserSettings, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Обновим настройки
          dispatch(setUserSettings(response.data));
          dispatch(setIsUpdating(false));
        }
      })
      .catch(error => {
        let message =
          "Не удалось переключиться на другой проект. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
        dispatch(setIsUpdating(false));
      });
  };
}
