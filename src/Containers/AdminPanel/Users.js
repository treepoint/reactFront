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

  getUsers(callback) {
    let promise = getUsers();

    promise.then(result => {
      if (Array.isArray(result)) {
        if (typeof callback === "function") {
          this.setState({ usersList: result }, () => callback());
        } else {
          this.setState({ usersList: result });
        }
      }
    });
  }

  getRoles(callback) {
    let promise = getRoles();

    promise.then(result => {
      if (Array.isArray(result)) {
        if (typeof callback === "function") {
          this.setState({ rolesList: result }, () => callback());
        } else {
          this.setState({ rolesList: result });
        }
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(user, callback) {
    let promise = updateUser(user.id, user);

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.getUsers(callback);
      }
    });
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
          style: { width: 300 }
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
          key: "role_id",
          type: "select",
          disabled: false,
          value: roles,
          style: {}
        }
      ]);
    });

    return (
      <Table
        isEditable={true}
        isResizeble={true}
        isSingleLineMode={true}
        saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
        update={() => this.getUsers()}
      >
        {users}
      </Table>
    );
  }
}

export default Users;
