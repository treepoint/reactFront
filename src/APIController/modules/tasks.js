import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/tasks";

//Получить задачу как объект по ID
export function getTaskByID(ID, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL + "/" + ID, headers).then(response => {
    callback(response.data[0]);
  });
}

//Получить все задачи пользователя
export function getUserTasks(callback) {
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

//Получить все задачи пользователя за дату
export function getUserTasksByDate(date, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.get(URL + "/date/" + date, headers).then(response => {
    let result = response.data;

    if (Array.isArray(result)) {
      callback(result);
    }
  });
}

//Создать задачу
export function createTask(task, callback) {
  if (typeof task !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.post(URL, task, headers)
    .then(response => {
      if (typeof response.data.insertId === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}

//Обновить задачу
export function updateTask(task, callback) {
  if (typeof task !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  let id = task.id;

  Axios.put(URL + "/" + id, task, headers)
    .then(response => {
      if (typeof response.data.affectedRows === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}

//Удалить задачу
export function deleteTask(ID, callback) {
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
