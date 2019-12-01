import { read_cookie } from "sfcookies";
import { APIURL } from "./Settings";

/*
 * Методы для работы с API
 */

import axios from "axios";

//Добавляем отправку авторизационного токена
const Axios = axios.create({
  headers: {
    Authorization: "Bearer " + read_cookie("token")
  }
});

/*
 * Создание пользователя
 */
export function createUser(user) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/users/registration";

  return Axios.post(url, user).then(response => {
    return response.data;
  });
}

/*
 * Обновление пользователя
 */
export function updateUser(userID, user) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/users/" + userID;

  return Axios.put(url, user).then(response => {
    return response.data;
  });
}

/*
 * Получение токена как объекта по ID
 */
export function getUserByID(userID) {
  let url = APIURL + "/users/" + userID;

  return Axios.get(url).then(response => {
    return response.data[0];
  });
}

/*
 * Получение пользователя как объекта по имени и паролю
 */
export function getUserByEmailPassword(user) {
  let url = APIURL + "/users/token";

  return Axios.post(url, user).then(response => {
    return response.data;
  });
}

/*
 * Получение списка пользователей как объектов в массиве
 */
export function getUsers() {
  let url = APIURL + "/users";

  return Axios.get(url).then(response => {
    return response.data;
  });
}

/*
 * Получение токена как объекта по ID
 */
export function getTokenByID(tokenID) {
  let url = APIURL + "/tokens/" + tokenID;

  return Axios.get(url).then(response => {
    return response.data;
  });
}

/*
 * Создание токена
 */
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

/*
 * Обновить токен
 */
export function refreshToken() {
  let url = APIURL + "/reauth";

  let refreshToken = read_cookie("refresh_token");

  //Если есть refresh токен
  if (refreshToken !== null) {
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
