import React from "react";
import Page from "../../Components/Page/Page";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import { getUsers } from "../../APIController/APIController";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userList: [] };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    let promise = getUsers();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ userList: result });
      }
    });
  }

  render() {
    //Соберем таблицу для отображения
    let users = [];
    users[0] = ["ID", "Email", "Пароль"];

    this.state.userList.forEach(user => {
      users.push([user.id, user.email, user.password]);
    });

    return (
      <div>
        <Page title="Список пользователей">
          <Table>{users}</Table>
          <Button
            value="Обновить список пользователей"
            isPrimary={true}
            onClick={() => this.getUsers()}
          />
        </Page>
      </div>
    );
  }
}

export default Users;
