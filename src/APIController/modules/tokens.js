import Axios from "axios";
import { APIURL } from "../Settings";
import { read_cookie } from "../../Libs/Sfcookies";

//Получим заголовки
export function getHeaders() {
  let token = read_cookie("token");

  if (token.length === 0) {
    return null;
  }

  return {
    headers: {
      Authorization: "Bearer " + read_cookie("token")
    }
  };
}

//Создание токена
export function getToken(user) {
  let url = APIURL + "/auth";

  return Axios.post(url, user)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Обновить токен
export function reauth(refreshToken) {
  let url = APIURL + "/reauth";

  //Если есть refresh токен
  if (refreshToken.length !== 0) {
    //Пытаемся обновить данные по нему
    return Axios.post(url, { refreshToken })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
}
