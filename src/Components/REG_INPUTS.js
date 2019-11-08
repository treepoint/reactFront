////Регулярки для проверки полей
//Поиск цифр
const numReg = /\d+/;
//Поиск цифр
const charReg = /^[0-9]+$/;
//Валидация email
const emailReg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

const REG_INPUTS = [
  {
    name: "name",
    placeholder: "Твое имя",
    validationFunctions: [
      {
        getInvalidMessage: value => (!!value ? "" : "Имя должно быть заполнено")
      },
      {
        getInvalidMessage: value =>
          !numReg.test(value) ? "" : "В имени могут быть только буквы"
      }
    ]
  },

  {
    name: "secondName",
    placeholder: "Фамилия",
    validationFunctions: [
      {
        getInvalidMessage: value =>
          !!value ? "" : "Фамилия должна быть заполнена"
      },
      {
        getInvalidMessage: value =>
          !numReg.test(value) ? "" : "В фамилии могут быть только буквы"
      }
    ]
  },
  {
    name: "thirdName",
    placeholder: "Отчество",
    validationFunctions: [
      {
        getInvalidMessage: value =>
          !!value ? "" : "Отчество должно быть заполнено"
      },
      {
        getInvalidMessage: value =>
          !numReg.test(value) ? "" : "В отчестве могут быть только буквы"
      }
    ]
  },
  {
    name: "age",
    placeholder: "Возраст",
    validationFunctions: [
      {
        getInvalidMessage: value =>
          !!value ? "" : "Возраст должен быть заполнен"
      },
      {
        getInvalidMessage: value =>
          charReg.test(value) ? "" : "В возрасте могут быть только цифры"
      }
    ]
  },
  {
    name: "email",
    placeholder: "Email для связи",
    validationFunctions: [
      {
        getInvalidMessage: value =>
          !!value ? "" : "Email должен быть заполнен"
      },
      {
        getInvalidMessage: value =>
          emailReg.test(value) ? "" : "Введите корректный email"
      }
    ]
  }
];

export default REG_INPUTS;
