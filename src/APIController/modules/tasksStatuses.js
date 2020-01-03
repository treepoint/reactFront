import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/task_statuses";

//Получить статус как объект по ID
export function getTaskStatusByID(ID, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.get(URL + "/" + ID, headers).then(response => {
    callback(response.data[0]);
  });
}

//Получить все статусы
export function getAllTaskStatuses(callback) {
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

//Создать статус
export function createStatus(status, callback) {
  if (typeof status !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.post(URL, status, headers)
    .then(response => {
      if (typeof response.data.insertId === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}

//Обновить статус по ID
export function updateStatus(status, callback) {
  if (typeof status !== "object") {
    return false;
  }

  let id = status.id;
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.put(URL + "/" + id, status, headers)
    .then(response => {
      if (typeof response.data.affectedRows === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}

//Удалить статус
export function deleteStatus(ID, callback) {
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
