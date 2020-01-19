//Состояние страницы
export const SCROLL_TOP = "SCROLL_TOP";
export const SCROLL_LEFT = "SCROLL_LEFT";

export function setScrollTop(number) {
  return { type: SCROLL_TOP, number };
}

export function setScrollLeft(number) {
  return { type: SCROLL_LEFT, number };
}
