/*
 * Методы для работы с API
 */
import { read_cookie } from "../Lib/Sfcookies";
import Axios from "axios";
import { APIURL } from "./Settings";

/*
 * Токены
 */

//Получим заголовки
function getHeaders() {
  return {
    headers: {
      Authorization: "Bearer " + read_cookie("token")
    }
  };
}

//Создание токена
export function getToken(user) {
  let url = APIURL + "/auth";

  return Axios.post(url, user, getHeaders())
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Обновить токен
export function reauth() {
  let url = APIURL + "/reauth";

  let refreshToken = read_cookie("refresh_token");

  //Если есть refresh токен
  if (refreshToken !== null) {
    //Пытаемся обновить данные по нему
    return Axios.post(url, { refreshToken }, getHeaders())
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }
}

/*
 * Пользователи
 */

//Создать пользователя
export function createUser(user) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/users/registration";

  return Axios.post(url, user, getHeaders()).then(response => {
    return response.data;
  });
}

//Обновить пользователя
export function updateUser(userID, user, headers) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/users/" + userID;

  return Axios.put(url, user, headers).then(response => {
    return response.data;
  });
}

//Получить категорию как объекта по ID
export function getUserByID(userID) {
  let url = APIURL + "/users/" + userID;

  return Axios.get(url, getHeaders()).then(response => {
    return response.data[0];
  });
}

//Получить пользователя как объекта по имени и паролю
export function getUserByEmailPassword(user) {
  let url = APIURL + "/users/token";

  return Axios.post(url, user, getHeaders()).then(response => {
    return response.data;
  });
}

//Получение списка пользователей как объектов в массиве
export function getUsers() {
  let url = APIURL + "/users";

  return Axios.get(url, getHeaders()).then(response => {
    return response.data;
  });
}

/*
 * Категории
 */

//Создать категорию
export function createCategory(user) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/categories";

  return Axios.post(url, user, getHeaders()).then(response => {
    return response.data;
  });
}

//Обновить категорию
export function updateCategory(userID, user) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/categories/" + userID;

  return Axios.put(url, user, getHeaders()).then(response => {
    return response.data;
  });
}

//Получить категорию как объект по ID
export function getCategoryByID(userID) {
  let url = APIURL + "/categories/" + userID;

  return Axios.get(url, getHeaders()).then(response => {
    return response.data[0];
  });
}

//Получить все категории пользователя как объекты в массиве
export function getUserCategories() {
  let url = APIURL + "/categories";

  return Axios.get(url, getHeaders()).then(response => {
    return response.data;
  });
}
