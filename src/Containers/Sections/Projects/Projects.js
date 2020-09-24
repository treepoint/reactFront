import React from "react";
//Redux
import { connect } from "react-redux";
import {
  fetchProjects,
  createProject,
  archiveProject,
  openProject,
  updateProject
} from "../../../Store/actions/projects";
//Компоненты
import Table from "../../../Components/Table/Table";
import Page from "../../../Components/Page/Page";
import ConfirmModalWindow from "../../../Components/ConfirmModalWindow/ConfirmModalWindow";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      archiveModalWindow: { isHidden: true, row: null },
      isArchived: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.userAuthState && !prevProps.userAuthState) {
      this.props.fetchProjects();
    }
  }

  //Закрыть модальное окно
  closeArchiveModal() {
    this.setState({ archiveModalWindow: { isHidden: true, row: null } });
  }

  //Показать модальное окно
  showArchiveModal(row) {
    this.setState({ archiveModalWindow: { isHidden: false, row } });
  }

  //Соберем таблицу для отображения
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
          width: 400
        },
        {
          key: "active_tasks_count",
          type: "string",
          value: "Активных задач",
          disabled: true,
          width: 138
        },
        {
          key: "description",
          type: "string",
          hidable: true,
          value: "Описание",
          disabled: true,
          width: 400
        }
      ]
    ];

    let projects = this.props.projects;
    let activeTasksCount = this.props.activeTasksCountByProjects;

    for (var p in projects) {
      //Если категории не закрыты — отобразим их
      if (
        (projects[p].close_date === null && !this.state.isArchived) ||
        (projects[p].close_date !== null && this.state.isArchived)
      ) {
        let count = 0;

        if (typeof activeTasksCount[projects[p].id] !== "undefined") {
          count = activeTasksCount[projects[p].id].count;
        }

        content.push([
          {
            key: "id",
            type: "hidden",
            disabled: true,
            value: projects[p].id
          },
          {
            key: "name",
            type: "string",
            disabled: false,
            value: projects[p].name,
            style: projects[p].name_style
          },
          {
            key: "active_tasks_count",
            type: "string",
            disabled: true,
            textAlign: "center",
            value: count
          },
          {
            key: "description",
            type: "text",
            disabled: false,
            hidable: true,
            value: projects[p].description
          },
          {
            key: "close_date",
            type: "hidden",
            disabled: false,
            value: projects[p].close_date
          }
        ]);
      }
    }

    return content;
  }

  render() {
    //Соберем меню страницы
    let anchorLinksArray = [
      {
        value: "Текущие",
        callback: () => this.setState({ isArchived: false }),
        isCurrent: !this.state.isArchived
      },
      {
        value: "Архив",
        callback: () => this.setState({ isArchived: true }),
        isCurrent: this.state.isArchived
      }
    ];

    return (
      <Page
        title="Проекты:"
        isCustomContent={true}
        anchorLinksArray={anchorLinksArray}
      >
        <ConfirmModalWindow
          title="Заархивировать проект?"
          message="Если в проекте есть активный задачи, то он будет доступен для выбора и будет отображаться в архиве до закрытия последней задачи."
          isHidden={this.state.archiveModalWindow.isHidden}
          onCancel={() => this.closeArchiveModal()}
          onConfirm={() =>
            this.props.archiveProject(this.state.archiveModalWindow.row.id)
          }
        />
        <Table
          isResizeble={true}
          isSingleLineMode={true}
          saveRow={project => this.props.updateProject(project)}
          addRow={
            !!!this.state.isArchived ? () => this.props.createProject() : null
          }
          archiveRow={
            !!!this.state.isArchived ? row => this.showArchiveModal(row) : null
          }
          dearchiveRow={
            !!!this.state.isArchived ? null : id => this.props.openProject(id)
          }
          isUpdating={this.props.isUpdating}
          notFoundMessage={
            !!!this.state.isArchived
              ? "Нет активных проектов. Добавьте новый с помощью кнопки «+»."
              : "Нет архивных проектов."
          }
        >
          {this.getContent()}
        </Table>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    activeTasksCountByProjects: state.activeTasksCountByProjects,
    userAuthState: state.userAuthState,
    isUpdating: state.projectsIsUpdating
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => {
      dispatch(fetchProjects());
    },
    createProject: () => {
      dispatch(createProject());
    },
    archiveProject: id => {
      dispatch(archiveProject(id));
    },
    openProject: id => {
      dispatch(openProject(id));
    },
    updateProject: project => {
      dispatch(updateProject(project));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
