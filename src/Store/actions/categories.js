//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import { setNotifications } from "./notifications";
import { fetchActiveTasksCountByCategories } from "./statistics";
import Axios from "axios";

const URL = APIURL + "/categories";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const CLEAR_CATEGORIES = "CLEAR_CATEGORIES";
export const CLOSE_CATEGORY = "CLOSE_CATEGORY";
export const OPEN_CATEGORY = "OPEN_CATEGORY";

export const IS_CATEGORIES_UPDATING = "IS_UPDATING";

export function setCategories(object) {
  return { type: SET_CATEGORIES, object };
}

export function clearCategories(object) {
  return { type: CLEAR_CATEGORIES, object };
}

export function setIsUpdating(boolean) {
  return { type: IS_CATEGORIES_UPDATING, boolean };
}

//Получить все категории задач
export function fetchCategories() {
  return (dispatch, getState) => {
    const state = getState();

    //Если в сторе уже есть — ничего не делаем
    if (JSON.stringify(state.categories) !== "{}") {
      return;
    }

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    //Получим количество активных задач в разрезе категорий
    dispatch(fetchActiveTasksCountByCategories());

    Axios.get(URL, headers)
      .then(response => {
        dispatch(setCategories(response.data));
      })
      .catch(error => {
        let message =
          "Не удалось получить категории. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Создать категорию
export function createCategory() {
  return (dispatch, getState) => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    const category = {
      name: "",
      project_id: getState().userSettings.project_id,
      name_style: JSON.stringify({
        bold: false,
        italic: false,
        backgroundColor: "#f7f7f7"
      }),
      description: ""
    };

    Axios.post(URL, category, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Добавим новый объект и обновим список
          dispatch(setCategories(response.data));
        }
      })
      .catch(error => {
        let message =
          "Не удалось добавить категорию. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

//Обновить категорию
export function updateCategory(category) {
  return dispatch => {
    dispatch(setIsUpdating(true));

    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.put(URL + "/" + category.id, category, headers)
      .then(response => {
        if (typeof response.data === "object") {
          //Обновим список
          dispatch(setCategories(response.data));
          dispatch(setIsUpdating(false));
        }
      })
      .catch(error => {
        let message =
          "Не удалось обновить категорию. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
        dispatch(setIsUpdating(false));
      });
  };
}

//Заархивировать категорию
export function archiveCategory(id) {
  return (dispatch, getStore) => {
    let category = getStore().categories[id];

    category.close_date = new Date();

    dispatch(updateCategory(category));
  };
}

//Открыть категорию
export function openCategory(id) {
  return (dispatch, getStore) => {
    let category = getStore().categories[id];

    category.close_date = null;

    dispatch(updateCategory(category));
  };
}
