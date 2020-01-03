import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/tasks";

//Создать задачу
export function createTask(task) {
  if (typeof task !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.post(URL, task, headers).then(response => {
    return response.data;
  });
}

//Обновить задачу
export function updateTask(ID, task) {
  if (typeof task !== "object") {
    return false;
  }

  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.put(URL + "/" + ID, task, headers).then(response => {
    return response.data;
  });
}

//Получить задачу как объект по ID
export function getTaskByID(ID) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL + "/" + ID, headers).then(response => {
    return response.data[0];
  });
}

//Получить все задачи пользователя
export function getUserTasks() {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL, headers).then(response => {
    return response.data;
  });
}

//Получить все задачи пользователя за дату
export function getUserTasksByDate(date) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL + "/date/" + date, headers).then(response => {
    return response.data;
  });
}

//Удалить задачу
export function deleteTask(ID) {
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
