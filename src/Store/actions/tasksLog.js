//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import Axios from "axios";
import { fetchTasksByDate, setTasks } from "./tasks";
import { setNotifications } from "./notifications";
import { getCurrentTimeFormat } from "../../Libs/TimeUtils";

const URL = APIURL + "/tasks_log";

export const SET_TASKS_LOG = "SET_TASKS_LOG";
export const IS_TASKS_LOG_UPDATING = "IS_TASKS_LOG_UPDATING";
export const REMOVE_TASK_LOG = "REMOVE_TASK_LOG";
export const CLEAR_TASKS_LOG = "CLEAR_TASKS_LOG";

export function setTasksLog(object) {
  return { type: SET_TASKS_LOG, object };
}

export function setIsUpdating(boolean) {
  return { type: IS_TASKS_LOG_UPDATING, boolean };
}

export function clearTasksLog(object) {
  return { type: CLEAR_TASKS_LOG, object };
}

//Получить весь лог выполнения за определенный период
export function fetchTasksLogByDate(date) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.get(URL + "/date/" + date, headers)
      .then(response => {
        dispatch(setTasksLog(response.data));
        dispatch(fetchTasksByDate(date));
      })
      .catch(error => {
        let message =
          "Не удалось получить лог выполнения задач. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Создать лог
export function createTaskLog(taskId, date) {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    let taskLog = {
      task_id: taskId,
      comment: "",
      execution_start: date + " " + getCurrentTimeFormat(),
      execution_end: date
    };

    Axios.post(URL, taskLog, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //К нему добавим новый объект и обновим список
          dispatch(setTasksLog(response.data));
        }
      })
      .catch(error => {
        let message =
          "Не удалось добавить запись в лог. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Обновить лог
export function updateTaskLog(taskLog, forDate) {
  return (dispatch, getState) => {
    dispatch(setIsUpdating(true));

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    //При обновлении лога обновляем и время исполнения соответствующей задачи
    const state = getState();

    let oldTaskLog = state.tasksLog[taskLog.id];
    let task = state.tasks[taskLog.task_id];

    Axios.put(URL + "/" + taskLog.id, taskLog, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Новое время исполнения за день
          let newExecutionTime =
            response.data[Object.keys(response.data)[0]].execution_time;
          //Получим разницу
          let changeTime = newExecutionTime - oldTaskLog.execution_time;
          //Если есть задача (а может не быть, если перенесена не будущее) — обновим время исполнения
          if (!!task) {
            task.execution_time_day = task.execution_time_day + changeTime;
            task.execution_time_to_day =
              task.execution_time_to_day + changeTime;

            //Соберем таск в требуемый вид
            task = { [taskLog.task_id]: task };
            //Обновим таск
            dispatch(setTasks(task));
          }

          let newTaskLog = response.data;
          //Проставим дату за которую считаем лог
          newTaskLog[Object.keys(newTaskLog)[0]].for_date = forDate;
          //Обновим лог
          dispatch(setTasksLog(newTaskLog));
          dispatch(setIsUpdating(false));
        }
      })
      .catch(error => {
        let message =
          "Не удалось обновить запись в логе. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
        dispatch(setIsUpdating(false));
      });
  };
}

//Удалить лог
export function deleteTaskLog(id) {
  return (dispatch, getState) => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    const state = getState();

    //При удалении лога нужно вычесть его время из задачи
    let taskLog = state.tasksLog[id];
    let task = state.tasks[taskLog.task_id];
    //Получаем время исполнения таска
    let executionTimeDay = task.execution_time_day;
    let executionTimeToDay = task.execution_time_to_day;
    //Вычитаем время выполнения из лога
    task.execution_time_day = executionTimeDay - taskLog.execution_time;
    task.execution_time_to_day = executionTimeToDay - taskLog.execution_time;
    //Соберем таск в требуемый вид
    task = { [taskLog.task_id]: task };

    Axios.delete(URL + "/" + id, headers)
      .then(response => {
        if (typeof response.data.affectedRows === "number") {
          //Обновим таск
          dispatch(setTasks(task));
          //Удалим объект и обновим список
          dispatch(removeTaskLog(id));
        }
      })
      .catch(error => {
        let message =
          "Не удалось удалить запись из лога. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

export function removeTaskLog(id) {
  return { type: REMOVE_TASK_LOG, id };
}

//Закрыть текущую открытую запись, открыть новую
export function closeOpenedLogAndOpenNewOneByTaskId(taskId, date) {
  return (dispatch, getState) => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    const state = getState();

    //Получим текущий лог
    let currentTaskLog =
      state.tasksLog[Object.keys(state.tasksLog).reverse()[0]];

    //Если он есть
    if (!!currentTaskLog) {
      //Если дата завершения еще не проставлена — проставим и обновим
      if (currentTaskLog.execution_end === "00:00") {
        currentTaskLog.execution_end = getCurrentTimeFormat();
        dispatch(updateTaskLog(currentTaskLog, date));
      }
    }

    //Заведем новый, но уже по новой задаче
    dispatch(createTaskLog(taskId, date));
  };
}
