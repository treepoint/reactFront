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

//Преобразуем минуты в целые часы
export function getHoursFromMins(mins, wayToRound) {
  if (mins < 0) {
    return 0;
  }

  if (mins === null) {
    return 0;
  }

  if (wayToRound === "ceil") {
    return Math.ceil(mins / 60);
  }

  if (wayToRound === "floor") {
    return Math.floor(mins / 60);
  }

  return Math.trunc(mins / 60);
}

//Преобразуем часы в нормальное отображение
export function getFormatHours(hours) {
  if (hours < 0) {
    return "00:00";
  }

  if (hours === null) {
    return "00:00";
  }

  return hours + ":00";
}

export function getCurrentFormatDate() {
  let date = new Date();

  return getFormatDate(date);
}

export function getFormatDate(date) {
  var formatDate = new Date(date);
  var dd = String(formatDate.getDate()).padStart(2, "0");
  var mm = String(formatDate.getMonth() + 1).padStart(2, "0");
  var yyyy = formatDate.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}

export function getRussianFormatDate(date) {
  var russianFormatDate = new Date(date);
  var dd = String(russianFormatDate.getDate()).padStart(2, "0");
  var mm = String(russianFormatDate.getMonth() + 1).padStart(2, "0");
  var yyyy = russianFormatDate.getFullYear();

  return dd + "." + mm + "." + yyyy;
}

//Получить текущее время, форматированное
export function getCurrentTimeFormat() {
  //Получим сегодняшную дату
  var date = new Date();

  var mm = date.getMinutes();
  var hh = date.getHours();

  if (mm < 10) {
    mm = "0" + mm;
  }

  return hh + "-" + mm;
}

//Получить текущую дату и время, форматированное
export function getCurrentDateWithTimeFormat() {
  return getCurrentFormatDate() + " " + getCurrentTimeFormat();
}

export function getShortDayNameByID(id) {
  switch (id) {
    case 1:
      return "ПН";
    case 2:
      return "ВТ";
    case 3:
      return "СР";
    case 4:
      return "ЧТ";
    case 5:
      return "ПТ";
    case 6:
      return "СБ";
    case 0:
      return "ВС";
    default:
      return;
  }
}

export function getDDbyDate(date) {
  return String(date.getDate()).padStart(2, "0");
}

export function getMMbyDate(date) {
  return String(date.getMonth() + 1).padStart(2, "0");
}

export function revokeDays(date, count) {
  let offsetDate = new Date(date);

  return offsetDate.setDate(offsetDate.getDate() - count);
}

export function addDays(date, count) {
  let offsetDate = new Date(date);

  return offsetDate.setDate(offsetDate.getDate() + count);
}

export function getFirstDayOfCurrentMonth() {
  var date = new Date();
  var yyyy = date.getFullYear();
  var mm = String(date.getMonth() + 1).padStart(2, "0");

  date = new Date(yyyy, mm - 1, 1);

  return date;
}

export function getFirstDayOfNextMonth() {
  var date = new Date();
  var yyyy = date.getFullYear();
  var mm = String(date.getMonth() + 1).padStart(2, "0");

  date = new Date(yyyy, mm, 1);

  return date;
}

export function getLastDayOfCurrentMonth() {
  var date = new Date();
  var yyyy = date.getFullYear();
  var mm = String(date.getMonth() + 1).padStart(2, "0");

  date = new Date(yyyy, mm, 0);

  return date;
}

export function getFirstDayOfPreviousMonth() {
  var date = new Date();
  var yyyy = date.getFullYear();
  var mm = String(date.getMonth() + 1).padStart(2, "0");

  date = new Date(yyyy, mm - 2, 1);

  return date;
}

export function getLastDayOfPreviousMonth() {
  var date = new Date();
  var yyyy = date.getFullYear();
  var mm = String(date.getMonth() + 1).padStart(2, "0");

  date = new Date(yyyy, mm - 1, 0);

  return date;
}

export function getFirstDayOfNextWeek() {
  //Получим текущую дату
  let currentDate = new Date();

  if (currentDate.getDay() === 0) {
    return revokeDays(currentDate, 6);
  } else {
    return addDays(revokeDays(currentDate, currentDate.getDay() - 1), 7);
  }
}

export function getFirstDayOfCurrentWeek() {
  //Получим текущую дату
  let currentDate = new Date();

  if (currentDate.getDay() === 0) {
    return revokeDays(currentDate, 6);
  } else {
    return revokeDays(currentDate, currentDate.getDay() - 1);
  }
}

export function getLastDayOfCurrentWeek() {
  //Получим текущую дату
  let currentDate = new Date();

  if (currentDate.getDay() === 0) {
    return currentDate;
  } else {
    return addDays(currentDate, 7 - currentDate.getDay());
  }
}

export function getFirstDayOfPreviousWeek() {
  //Получим текущую дату
  let currentDate = new Date();

  if (currentDate.getDay() === 0) {
    return revokeDays(currentDate, 14);
  } else {
    return revokeDays(revokeDays(currentDate, currentDate.getDay() - 1), 7);
  }
}

export function getLastDayOfPreviousWeek() {
  //Получим текущую дату
  let currentDate = new Date();

  if (currentDate.getDay() === 0) {
    return revokeDays(currentDate, 8);
  } else {
    return revokeDays(currentDate, currentDate.getDay());
  }
}

export function getDDdotMMandShortDatNameByDate(date) {
  return (
    getDDbyDate(date) +
    "." +
    getMMbyDate(date) +
    " " +
    getShortDayNameByID(date.getDay())
  );
}
