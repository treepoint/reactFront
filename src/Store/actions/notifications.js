import uuid from "uuid/v4";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

export function setNotifications(object) {
  return dispatch => {
    let messageUUID = uuid();
    let notification = {
      [messageUUID]: Object.assign({ uuid: messageUUID }, object)
    };

    dispatch(addNotification(notification));
  };
}

export function removeNotification(uuid) {
  return { type: REMOVE_NOTIFICATION, uuid };
}

export function addNotification(object) {
  return { type: SET_NOTIFICATIONS, object };
}

export function clearNotifications(object) {
  return { type: CLEAR_NOTIFICATIONS, object };
}
