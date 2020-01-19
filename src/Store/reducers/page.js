import { SCROLL_TOP, SCROLL_LEFT } from "../actions/page";

export function scrollTop(state = 0, action) {
  switch (action.type) {
    case SCROLL_TOP:
      return action.number;
    default:
      return state;
  }
}

export function scrollLeft(state = 0, action) {
  switch (action.type) {
    case SCROLL_LEFT:
      return action.number;
    default:
      return state;
  }
}
