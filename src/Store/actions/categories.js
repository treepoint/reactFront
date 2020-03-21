//Обвязка для API
import { APIURL, getHeaders } from "../APIConfiguration";
import { setNotifications } from "./notifications";
import Axios from "axios";
const URL = APIURL + "/categories";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const IS_CATEGORIES_UPDATING = "IS_UPDATING";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const CLEAR_CATEGORIES = "CLEAR_CATEGORIES";

export function setCategories(object) {
  return { type: SET_CATEGORIES, object };
}

export function setIsUpdating(boolean) {
  return { type: IS_CATEGORIES_UPDATING, boolean };
}

export function clearCategories(object) {
  return { type: CLEAR_CATEGORIES, object };
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
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    const category = {
      name: "",
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
  return dispatch => {
    let headers = getHeaders();

    if (headers === null) {
      return;
    }

    Axios.delete(URL + "/" + id, headers)
      .then(response => {
        if (typeof response.data.affectedRows === "number") {
          //Удалим категорию из списка и обновим список
          dispatch(removeCategory(id));
        }
      })
      .catch(error => {
        let message =
          "Не удалось заархивировать категорию. Перезагрузите страницу и попробуйте снова.";
        dispatch(setNotifications({ message, type: "error" }));
      });
  };
}

function removeCategory(id) {
  return { type: REMOVE_CATEGORY, id };
}
