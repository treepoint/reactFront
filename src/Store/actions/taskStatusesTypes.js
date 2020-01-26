//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
const URL = APIURL + "/task_statuses_types";

export const SET_TASK_STATUSES_TYPES = "SET_TASK_STATUSES_TYPES";
export const CLEAR_TASK_STATUSES_TYPES = "CLEAR_TASK_STATUSES_TYPES";

export function setTaskStatusesTypes(object) {
  return { type: SET_TASK_STATUSES_TYPES, object };
}

export function clearTaskStatusesTypes(object) {
  return { type: CLEAR_TASK_STATUSES_TYPES, object };
}

//Получить все типы статусов задач
export function fetchTaskStatusesTypes() {
  return (dispatch, getState) => {
    const state = getState();

    //Если в сторе уже есть — ничего не делаем
    if (JSON.stringify(state.taskStatusesTypes) !== "{}") {
      return;
    }

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.get(URL, headers).then(response => {
      dispatch(setTaskStatusesTypes(response.data));
    });
  };
}
