import React from "react";
//Redux
import { connect } from "react-redux";
import { fetchTaskStatusesTypes } from "../../../Store/actions/taskStatusesTypes";
//Компоненты
import Table from "../../../Components/Table/Table";
import ConfirmModalWindow from "../../../Components/ConfirmModalWindow/ConfirmModalWindow";
import Page from "../../../Components/Page/Page";
//API
import {
  getAllTaskStatuses,
  updateStatus,
  createStatus,
  deleteStatus
} from "../../../APIController/APIController";

class TaskStatuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskStatusesList: [],
      deleteModalWindow: { isHidden: true, row: null }
    };
  }

  componentDidMount() {
    this.getAllTaskStatuses();
    //Получаем все типы статусов
    this.props.fetchTaskStatusesTypes();
  }

  //Получаем все статусы
  getAllTaskStatuses(callback) {
    getAllTaskStatuses(result => {
      if (typeof callback === "function") {
        this.setState({ taskStatusesList: result }, () => callback());
      } else {
        this.setState({ taskStatusesList: result });
      }
    });
  }

  //Добавим новую строку
  addRowToDataBase() {
    let status = { name: "", name_style: "{}", type_id: 1 };

    createStatus(status, ok => {
      if (ok) {
        this.getAllTaskStatuses();
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(taskStatus, callback) {
    updateStatus(taskStatus, ok => {
      if (ok) {
        this.getAllTaskStatuses(callback);
      }
    });
  }

  //Удалим строку
  deleteRowFromDataBase() {
    deleteStatus(this.state.deleteModalWindow.row.id, ok => {
      if (ok) {
        this.getAllTaskStatuses();
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
          type: "hidden",
          disabled: true,
          value: "ID"
        },
        {
          key: "name",
          type: "string",
          disabled: true,
          value: "Название",
          width: 300
        },
        {
          key: "type",
          type: "string",
          disabled: true,
          value: "Тип статуса",
          width: 300
        }
      ]
    ];

    //Соберем список типов статусов
    this.state.taskStatusesList.forEach(taskStatus => {
      //Если статусы не закрыты — отобразим их
      if (taskStatus.close_date === null) {
        let taskStatusesTypesList = this.props.taskStatusesTypes.map(
          taskStatusType => {
            return { value: taskStatusType.id, label: taskStatusType.name };
          }
        );

        //добавим текущую
        let taskStatusesTypes = {
          list: taskStatusesTypesList,
          current: taskStatus.type_id
        };

        content.push([
          {
            key: "id",
            type: "hidden",
            disabled: true,
            value: taskStatus.id
          },
          {
            key: "name",
            type: "string",
            disabled: false,
            value: taskStatus.name,
            style: taskStatus.name_style
          },
          {
            key: "type_id",
            type: "select",
            disabled: false,
            value: taskStatusesTypes
          }
        ]);
      }
    });

    return content;
  }

  render() {
    return (
      <Page title="Управление статусами задач">
        <ConfirmModalWindow
          title="Удалить статус?"
          message="Статус останется назначенным для текущих и выполненных задач, но будет недоступен для новых"
          isHidden={this.state.deleteModalWindow.isHidden}
          onCancel={() => this.closeDeleteModal()}
          onConfirm={() => this.deleteRowFromDataBase()}
        />
        <Table
          isResizeble={true}
          isEditable={true}
          addRow={row => this.addRowToDataBase(row)}
          saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
          deleteRow={row => this.showDeleteModal(row)}
          update={() => this.getAllTaskStatuses()}
        >
          {this.getContent()}
        </Table>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    taskStatusesTypes: state.taskStatusesTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTaskStatusesTypes: () => {
      dispatch(fetchTaskStatusesTypes());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskStatuses);
