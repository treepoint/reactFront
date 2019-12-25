import React from "react";
import Table from "../../Components/Table/Table";
import {
  getUsers,
  getRoles,
  updateUser
} from "../../APIController/APIController";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersList: [], rolesList: [] };
  }

  componentDidMount() {
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    let promise = getUsers();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ usersList: result });
      }
    });
  }

  getRoles() {
    let promise = getRoles();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ rolesList: result });
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(user, callback) {
    updateUser(user.id, user);

    //Пока, если просто дошли до сюда, значит сохранили.
    //Понятно, что это не самое хорошее решение, но тестим пока так
    callback();
  }

  render() {
    let users = [
      [
        {
          key: "id",
          type: "string",
          disabled: true,
          value: "ID",
          style: { width: 30 }
        },
        {
          key: "email",
          type: "string",
          disabled: true,
          value: "Email",
          style: { width: 220 }
        },
        {
          key: "password",
          type: "string",
          disabled: true,
          value: "Пароль",
          style: { width: 120 }
        },
        {
          key: "role",
          type: "string",
          disabled: true,
          value: "Роль",
          style: { width: 120 }
        }
      ]
    ];

    this.state.usersList.forEach(user => {
      //Соберем список ролей
      let list = this.state.rolesList.map(role => {
        return { value: role.id, children: role.name };
      });

      //добавим текущую
      let roles = { list, current: user.role_id };

      users.push([
        {
          key: "id",
          type: "string",
          disabled: true,
          value: user.id,
          style: {}
        },
        {
          key: "email",
          type: "string",
          disabled: false,
          value: user.email,
          style: {}
        },
        {
          key: "password",
          type: "string",
          disabled: false,
          value: user.password,
          style: {}
        },
        {
          key: "role_id",
          type: "select",
          disabled: false,
          value: roles,
          style: {}
        }
      ]);
    });

    return (
      <div>
        <Table
          isEditable={true}
          isResizeble={true}
          isSingleLineMode={true}
          saveRowToDataBase={(row, callback) =>
            this.saveRowToDataBase(row, callback)
          }
          updateTableContent={() => this.getUsers()}
        >
          {users}
        </Table>
      </div>
    );
  }
}

export default Users;
