import React from "react";
//Redux
import { connect } from "react-redux";
import { fetchTaskStatusesTypes } from "../../../Store/actions/taskStatusesTypes";
import {
  fetchTaskStatuses,
  createTaskStatus,
  updateTaskStatus,
  deleteTaskStatus
} from "../../../Store/actions/taskStatuses";
//Компоненты
import Table from "../../../Components/Table/Table";
import ConfirmModalWindow from "../../../Components/ConfirmModalWindow/ConfirmModalWindow";
import Page from "../../../Components/Page/Page";

class TaskStatuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalWindow: { isHidden: true, row: null }
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userAuthState && !prevProps.userAuthState) {
      this.fetchData();
    }
  }

  fetchData() {
    //Получаем все статусы
    this.props.fetchTaskStatuses();
    //Получаем все типы статусов
    this.props.fetchTaskStatusesTypes();
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

    //Получим список статусов
    let taskStatuses = this.props.taskStatuses;

    //Пройдемся по нему и соберем все статусы
    for (var ts in taskStatuses) {
      //Если статусы не закрыты — отобразим их
      if (taskStatuses[ts].close_date === null) {
        let taskStatusesTypesList = [];

        //Получим список типов статусов
        let taskStatusesTypes = this.props.taskStatusesTypes;

        //Пройдемся по ним — соберем лист
        for (var tst in taskStatusesTypes) {
          taskStatusesTypesList.push({
            value: taskStatusesTypes[tst].id,
            label: taskStatusesTypes[tst].name
          });
        }

        //Соберем объект для селекта
        let taskStatusesTypesSelect = {
          list: taskStatusesTypesList,
          current: taskStatuses[ts].type_id
        };

        content.push([
          {
            key: "id",
            type: "hidden",
            disabled: true,
            value: taskStatuses[ts].id
          },
          {
            key: "name",
            type: "string",
            disabled: false,
            value: taskStatuses[ts].name,
            style: taskStatuses[ts].name_style
          },
          {
            key: "type_id",
            type: "select",
            disabled: false,
            value: taskStatusesTypesSelect
          }
        ]);
      }
    }

    return content;
  }

  render() {
    return (
      <Page title="Управление статусами задач" isCustomContent={true}>
        <ConfirmModalWindow
          title="Удалить статус?"
          message="Статус останется назначенным для текущих и выполненных задач, но будет недоступен для новых"
          isHidden={this.state.deleteModalWindow.isHidden}
          onCancel={() => this.closeDeleteModal()}
          onConfirm={() =>
            this.props.deleteTaskStatus(this.state.deleteModalWindow.row.id)
          }
        />
        <Table
          isResizeble={true}
          isEditable={true}
          addRow={() => this.props.createTaskStatus()}
          saveRow={taskStatus => this.props.updateTaskStatus(taskStatus)}
          deleteRow={row => this.showDeleteModal(row)}
          isUpdating={this.props.isUpdating}
        >
          {this.getContent()}
        </Table>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    taskStatusesTypes: state.taskStatusesTypes,
    taskStatuses: state.taskStatuses,
    userAuthState: state.userAuthState,
    isUpdating: state.taskStatusIsUpdating
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTaskStatusesTypes: () => {
      dispatch(fetchTaskStatusesTypes());
    },
    fetchTaskStatuses: () => {
      dispatch(fetchTaskStatuses());
    },
    createTaskStatus: () => {
      dispatch(createTaskStatus());
    },
    deleteTaskStatus: id => {
      dispatch(deleteTaskStatus(id));
    },
    updateTaskStatus: taskStatus => {
      dispatch(updateTaskStatus(taskStatus));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskStatuses);
