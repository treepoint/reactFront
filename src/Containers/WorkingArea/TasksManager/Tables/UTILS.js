//Преобразуем минуты в читаемый вид
export function getTimeFromMins(mins) {
  if (mins < 0) {
    return "--:--";
  }

  if (mins === null) {
    return "00:00";
  } else {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;

    if (minutes <= 9) {
      minutes = "0" + minutes;
    }

    if (hours <= 9) {
      hours = "0" + hours;
    }

    return hours + ":" + minutes;
  }
}
