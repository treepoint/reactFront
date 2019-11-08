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
        check: value => (!!value ? "" : "Имя должно быть заполнено")
      },
      {
        check: value =>
          !numReg.test(value) ? "" : "В имени могут быть только буквы"
      }
    ]
  },

  {
    name: "secondName",
    placeholder: "Фамилия",
    validationFunctions: [
      {
        check: value => (!!value ? "" : "Фамилия должна быть заполнена")
      },
      {
        check: value =>
          !numReg.test(value) ? "" : "В фамилии могут быть только буквы"
      }
    ]
  },
  {
    name: "thirdName",
    placeholder: "Отчество",
    validationFunctions: [
      {
        check: value => (!!value ? "" : "Отчество должно быть заполнено")
      },
      {
        check: value =>
          !numReg.test(value) ? "" : "В отчестве могут быть только буквы"
      }
    ]
  },
  {
    name: "age",
    placeholder: "Возраст",
    validationFunctions: [
      {
        check: value => (!!value ? "" : "Возраст должен быть заполнен")
      },
      {
        check: value =>
          charReg.test(value) ? "" : "В возрасте могут быть только цифры"
      }
    ]
  },
  {
    name: "email",
    placeholder: "Email для связи",
    validationFunctions: [
      {
        check: value => (!!value ? "" : "Email должен быть заполнен")
      },
      {
        check: value => (emailReg.test(value) ? "" : "Введите корректный email")
      }
    ]
  }
];

export default REG_INPUTS;
