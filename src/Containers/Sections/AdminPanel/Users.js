import React from "react";
import Table from "../../../Components/Table/Table";
import ConfirmModalWindow from "../../../Components/ConfirmModalWindow/ConfirmModalWindow";
import {
  getUsers,
  getRoles,
  updateUser,
  deleteUser
} from "../../../APIController/APIController";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      rolesList: [],
      deleteModalWindow: { isHidden: true, row: null }
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getRoles();
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

  //Получаем все возможные роли
  getRoles(callback) {
    getRoles(result => {
      if (typeof callback === "function") {
        this.setState({ rolesList: result }, () => callback());
      } else {
        this.setState({ rolesList: result });
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

      content.push([
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

export default Users;
