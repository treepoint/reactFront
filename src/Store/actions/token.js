//Обвязка для API
import { APIURL } from "../APIConfiguration";
import Axios from "axios";
//Подключаем cookies
import { bake_cookie, delete_cookie } from "../../Libs/Sfcookies";

//Токен
export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const SET_AUTH_ERROR = "AUTH_ERROR";

export function setToken(text) {
  return { type: SET_TOKEN, text };
}

export function clearToken(text) {
  //Удалим куки
  delete_cookie("token");
  delete_cookie("refresh_token");
  delete_cookie("user_id");

  return { type: CLEAR_TOKEN, text };
}

export function setAuthError(text) {
  return { type: SET_AUTH_ERROR, text };
}

export function fetchToken() {
  return (dispatch, getState) => {
    //Создание токена
    let url = APIURL + "/auth";

    const state = getState();

    Axios.post(url, state.user)
      .then(response => {
        //Установим токен в стор
        dispatch(setToken(response.data.token.value));

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

        dispatch(setAuthError(null));
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
