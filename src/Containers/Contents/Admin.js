import React from "react";
import Page from "../../Components/Page/Page";
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
    return (
      <div>
        <Page title="Административная панель" isPrivate={true} isAdmin={true}>
          контент
        </Page>
      </div>
    );
  }
}

export default Users;
