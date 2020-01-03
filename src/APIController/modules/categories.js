import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/categories";

//Создать категорию
export function createCategory(category) {
  if (typeof category !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.post(URL, category, headers).then(response => {
    return response.data;
  });
}

//Обновить категорию
export function updateCategory(ID, category) {
  if (typeof category !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.put(URL + "/" + ID, category, headers).then(response => {
    return response.data;
  });
}

//Удалить задачу
export function deleteCategory(ID) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.delete(URL + "/" + ID, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Получить категорию как объект по ID
export function getCategoryByID(ID) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL + "/" + ID, headers).then(response => {
    return response.data[0];
  });
}

//Получить все категории пользователя как объекты в массиве
export function getUserCategories() {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL, headers).then(response => {
    return response.data;
  });
}
