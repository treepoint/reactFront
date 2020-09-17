import uuid from "uuid/v4";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

//Так добавляем новое сообщение, структура объекта следующая: { message, type, autohide},
//где message — текстовое сообщение, type — указание типа сообщения: "warning", "error", "info",
//autohide — по умолчанию true, но если сообщение не нужно скрывать, то можно выставить false
export function setNotifications(object) {
  return dispatch => {
    let messageUUID = uuid();
    let notification = {
      [messageUUID]: Object.assign(
        { uuid: messageUUID },
        { autohide: true }, //Скрываем сообщения по умолчанию
        object
      )
    };

    dispatch(addNotification(notification));
  };
}

export function removeNotification(uuid) {
  return { type: REMOVE_NOTIFICATION, uuid };
}

function addNotification(object) {
  return { type: SET_NOTIFICATIONS, object };
}

export function clearNotifications(object) {
  return { type: CLEAR_NOTIFICATIONS, object };
}
