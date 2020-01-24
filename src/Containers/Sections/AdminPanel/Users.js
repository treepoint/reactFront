import React from "react";
//Redux
import { connect } from "react-redux";
import { fetchUserRoles } from "../../../Store/actions/userRoles";
//Компоненты
import Table from "../../../Components/Table/Table";
import ConfirmModalWindow from "../../../Components/ConfirmModalWindow/ConfirmModalWindow";
//API
import {
  getUsers,
  updateUser,
  deleteUser
} from "../../../APIController/APIController";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      deleteModalWindow: { isHidden: true, row: null }
    };
  }

  componentDidMount() {
    this.getUsers();
    this.props.fetchUserRoles();
  }

  //Получаем всех пользователей
  getUsers(callback) {
    getUsers(result => {
      if (typeof callback === "function") {
        this.setState({ usersList: result }, () => callback());
      } else {
        this.setState({ usersList: result });
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(user, callback) {
    updateUser(user, ok => {
      if (ok) {
        this.getUsers(callback);
      }
    });
  }

  //Удалим пользователя
  deleteRowFromDataBase() {
    deleteUser(this.state.deleteModalWindow.row.id, ok => {
      if (ok) {
        this.getUsers();
      }
    });
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

    this.state.usersList.forEach(user => {
      //Соберем список ролей
      let userRoles = this.props.userRoles;
      let list = [];

      for (var ur in userRoles) {
        list.push({ value: userRoles[ur].id, label: userRoles[ur].name });
      }

      //добавим текущую
      let roles = { list, current: user.role_id };

      content.push([
        {
          key: "id",
          type: "string",
          disabled: true,
          value: user.id
        },
        {
          key: "email",
          type: "string",
          disabled: false,
          value: user.email
        },
        {
          key: "role_id",
          type: "select",
          disabled: false,
          value: roles
        }
      ]);
    });

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
          onConfirm={() => this.deleteRowFromDataBase()}
        />
        <Table
          isEditable={true}
          isResizeble={true}
          isSingleLineMode={true}
          saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
          deleteRow={row => this.showDeleteModal(row)}
          update={() => this.getUsers()}
        >
          {this.getContent()}
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRoles: state.userRoles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserRoles: () => {
      dispatch(fetchUserRoles());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
