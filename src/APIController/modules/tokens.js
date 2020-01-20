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

//Обновить токен
export function reauth(refreshToken, callback) {
  let url = APIURL + "/reauth";

  //Если есть refresh токен
  if (refreshToken.length !== 0) {
    //Пытаемся обновить данные по нему
    Axios.post(url, { refreshToken })
      .then(response => {
        callback(response.data);
      })
      .catch(error => {
        callback(error);
      });
  }
}
