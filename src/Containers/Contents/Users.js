import React from "react";
import Page from "../../Components/Page/Page";
import Button from "../../Components/Button/Button";
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
    return (
      <div>
        <Page title="Список пользователей">
          <ul>
            {this.state.userList.map(user => {
              return (
                <li>{user.id + " " + user.email + " " + user.password}</li>
              );
            })}
          </ul>
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
