//Обвязка для API
import { APIURL } from "../APIConfiguration";
import Axios from "axios";
//Подключаем cookies
import { read_cookie, bake_cookie, delete_cookie } from "../../Libs/Sfcookies";
//Другие actions
import { clearToken, setToken } from "./token";
import { clearUser, setUserAndAdminByID, setUserAndAdmin } from "./user";
import { setModalWindowState } from "./globalModalWindow";
import { clearTaskStatusesTypes } from "./taskStatusesTypes";

export const SET_USER_AUTH_STATE = "SET_USER_AUTH_STATE";
export const SET_AUTH_ERROR = "AUTH_ERROR";

export function setUserAuthState(boolean) {
  return { type: SET_USER_AUTH_STATE, boolean };
}

export function setAuthError(text) {
  return { type: SET_AUTH_ERROR, text };
}

export function logoff() {
  return (dispatch, getState) => {
    //Очистим авторизацию
    dispatch(setUserAuthState(false));
    //Очистим токен
    dispatch(clearToken());
    //Очистим пользователя
    dispatch(clearUser());
    //Очистим типы статусов
    dispatch(clearTaskStatusesTypes());

    //Очистим cookies
    delete_cookie("token");
    delete_cookie("user_id");
    delete_cookie("refresh_token");

    const state = getState();

    //Если открыто модальное окно — закроем
    if (state.modalWindowState === true) {
      dispatch(setModalWindowState(false));
    }
  };
}

export function login() {
  return (dispatch, getState) => {
    //Авторизуемся
    dispatch(auth());

    const state = getState();

    //Если открыто модальное окно — закроем
    if (state.modalWindowState === true) {
      dispatch(setModalWindowState(false));
    }
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
      dispatch(setUserAndAdminByID(userId));

      //Проставим авторизацию
      dispatch(setUserAuthState(true));

      return;
    }

    //Если есть refreshToken — по нему
    if (refreshToken.length !== 0) {
      dispatch(reauth(refreshToken));
      //Проставим авторизацию
      dispatch(setUserAuthState(true));
      return;
    }
  };
}

export function auth() {
  return (dispatch, getState) => {
    //Создание токена
    let url = APIURL + "/auth";

    const state = getState();

    Axios.post(url, state.user)
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
        dispatch(setUserAndAdmin(response.data.user));

        //Обнулим ошибку авторизации
        dispatch(setAuthError(null));

        //Проставим авторизацию
        dispatch(setUserAuthState(true));
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
      dispatch(setUserAndAdmin(response.data.user));

      //Авторизацию
      dispatch(setUserAuthState(true));
    });
  };
}
