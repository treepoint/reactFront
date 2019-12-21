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

  //Роль по умолчанию — пользователь. Вторая
  return Axios.post(url, Object.assign({}, user, { role_id: 2 }), getHeaders())
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

  let url = APIURL + "/users/" + ID;

  return Axios.put(url, user, getHeaders()).then(response => {
    return response.data;
  });
}

//Получить пользователя как объекта по ID
export function getUserByID(ID) {
  let url = APIURL + "/users/" + ID;

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
 * Роли
 */

//Получение списка пользователей как объектов в массиве
export function getRoles() {
  let url = APIURL + "/roles";

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
export function updateCategory(ID, user) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/categories/" + ID;

  return Axios.put(url, user, getHeaders()).then(response => {
    return response.data;
  });
}

//Получить категорию как объект по ID
export function getCategoryByID(ID) {
  let url = APIURL + "/categories/" + ID;

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

/*
 * Задачи
 */

//Создать задачу
export function createTask(user) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/tasks";

  return Axios.post(url, user, getHeaders()).then(response => {
    return response.data;
  });
}

//Обновить задачу
export function updateTask(ID, user) {
  if (typeof user !== "object") {
    return false;
  }

  let url = APIURL + "/tasks/" + ID;

  return Axios.put(url, user, getHeaders()).then(response => {
    return response.data;
  });
}

//Получить задачу как объект по ID
export function getTaskByID(ID) {
  let url = APIURL + "/tasks/" + ID;

  return Axios.get(url, getHeaders()).then(response => {
    return response.data[0];
  });
}

//Получить все задачи пользователя как объекты в массиве
export function getUserTasks() {
  let url = APIURL + "/tasks";

  return Axios.get(url, getHeaders()).then(response => {
    return response.data;
  });
}

/*
 * Статусы задач
 */

//Получить статус как объект по ID
export function getTaskStatusByID(ID) {
  let url = APIURL + "/task_statuses/" + ID;

  return Axios.get(url, getHeaders()).then(response => {
    return response.data[0];
  });
}

//Получить все статусы
export function getAllTaskStatuses() {
  let url = APIURL + "/task_statuses";

  return Axios.get(url, getHeaders()).then(response => {
    return response.data;
  });
}

//Обновить статус по ID
export function updateStatus(ID, status) {
  if (typeof status !== "object") {
    return false;
  }

  let url = APIURL + "/task_statuses/" + ID;

  return Axios.put(url, status, getHeaders()).then(response => {
    return response.data;
  });
}

/*
 * Лог выполнения задач
 */

//Получить весь лог выполнения задач
export function getTasksLog() {
  let url = APIURL + "/tasks_log";

  return Axios.get(url, getHeaders()).then(response => {
    return response.data;
  });
}
