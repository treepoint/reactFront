//Обвязка для API
import { APIURL } from "../APIConfiguration";
import Axios from "axios";
//Подключаем роутер
import { push } from "connected-react-router";
//Подключаем cookies
import { read_cookie, bake_cookie, delete_cookie } from "../../Libs/Sfcookies";
//Подключаем библиотеку для работы со временем
import { getCurrentFormatDate, getFormatDate } from "../../Libs/TimeUtils";
//Другие actions
import { setToken } from "./token";
import { setNotifications } from "./notifications";
import { setCurrentUserAndAdmin } from "./currentUser";
import { fetchCategories } from "./categories";
import { fetchTasksByDate } from "./tasks";
import { fetchTasksLogByDate } from "./tasksLog";
import { setModalWindowState } from "./globalModalWindow";
import { fetchUserSettings } from "./userSettings";
import { fetchProjects } from "./projects";

export const SET_USER_AUTH_STATE = "SET_USER_AUTH_STATE";
export const SET_AUTH_ERROR = "AUTH_ERROR";
export const CLEAR_STATE = "CLEAR_STATE";
export const SET_SHOW_BROADCAST_MESSAGE = "SET_SHOW_BROADCAST_MESSAGE";
export const SET_SHOW_HEADER_WARNING = "SET_SHOW_HEADER_WARNING";
export const SET_WINDOW_HEIGHT = "SET_WINDOW_HEIGHT";
export const SET_WINDOW_WIDTH = "SET_WINDOW_WIDTH";
export const SET_TITLE = "SET_TITLE";
export const SET_NEXT_DAY_ALREADY_COMES_MESSAGE_SHOW_DATE =
  "SET_NEXT_DAY_ALREADY_COMES_MESSAGE_SHOW_DATE";

export function setUserAuthState(boolean) {
  return { type: SET_USER_AUTH_STATE, boolean };
}

export function setAuthError(text) {
  return { type: SET_AUTH_ERROR, text };
}

export function clearState() {
  return { type: CLEAR_STATE };
}

export function setShowBroadcastMessage(boolean) {
  return { type: SET_SHOW_BROADCAST_MESSAGE, boolean };
}

export function setShowHeaderWarning(boolean) {
  return { type: SET_SHOW_HEADER_WARNING, boolean };
}

export function setWindowHeight(number) {
  return { type: SET_WINDOW_HEIGHT, number };
}

export function setWindowWidth(number) {
  return { type: SET_WINDOW_WIDTH, number };
}

export function setTitle(string) {
  return { type: SET_TITLE, string };
}

export function setNextDayAlreadyComesMessageShowDate(date) {
  return { type: SET_NEXT_DAY_ALREADY_COMES_MESSAGE_SHOW_DATE, date };
}

export function login() {
  return (dispatch, getState) => {
    //Создание токена
    let url = APIURL + "/auth";

    const state = getState();

    Axios.post(url, state.currentUser)
      .then(response => {
        //Unixtime в обычное время
        let tokenExp = new Date(response.data.token.exp * 1000);

        //Unixtime в обычное время
        let refreshTokenExp = new Date(response.data.refreshToken.exp * 1000);

        bake_cookie("token", response.data.token.value, tokenExp);
        bake_cookie("user_id", response.data.user.id, tokenExp);
        bake_cookie(
          "refresh_token",
          response.data.refreshToken.value,
          refreshTokenExp
        );

        //Установим токен в стор
        dispatch(setToken(response.data.token.value));

        //Пользователя
        dispatch(setCurrentUserAndAdmin(response.data.user));

        //Обнулим ошибку авторизации
        dispatch(setAuthError(null));

        //Проставим авторизацию
        dispatch(setUserAuthState(true));

        //Загрузим все данные приложения
        dispatch(loadAllData());

        //Если открыто модальное окно — закроем
        if (state.modalWindowState === true) {
          dispatch(setModalWindowState(false));
        }

        dispatch(push("/tasks_manager"));
      })
      .catch(error => {
        let errorMessage = null;

        switch (error.response.status) {
          case 404:
            errorMessage = "Пользователь с таким логином и паролем не найден";

            break;
          default:
            errorMessage = "Произошла неизвестная ошибка";
        }

        dispatch(setAuthError(errorMessage));
      });
  };
}

export function logoff() {
  return (dispatch, getStore) => {
    //Сбросим страницу на главную
    dispatch(push("/"));

    //Сохраним текущую ширину и высоту экрана. Их обнулять не нужно
    let windowWidth = getStore().windowWidth;
    let windowHeight = getStore().windowHeight;

    //Очистим стор
    dispatch(clearState());

    //Восстановим записи о ширине и высоте
    dispatch(setWindowWidth(windowWidth));
    dispatch(setWindowHeight(windowHeight));

    //Очистим cookies
    delete_cookie("token");
    delete_cookie("user_id");
    delete_cookie("refresh_token");
  };
}

export function restoreFromCookies() {
  return dispatch => {
    const refreshToken = read_cookie("refresh_token");

    //Если есть refreshToken — по нему
    if (refreshToken.length !== 0) {
      dispatch(reauth(refreshToken));
      return;
    } else {
      //Если refreshToken'а нет — на всякий случай выйдем, если токен был, но просрочился
      dispatch(logoff());
    }
  };
}

export function reauth(refreshToken) {
  return (dispatch, getStore) => {
    //Обновление токена
    const url = APIURL + "/reauth";

    //Пытаемся обновить данные по нему
    Axios.post(url, { refreshToken }).then(response => {
      //Unixtime в обычное время
      let tokenExp = new Date(response.data.token.exp * 1000);

      //Unixtime в обычное время
      let refreshTokenExp = new Date(response.data.refreshToken.exp * 1000);

      //Заготовим печеньки
      bake_cookie("token", response.data.token.value, tokenExp);
      bake_cookie("user_id", response.data.user.id, tokenExp);
      bake_cookie(
        "refresh_token",
        response.data.refreshToken.value,
        refreshTokenExp
      );

      //Проставим токен
      dispatch(setToken(response.data.token.value));
      //Пользователя
      dispatch(setCurrentUserAndAdmin(response.data.user));
      //Авторизацию
      dispatch(setUserAuthState(true));
      //Загрузим все данные приложения
      dispatch(loadAllData());

      //Если текущая локация — главная страница — переадресуемся на задачи
      let currentPath = getStore().router.location.pathname;

      if (currentPath === "/") {
        dispatch(push("/tasks_manager"));
      }
    });
  };
}

export function loadAllData() {
  return dispatch => {
    //Проставим пользовательские настройки
    dispatch(fetchUserSettings());
    //Загрузим категории
    dispatch(fetchCategories());
    //Загрузим проекты
    dispatch(fetchProjects());
    //Загрузим задачи
    dispatch(fetchTasksByDate(getCurrentFormatDate()));
    //Загрузим лог задач
    dispatch(fetchTasksLogByDate(getCurrentFormatDate()));
  };
}

//Функциональность для отображения оповещения, что наступил новый день и может быть нужно перейти в задачах к следующему дню
export function checkNextDayAlreadyComes() {
  return (dispatch, getState) => {
    /*Вот здесь надо проверить, что:
        1. Уведомление еще не показывали сегодня
        2. Таски за сегодня еще не смотрели (это проверяется косвенно — 
           при получении тасок проставляется дата nextDayAlreadyComesMessageShowDate, как будто бы сообщение уже показывали)
        3. Последняя запись в логе была вчера (по времени браузера)
      И если все-так — отображаем сообщение */

    //Получим текущее состояние
    const state = getState();

    //Если уже сообщение показывали сегодня — просто выйдем
    if (state.nextDayAlreadyComesMessageShowDate === getCurrentFormatDate()) {
      return null;
    }

    //Вытащим лог выполнения задач
    let tasksLog = state.tasksLog;

    //Пройдемся по логу, найдем самую новую запись
    let maxTaskLogId = 0;

    for (var tl in tasksLog) {
      if (tasksLog[tl].id > maxTaskLogId) {
        maxTaskLogId = tasksLog[tl].id;
      }
    }

    //Проверим, что лог нашелся
    if (maxTaskLogId === 0) {
      return;
    }

    //Если день этой записи меньше чем сегодня — покажем сообщение
    if (
      getFormatDate(tasksLog[maxTaskLogId].for_date) < getCurrentFormatDate()
    ) {
      let message =
        "Сервис открыт со вчерашнего дня. Возможно вам требуется переключить день на следующий для продолжения работы.";
      //Запишем ошибку
      dispatch(setNotifications({ message, type: "warning", autohide: false }));
      //Проставим, что сегодня уже показывали
      dispatch(setNextDayAlreadyComesMessageShowDate(getCurrentFormatDate()));
    }
  };
}
