import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/users";

//Получить пользователя как объект по ID
export function getUserByID(ID) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL + "/" + ID, headers).then(response => {
    return response.data[0];
  });
}

//Получить пользователя по имени и паролю
export function getUserByEmailPassword(user) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.post(URL + "/token", user, headers).then(response => {
    return response.data;
  });
}

//Получение списка пользователей как объектов в массиве
export function getUsers() {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL, headers).then(response => {
    return response.data;
  });
}

export function createUser(user) {
  if (typeof user !== "object") {
    return false;
  }

  let newUser = Object.assign({}, user, { role_id: 2 });

  //Роль по умолчанию — пользователь. Вторая
  return Axios.post(URL + "/registration", newUser, tokens.getHeaders())
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Обновить пользователя
export function updateUser(ID, user) {
  if (typeof user !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.put(URL + "/" + ID, user, headers).then(response => {
    return response.data;
  });
}
