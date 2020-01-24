//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
const URL = APIURL + "/task_statuses";

export const SET_TASK_STATUSES = "SET_TASK_STATUSES";
export const IS_UPDATING = "IS_UPDATING";
export const REMOVE_TASK_STATUS = "REMOVE_TASK_STATUS";
export const CLEAR_TASK_STATUSES = "CLEAR_TASK_STATUSES";
export const TASK_STATUS_CREATE_ERROR = "TASK_STATUS_CREATE_ERROR";
export const TASK_STATUS_UPDATE_ERROR = "TASK_STATUS_UPDATE_ERROR";
export const TASK_STATUS_DELETE_ERROR = "TASK_STATUS_DELETE_ERROR";

export function setTaskStatuses(object) {
  return { type: SET_TASK_STATUSES, object };
}

export function setIsUpdating(boolean) {
  return { type: IS_UPDATING, boolean };
}

export function clearTaskStatuses(object) {
  return { type: CLEAR_TASK_STATUSES, object };
}

export function setCreateError(text) {
  return { type: TASK_STATUS_CREATE_ERROR, text };
}

export function setUpdateError(text) {
  return { type: TASK_STATUS_UPDATE_ERROR, text };
}

export function setDeleteError(text) {
  return { type: TASK_STATUS_DELETE_ERROR, text };
}

//Получить все статусы задач
export function fetchTaskStatuses() {
  return (dispatch, getState) => {
    const state = getState();

    //Если в сторе уже есть — ничего не делаем
    if (JSON.stringify(state.taskStatuses) !== "{}") {
      return;
    }

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.get(URL, headers).then(response => {
      dispatch(setTaskStatuses(response.data));
    });
  };
}

//Создать статус
export function createTaskStatus() {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    const taskStatus = { name: "", name_style: "{}", type_id: 1 };

    Axios.post(URL, taskStatus, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //К нему добавим новый объект и обновим список
          dispatch(setTaskStatuses(response.data));
        }
      })
      .catch(error => {
        dispatch(setCreateError("Не удалось добавить статус"));
      });
  };
}

//Обновить статус
export function updateTaskStatus(taskStatus) {
  return dispatch => {
    dispatch(setIsUpdating(true));

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.put(URL + "/" + taskStatus.id, taskStatus, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Обновим список
          dispatch(setTaskStatuses(response.data));
          dispatch(setIsUpdating(false));
        }
      })
      .catch(error => {
        dispatch(setUpdateError("Не удалось обновить статус"));
        dispatch(setIsUpdating(false));
      });
  };
}

//Удалить статус
export function deleteTaskStatus(id) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.delete(URL + "/" + id, headers)
      .then(response => {
        if (typeof response.data.affectedRows === "number") {
          //Удалим объект и обновим список
          dispatch(removeTaskStatuses(id));
        }
      })
      .catch(error => {
        dispatch(setDeleteError("Не удалось удалить статус"));
      });
  };
}

function removeTaskStatuses(id) {
  return { type: REMOVE_TASK_STATUS, id };
}
