import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/task_statuses";

//Получить статус как объект по ID
export function getTaskStatusByID(ID) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL + "/" + ID, headers).then(response => {
    return response.data[0];
  });
}

//Получить все статусы
export function getAllTaskStatuses() {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL, headers).then(response => {
    return response.data;
  });
}

//Обновить статус по ID
export function updateStatus(ID, status) {
  if (typeof status !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.put(URL + "/" + ID, status, headers).then(response => {
    return response.data;
  });
}

//Создать статус
export function createStatus(status) {
  if (typeof status !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.post(URL, status, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Удалить статус
export function deleteStatus(ID) {
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
