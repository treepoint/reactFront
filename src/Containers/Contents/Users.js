import React from "react";
import Page from "../../Components/Page/Page";
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
    //Соберем таблицу для отображения
    let users = [["ID", "Email", "Пароль"]];

    this.state.usersList.forEach(user => {
      users.push([user.id, user.email, user.password]);
    });

    return (
      <div>
        <Page title="Список пользователей" isPrivate={true}>
          <Table headerEditable={false} bodyEditable={true} isResizeble={true}>
            {users}
          </Table>
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
