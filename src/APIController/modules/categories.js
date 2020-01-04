import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/categories";

//Получить категорию как объект по ID
export function getCategoryByID(ID, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.get(URL + "/" + ID, headers).then(response => {
    callback(response.data[0]);
  });
}

//Получить все категории пользователя
export function getUserCategories(callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.get(URL, headers).then(response => {
    let result = response.data;

    if (Array.isArray(result)) {
      callback(result);
    }
  });
}

//Создать категорию
export function createCategory(category, callback) {
  if (typeof category !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.post(URL, category, headers)
    .then(response => {
      if (typeof response.data.insertId === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}

//Обновить категорию
export function updateCategory(category, callback) {
  if (typeof category !== "object") {
    return false;
  }

  let id = category.id;
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.put(URL + "/" + id, category, headers)
    .then(response => {
      if (typeof response.data.affectedRows === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}

//Удалить категорию
export function deleteCategory(ID, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.delete(URL + "/" + ID, headers)
    .then(response => {
      if (typeof response.data.affectedRows === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}
