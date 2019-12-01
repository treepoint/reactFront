/*
 * Вспомогательная функциональность для работы с формами
 */

//Собираем значения валидации объекта в другой в объект
export function getInvalidMessagesAsObj(array, state) {
  let validationArray = {};

  array.forEach(input => {
    input.validationFunctions
      .map(func => func.getInvalidMessage(state[input.name]))
      .filter(value => {
        if (value !== "") return (validationArray[input.name] = value);
        return null;
      });

    return validationArray;
  });

  return validationArray;
}
