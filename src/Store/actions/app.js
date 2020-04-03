//Обвязка для API
import { APIURL } from "../APIConfiguration";
import Axios from "axios";
//Подключаем роутер
import { push } from "connected-react-router";
//Подключаем cookies
import { read_cookie, bake_cookie, delete_cookie } from "../../Libs/Sfcookies";
//Другие actions
import { setToken } from "./token";
import { setNotifications } from "./notifications";
import {
  setCurrentUserAndAdminByID,
  setCurrentUserAndAdmin
} from "./currentUser";
import { fetchCategories } from "./categories";
import { fetchTasksByDate } from "./tasks";
import { fetchTasksLogByDate } from "./tasksLog";
import { setModalWindowState } from "./globalModalWindow";
import { fetchUserSettings } from "./userSettings";
import { getCurrentFormatDate } from "../../Libs/TimeUtils";

export const SET_USER_AUTH_STATE = "SET_USER_AUTH_STATE";
export const SET_AUTH_ERROR = "AUTH_ERROR";
export const CLEAR_STATE = "CLEAR_STATE";
export const SET_SHOW_BROADCAST_MESSAGE = "SET_SHOW_BROADCAST_MESSAGE";
export const SET_SHOW_HEADER_WARNING = "SET_SHOW_HEADER_WARNING";
export const SET_WINDOW_HEIGHT = "SET_WINDOW_HEIGHT";
export const SET_WINDOW_WIDTH = "SET_WINDOW_WIDTH";
export const SET_TITLE = "SET_TITLE";

export function setUserAuthState(boolean) {
  return { type: SET_USER_AUTH_STATE, boolean };
}

export function setAuthError(text) {
  return { type: SET_AUTH_ERROR, text };
}

export function clearState() {
  return { type: CLEAR_STATE };
}

export function setShowBroadcastMessage(boolean) {
  return { type: SET_SHOW_BROADCAST_MESSAGE, boolean };
}

export function setShowHeaderWarning(boolean) {
  return { type: SET_SHOW_HEADER_WARNING, boolean };
}

export function setWindowHeight(number) {
  return { type: SET_WINDOW_HEIGHT, number };
}

export function setWindowWidth(number) {
  return { type: SET_WINDOW_WIDTH, number };
}

export function setTitle(string) {
  return { type: SET_TITLE, string };
}

export function logoff() {
  return dispatch => {
    //Очистим стор
    dispatch(clearState());

    //Очистим cookies
    delete_cookie("token");
    delete_cookie("user_id");
    delete_cookie("refresh_token");

    dispatch(push("/"));
  };
}

export function restoreFromCookies() {
  return dispatch => {
    const token = read_cookie("token");
    const userId = read_cookie("user_id");
    const refreshToken = read_cookie("refresh_token");

    //Если есть обычный токен — попробуем по нему
    if (token.length !== 0 && userId.length !== 0) {
      //Токен из cookies
      dispatch(setToken(token));

      //Пользователя получим по ID. Если токен не рабочий — ничего не получим, все четко.
      dispatch(setCurrentUserAndAdminByID(userId));

      //Проставим авторизацию
      dispatch(setUserAuthState(true));

      //Загрузим все данные приложения
      dispatch(loadAllData());

      return;
    }

    //Если есть refreshToken — по нему
    if (refreshToken.length !== 0) {
      dispatch(reauth(refreshToken));
      return;
    }
  };
}

export function reauth(refreshToken) {
  return dispatch => {
    //Обновление токена
    const url = APIURL + "/reauth";

    //Пытаемся обновить данные по нему
    Axios.post(url, { refreshToken }).then(response => {
      //Unixtime в обычное время
      let tokenExp = new Date(response.data.token.exp * 1000);

      //Unixtime в обычное время
      let refreshTokenExp = new Date(response.data.refreshToken.exp * 1000);

      //Заготовим печеньки
      bake_cookie("token", response.data.token.value, tokenExp);
      bake_cookie("user_id", response.data.user.id, tokenExp);
      bake_cookie(
        "refresh_token",
        response.data.refreshToken.value,
        refreshTokenExp
      );

      //Проставим токен
      dispatch(setToken(response.data.token.value));
      //Пользователя
      dispatch(setCurrentUserAndAdmin(response.data.user));
      //Авторизацию
      dispatch(setUserAuthState(true));
      //Загрузим все данные приложения
      dispatch(loadAllData());
    });
  };
}

export function login() {
  return (dispatch, getState) => {
    //Создание токена
    let url = APIURL + "/auth";

    const state = getState();

    Axios.post(url, state.currentUser)
      .then(response => {
        //Unixtime в обычное время
        let tokenExp = new Date(response.data.token.exp * 1000);

        //Unixtime в обычное время
        let refreshTokenExp = new Date(response.data.refreshToken.exp * 1000);

        bake_cookie("token", response.data.token.value, tokenExp);
        bake_cookie("user_id", response.data.user.id, tokenExp);
        bake_cookie(
          "refresh_token",
          response.data.refreshToken.value,
          refreshTokenExp
        );

        //Установим токен в стор
        dispatch(setToken(response.data.token.value));

        //Пользователя
        dispatch(setCurrentUserAndAdmin(response.data.user));

        //Обнулим ошибку авторизации
        dispatch(setAuthError(null));

        //Проставим авторизацию
        dispatch(setUserAuthState(true));

        //Загрузим все данные приложения
        dispatch(loadAllData());

        //Если открыто модальное окно — закроем
        if (state.modalWindowState === true) {
          dispatch(setModalWindowState(false));
        }

        dispatch(push("/tasks_manager"));
      })
      .catch(error => {
        let errorMessage = null;

        switch (error.response.status) {
          case 404:
            errorMessage = "Пользователь с таким логином и паролем не найден";

            break;
          default:
            errorMessage = "Произошла неизвестная ошибка";
        }

        dispatch(setAuthError(errorMessage));
      });
  };
}

export function loadAllData() {
  return dispatch => {
    //Проставим пользовательские настройки
    dispatch(fetchUserSettings());
    //Загрузим категории
    dispatch(fetchCategories());
    //Загрузим задачи
    dispatch(fetchTasksByDate(getCurrentFormatDate()));
    //Загрузим лог задач
    dispatch(fetchTasksLogByDate(getCurrentFormatDate()));
  };
}

export function setBrowserWarning() {
  return dispatch => {
    let message =
      "Веб-приложение находится в разработке. Рекомендуемый браузер — Firefox.";
    //Запишем ошибку
    dispatch(setNotifications({ message, type: "warning" }));
  };
}
