import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { updateUserSettings } from "../../Store/actions/userSettings";

//Компоненты
import SelectContent from "../SelectContent/SelectContent";
//CSS
import "./ProjectSelecter.css";

class ProjectSelecter extends React.Component {

  //Получаем количество активных тасок по проекту
  getActiveTasksCount(id) {
    //Получаем все количества по всем проекта
    const activeTasksCount = this.props.activeTasksCountByProjects;

    if (typeof activeTasksCount[id] !== "undefined") {
      return activeTasksCount[id].count;
    }
  }

  //Собираем список проектов
  getProjects() {
    //Соберем список категорий
    let projectsList = [];

    const projects = this.props.projects;
    for (var p in projects) {

      //Добавляем если проект активен или по нему есть активные задачи
      if (
        projects[p].close_date === null || this.getActiveTasksCount(projects[p].id) > 0
      ) {
        projectsList.push({
          value: projects[p].id,
          label: projects[p].name,
          style: projects[p].name_style
        });
      }
    }

    //Соберем контент для селекта проектов с указанием текущего проекта
    return { list: projectsList, current: this.props.userSettings.project_id };
  }

  //Выбор проекта
  getProjectSelect() {
    return (
      <div className="selectProjectField">
        <SelectContent
          isMinimized={false}
          value={this.getProjects()}
          height={34}
          onChangeValue={project =>
            this.props.updateUserSettings({ project_id: project.current })
          }
        />
      </div>
    );
  }

  render() {
    if (this.props.userAuthState) {
      return <div className="projectSelector">{this.getProjectSelect()}</div>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    userSettings: state.userSettings,
    userAuthState: state.userAuthState,
    activeTasksCountByProjects: state.activeTasksCountByProjects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserSettings: (userSettings) => {
      dispatch(updateUserSettings(userSettings));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelecter);