import React from "react";
import Button from "../../Components/Button/Button";
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
  saveRowToDataBase(row, callback) {
    let body = {};

    row.forEach(item => {
      switch (item.type) {
        case "text":
          body[item.key] = item.value;
          break;
        case "select":
          body[item.key] = item.value.current;
          break;
        default:
          return;
      }
    });

    updateUser(body.id, body);

    //Пока, если просто дошли до сюда, значит сохранили.
    //Понятно, что это не самое хорошее решение, но тестим пока так
    callback();
  }

  render() {
    let users = [
      [
        { key: "id", type: "text", value: "ID", style: { width: 30 } },
        { key: "email", type: "text", value: "Email", style: { width: 220 } },
        {
          key: "password",
          type: "text",
          value: "Пароль",
          style: { width: 120 }
        },
        { key: "role", type: "text", value: "Роль", style: { width: 120 } }
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
        { key: "id", type: "text", value: user.id, style: {} },
        { key: "email", type: "text", value: user.email, style: {} },
        { key: "password", type: "text", value: user.password, style: {} },
        { key: "role_id", type: "select", value: roles, style: {} }
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
        >
          {users}
        </Table>
        <Button
          value="Обновить список пользователей"
          isPrimary={true}
          onClick={() => this.getUsers()}
        />
      </div>
    );
  }
}

export default Users;
