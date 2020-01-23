//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
const URL = APIURL + "/task_statuses_types";

export const SET_TASK_STATUSES_TYPES = "SET_TASK_STATUSES_TYPES";

export function setTaskStatusesTypes(array) {
  return { type: SET_TASK_STATUSES_TYPES, array };
}

export function clearTaskStatusesTypes() {
  return dispatch => {
    console.log("kek");
    dispatch(setTaskStatusesTypes([]));
  };
}

//Получить все типы статусов задач
export function fetchTaskStatusesTypes() {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.get(URL, headers).then(response => {
      dispatch(setTaskStatusesTypes(response.data));
    });
  };
}
