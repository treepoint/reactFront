import React from "react";
import Page from "../../Components/Page/Page";
import Button from "../../Components/Button/Button";
import { connect } from "react-redux";
import {
  setUser,
  setAuthToken,
  setModalWindowState
} from "../../Store/actions";
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
      this.setState({ userList: result });
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (user, authToken, modalWindowState) => {
      dispatch(setUser(user));
      dispatch(setAuthToken(authToken));
      dispatch(setModalWindowState(modalWindowState));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
