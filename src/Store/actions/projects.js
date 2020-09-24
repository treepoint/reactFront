//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import { setNotifications } from "./notifications";
import { fetchActiveTasksCountByProjects } from "./statistics";
import Axios from "axios";

const URL = APIURL + "/projects";

export const SET_PROJECTS = "SET_PROJECTS";
export const CLEAR_PROJECTS = "CLEAR_PROJECTS";
export const CLOSE_PROJECT = "CLOSE_PROJECT";
export const OPEN_PROJECT = "OPEN_PROJECT";

export const IS_PROJECTS_UPDATING = "IS_UPDATING";

export function setProjects(object) {
  return { type: SET_PROJECTS, object };
}

export function clearProjects(object) {
  return { type: CLEAR_PROJECTS, object };
}

export function setIsUpdating(boolean) {
  return { type: IS_PROJECTS_UPDATING, boolean };
}

//Получить все проекты
export function fetchProjects() {
  return (dispatch, getState) => {
    const state = getState();

    //Если в сторе уже есть — ничего не делаем
    if (JSON.stringify(state.projects) !== "{}") {
      return;
    }

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    //Получим количество активных задач в разрезе проектов
    dispatch(fetchActiveTasksCountByProjects());

    Axios.get(URL, headers)
      .then(response => {
        dispatch(setProjects(response.data));
      })
      .catch(error => {
        let message =
          "Не удалось получить проекты. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Создать проект
export function createProject() {
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    const project = {
      name: "",
      name_style: JSON.stringify({
        bold: false,
        italic: false,
        backgroundColor: "#f7f7f7"
      }),
      description: ""
    };

    Axios.post(URL, project, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Добавим новый объект и обновим список
          dispatch(setProjects(response.data));
        }
      })
      .catch(error => {
        let message =
          "Не удалось добавить проект. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Обновить проект
export function updateProject(project) {
  return dispatch => {
    dispatch(setIsUpdating(true));

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.put(URL + "/" + project.id, project, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Обновим список
          dispatch(setProjects(response.data));
          dispatch(setIsUpdating(false));
        }
      })
      .catch(error => {
        let message =
          "Не удалось обновить проект. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
        dispatch(setIsUpdating(false));
      });
  };
}

//Заархивировать проект
export function archiveProject(id) {
  return (dispatch, getStore) => {
    let project = getStore().projects[id];

    project.close_date = new Date();

    dispatch(updateProject(project));
  };
}

//Открыть проект
export function openProject(id) {
  return (dispatch, getStore) => {
    let project = getStore().projects[id];

    project.close_date = null;

    dispatch(updateProject(project));
  };
}
