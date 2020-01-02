/*
 * Методы для работы с API
 */
import { read_cookie } from "../Libs/Sfcookies";
import Axios from "axios";
import { APIURL } from "./Settings";

/*
 * Токены
 */

//Получим заголовки
function getHeaders() {
  let token = read_cookie("token");

  if (token.length === 0) {
    return null;
  }

  return {
    headers: {
      Authorization: "Bearer " + read_cookie("token")
    }
  };
}

//Создание токена
export function getToken(user) {
  let url = APIURL + "/auth";

  return Axios.post(url, user)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Обновить токен
export function reauth(refreshToken) {
  let url = APIURL + "/reauth";

  //Если есть refresh токен
  if (refreshToken.length !== 0) {
    //Пытаемся обновить данные по нему
    return Axios.post(url, { refreshToken })
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

  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/users/" + ID;

  return Axios.put(url, user, headers).then(response => {
    return response.data;
  });
}

//Получить пользователя как объекта по ID
export function getUserByID(ID) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/users/" + ID;

  return Axios.get(url, headers).then(response => {
    return response.data[0];
  });
}

//Получить пользователя как объекта по имени и паролю
export function getUserByEmailPassword(user) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/users/token";

  return Axios.post(url, user, headers).then(response => {
    return response.data;
  });
}

//Получение списка пользователей как объектов в массиве
export function getUsers() {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/users";

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

/*
 * Роли
 */

//Получение списка пользователей как объектов в массиве
export function getRoles() {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/roles";

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

/*
 * Категории
 */

//Создать категорию
export function createCategory(category) {
  if (typeof category !== "object") {
    return false;
  }

  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories";

  return Axios.post(url, category, headers).then(response => {
    return response.data;
  });
}

//Обновить категорию
export function updateCategory(ID, category) {
  if (typeof category !== "object") {
    return false;
  }

  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories/" + ID;

  return Axios.put(url, category, headers).then(response => {
    return response.data;
  });
}

//Удалить задачу
export function deleteCategory(ID) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories/" + ID;

  return Axios.delete(url, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Получить категорию как объект по ID
export function getCategoryByID(ID) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories/" + ID;

  return Axios.get(url, headers).then(response => {
    return response.data[0];
  });
}

//Получить все категории пользователя как объекты в массиве
export function getUserCategories() {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories";

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

/*
 * Статистика по категориям
 */

//Получаем время исполнения по всем категориям
export function getTimeExecutionForAllCategories() {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories/time_execution/all";

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

//Получаем время исполнения по всем категориям за определенный день
export function getTimeExecutionForAllCategoriesByDate(date) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/categories/time_execution/date/" + date;

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

/*
 * Задачи
 */

//Создать задачу
export function createTask(task) {
  if (typeof task !== "object") {
    return false;
  }

  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks";

  return Axios.post(url, task, headers).then(response => {
    return response.data;
  });
}

//Обновить задачу
export function updateTask(ID, task) {
  if (typeof task !== "object") {
    return false;
  }

  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks/" + ID;

  return Axios.put(url, task, headers).then(response => {
    return response.data;
  });
}

//Получить задачу как объект по ID
export function getTaskByID(ID) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks/" + ID;

  return Axios.get(url, headers).then(response => {
    return response.data[0];
  });
}

//Получить все задачи пользователя
export function getUserTasks() {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks";

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

//Получить все задачи пользователя за дату
export function getUserTasksByDate(date) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks/date/" + date;

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

//Удалить задачу
export function deleteTask(ID) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks/" + ID;

  return Axios.delete(url, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

/*
 * Лог выполнения задач
 */

//Получить весь лог выполнения всех задач
export function getTasksLog() {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks_log";

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

//Получить весь лог выполнения всех задач за день
export function getTasksLogByDate(date) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks_log/date/" + date;

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

//Обновить лог по ID
export function updateTaskLog(ID, taskLog) {
  if (typeof taskLog !== "object") {
    return false;
  }

  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks_log/" + ID;

  return Axios.put(url, taskLog, headers).then(response => {
    return response.data;
  });
}

//Добавить запись в лог выполнения задач
export function createTaskLog(taskLog) {
  if (typeof taskLog !== "object") {
    return false;
  }

  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks_log";

  return Axios.post(url, taskLog, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Удалить запись из лога выполнения задач
export function deleteTaskLog(ID) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks_log/" + ID;

  return Axios.delete(url, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

/*
 * Статусы задач
 */

//Получить статус как объект по ID
export function getTaskStatusByID(ID) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/task_statuses/" + ID;

  return Axios.get(url, headers).then(response => {
    return response.data[0];
  });
}

//Получить все статусы
export function getAllTaskStatuses() {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/task_statuses";

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

//Обновить статус по ID
export function updateStatus(ID, status) {
  if (typeof status !== "object") {
    return false;
  }

  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/task_statuses/" + ID;

  return Axios.put(url, status, headers).then(response => {
    return response.data;
  });
}

//Создать статус
export function createStatus(status) {
  if (typeof status !== "object") {
    return false;
  }

  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/task_statuses";

  return Axios.post(url, status, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

//Удалить статус
export function deleteStatus(ID) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/task_statuses/" + ID;

  return Axios.delete(url, headers)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
}

/*
 * Типы статусов задач
 */

export function getAllTaskStatusesTypes() {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/task_statuses_types";

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}

/*
 * Статистика
 */

//Получить статистику по задачам за период
export function getTaskStatisticByPeriod(from, to) {
  let headers = getHeaders();

  if (headers === null) {
    return;
  }

  let url = APIURL + "/tasks/statistic/period/" + from + "/" + to;

  return Axios.get(url, headers).then(response => {
    return response.data;
  });
}
