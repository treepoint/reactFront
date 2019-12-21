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
        { value: "ID", style: { width: 30 } },
        { value: "Email", style: { width: 220 } },
        { value: "Пароль", style: { width: 120 } },
        { value: "Роль", style: { width: 120 } }
      ]
    ];

    this.state.usersList.forEach(user => {
      users.push([
        { value: user.id, style: {} },
        { value: user.email, style: {} },
        { value: user.password, style: {} },
        { value: user.role, style: {} }
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
