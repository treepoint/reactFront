import {
  SET_USER_AUTH_STATE,
  SET_AUTH_ERROR,
  SET_SHOW_BROADCAST_MESSAGE,
  SET_SHOW_HEADER_WARNING,
  SET_WINDOW_HEIGHT,
  SET_WINDOW_WIDTH,
  SET_TITLE,
  SET_NEXT_DAY_ALREADY_COMES_MESSAGE_SHOW_DATE
} from "../actions/app";

export function userAuthState(state = false, action) {
  switch (action.type) {
    case SET_USER_AUTH_STATE:
      return action.boolean;
    default:
      return state;
  }
}

export function authError(state = null, action) {
  switch (action.type) {
    case SET_AUTH_ERROR:
      return action.text;
    default:
      return state;
  }
}

export function showBroadcastMessage(state = true, action) {
  switch (action.type) {
    case SET_SHOW_BROADCAST_MESSAGE:
      return action.boolean;
    default:
      return state;
  }
}

export function showHeaderWarning(state = false, action) {
  switch (action.type) {
    case SET_SHOW_HEADER_WARNING:
      return action.boolean;
    default:
      return state;
  }
}

export function windowHeight(state = 0, action) {
  switch (action.type) {
    case SET_WINDOW_HEIGHT:
      return action.number;
    default:
      return state;
  }
}

export function windowWidth(state = 0, action) {
  switch (action.type) {
    case SET_WINDOW_WIDTH:
      return action.number;
    default:
      return state;
  }
}

export function title(state = "Задачи на сегодня | todayTasks", action) {
  switch (action.type) {
    case SET_TITLE:
      return action.string;
    default:
      return state;
  }
}

export function nextDayAlreadyComesMessageShowDate(state = null, action) {
  switch (action.type) {
    case SET_NEXT_DAY_ALREADY_COMES_MESSAGE_SHOW_DATE:
      return action.date;
    default:
      return state;
  }
}