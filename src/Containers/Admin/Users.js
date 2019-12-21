import React from "react";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import { getUsers } from "../../APIController/APIController";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersList: [] };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    let promise = getUsers();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ usersList: result });
      }
    });
  }

  render() {
    let users = [
      [
        { key: "id", value: "ID", style: { width: 30 } },
        { key: "email", value: "Email", style: { width: 220 } },
        { key: "password", value: "Пароль", style: { width: 120 } },
        { key: "role", value: "Роль", style: { width: 120 } }
      ]
    ];

    this.state.usersList.forEach(user => {
      users.push([
        { key: "id", value: user.id, style: {} },
        { key: "email", value: user.email, style: {} },
        { key: "password", value: user.password, style: {} },
        { key: "role", value: user.role, style: {} }
      ]);
    });

    return (
      <div>
        <Table isEditable={true} isResizeble={true} isSingleLineMode={true}>
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
