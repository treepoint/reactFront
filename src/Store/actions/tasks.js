//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
import { fetchTaskStatuses } from "./taskStatuses";
import { fetchCategories } from "./categories";
import { removeTaskLog } from "./tasksLog";

const URL = APIURL + "/tasks";

export const SET_TASKS = "SET_TASKS";
export const IS_TASKS_UPDATING = "IS_TASKS_UPDATING";
export const REMOVE_TASK = "REMOVE_TASK";
export const CLEAR_TASKS = "CLEAR_TASKS";
export const TASK_CREATE_ERROR = "TASK_CREATE_ERROR";
export const TASK_UPDATE_ERROR = "TASK_UPDATE_ERROR";
export const TASK_DELETE_ERROR = "TASK_DELETE_ERROR";

export function setTasks(object) {
  return { type: SET_TASKS, object };
}

export function setIsUpdating(boolean) {
  return { type: IS_TASKS_UPDATING, boolean };
}

export function clearTasks(object) {
  return { type: CLEAR_TASKS, object };
}

export function setCreateError(text) {
  return { type: TASK_CREATE_ERROR, text };
}

export function setUpdateError(text) {
  return { type: TASK_UPDATE_ERROR, text };
}

export function setDeleteError(text) {
  return { type: TASK_DELETE_ERROR, text };
}

//Получить все статусы задач за определенный период
export function fetchTasksByDate(date) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.get(URL + "/date/" + date, headers).then(response => {
      dispatch(setTasks(response.data));
      dispatch(fetchTaskStatuses());
      dispatch(fetchCategories());
    });
  };
}

//Создать задачу
export function createTask(date) {
  return (dispatch, getState) => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    const state = getState();

    let task = {
      category_id: Object.keys(state.categories)[0],
      status_id: Object.keys(state.taskStatuses)[0],
      name: "",
      name_style: "{}",
      description: "<br>",
      create_date: date
    };

    Axios.post(URL, task, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //К нему добавим новый объект и обновим список
          dispatch(setTasks(response.data));
        }
      })
      .catch(error => {
        dispatch(setCreateError("Не удалось добавить задачу"));
      });
  };
}

//Обновить задачу
export function updateTask(task, forDate) {
  return dispatch => {
    dispatch(setIsUpdating(true));

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.put(URL + "/" + task.id, task, headers)
      .then(response => {
        if (typeof response.data === "object") {
          let updatedTask = response.data;
          //Проставим дату за которую считаем таску
          updatedTask[Object.keys(updatedTask)[0]].for_date = forDate;
          //Проставим время исполнения из исходного таска
          updatedTask[Object.keys(updatedTask)[0]].execution_time_to_day =
            task.execution_time_all;
          updatedTask[Object.keys(updatedTask)[0]].execution_time_day =
            task.execution_time_day;
          //Обновим список
          dispatch(setTasks(updatedTask));
          dispatch(setIsUpdating(false));
        }
      })
      .catch(error => {
        dispatch(setUpdateError("Не удалось обновить задачу"));
        dispatch(setIsUpdating(false));
      });
  };
}

//Удалить задачу
export function deleteTask(id) {
  return (dispatch, getState) => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.delete(URL + "/" + id, headers)
      .then(response => {
        if (typeof response.data.affectedRows === "number") {
          //Удалим объект и обновим список
          dispatch(removeTask(id));

          //При удалении задачи так же нужно грохнуть и все записи в логе по этой задаче
          const state = getState();

          let tasksLog = state.tasksLog;

          //Пройдемся по всему логу тасок и удалим все записи, завязанные на эту задачу
          for (var tl in tasksLog) {
            if (tasksLog[tl].task_id === id) {
              //Удаляем только из стора. Удалением из базы займется API, так быстрее
              dispatch(removeTaskLog(tasksLog[tl].id));
            }
          }
        }
      })
      .catch(error => {
        dispatch(setDeleteError("Не удалось удалить задачу"));
      });
  };
}

function removeTask(id) {
  return { type: REMOVE_TASK, id };
}
