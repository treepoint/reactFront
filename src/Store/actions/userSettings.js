//Обвязка для API
import {
  APIURL,
  getHeaders,
  uploadedFilesDirectory
} from "../APIConfiguration";
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
      let userSettings = {};

      if (response.data.tasks_wallpaper !== null) {
        Object.assign(userSettings, response.data, {
          tasks_wallpaper:
            uploadedFilesDirectory + "/" + response.data.tasks_wallpaper
        });
      } else {
        Object.assign(userSettings, response.data, {
          tasks_wallpaper: ""
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

    Axios.post(URL + "/load_tasks_wallpaper", formData, headers)
      .then(response => {
        dispatch(
          setUserSettings({
            tasks_wallpaper:
              uploadedFilesDirectory + "/" + response.data.filename
          })
        );
      })
      .catch(error => { });
  };
}
