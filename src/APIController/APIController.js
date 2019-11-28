import { read_cookie } from "sfcookies";

/*
 * Методы для работы с API
 */

import axios from "axios";

const Axios = axios.create({
  headers: {
    Authorization: "Bearer " + read_cookie("token")
  }
});

const APIURL = "http://localhost/api";

/*
 * Создание пользователя
 */
export function createUser(user) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/users";

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
export function createToken(user) {
  let url = APIURL + "/auth";

  return Axios.post(url, user)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}
