//Настройки
export const TASKS_BACKGROUND_IMAGE = "TASKS_BACKGROUND_IMAGE";

export function setTasksBackgroundImage(string) {
  return { type: TASKS_BACKGROUND_IMAGE, string };
}
