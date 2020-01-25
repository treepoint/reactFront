import React from "react";
//Redux
import { connect } from "react-redux";
import { fetchUserRoles } from "../../../Store/actions/userRoles";
import {
  fetchUsers,
  updateUser,
  deleteUser
} from "../../../Store/actions/users";
//Компоненты
import Table from "../../../Components/Table/Table";
import ConfirmModalWindow from "../../../Components/ConfirmModalWindow/ConfirmModalWindow";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalWindow: { isHidden: true, row: null }
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchUserRoles();
  }

  //Закрыть модальное окно
  closeDeleteModal() {
    this.setState({ deleteModalWindow: { isHidden: true, row: null } });
  }

  //Показать модальное окно
  showDeleteModal(row) {
    this.setState({ deleteModalWindow: { isHidden: false, row } });
  }

  //Получим контент для таблицы
  getContent() {
    let content = [
      [
        {
          key: "id",
          type: "string",
          disabled: true,
          value: "ID",
          width: 30
        },
        {
          key: "email",
          type: "string",
          disabled: true,
          value: "Email",
          width: 300
        },
        {
          key: "role",
          type: "string",
          disabled: true,
          value: "Роль",
          width: 120
        }
      ]
    ];

    const users = this.props.users;

    for (var u in users) {
      //Соберем список ролей
      let userRoles = this.props.userRoles;
      let list = [];

      for (var ur in userRoles) {
        list.push({ value: userRoles[ur].id, label: userRoles[ur].name });
      }

      //добавим текущую
      let roles = { list, current: users[u].role_id };

      content.push([
        {
          key: "id",
          type: "string",
          disabled: true,
          value: users[u].id
        },
        {
          key: "email",
          type: "string",
          disabled: false,
          value: users[u].email
        },
        {
          key: "role_id",
          type: "select",
          disabled: false,
          value: roles
        }
      ]);
    }

    return content;
  }

  render() {
    return (
      <React.Fragment>
        <ConfirmModalWindow
          title="Удалить пользователя?"
          message="Вместе с пользователем будут НАВСЕГДА удалены все его задачи, статусы, категории и прочие следы существования этого пользователя. Вы уверены?"
          isHidden={this.state.deleteModalWindow.isHidden}
          onCancel={() => this.closeDeleteModal()}
          onConfirm={() =>
            this.props.deleteUser(this.state.deleteModalWindow.row.id)
          }
        />
        <Table
          isEditable={true}
          isResizeble={true}
          isSingleLineMode={true}
          saveRow={user => this.props.updateUser(user)}
          deleteRow={row => this.showDeleteModal(row)}
          isUpdating={this.props.isUpdating}
        >
          {this.getContent()}
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRoles: state.userRoles,
    isUpdating: state.usersIsUpdating,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserRoles: () => {
      dispatch(fetchUserRoles());
    },
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
    updateUser: user => {
      dispatch(updateUser(user));
    },
    deleteUser: id => {
      dispatch(deleteUser(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
