import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import {
  fetchTasksLogByDate,
  updateTaskLog,
  deleteTaskLog
} from "../../../../Store/actions/tasksLog";
//Компоненты
import Table from "../../../../Components/Table/Table";
import Action from "../../../../Components/Action/Action";
//Утилиты
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
//Картинки
import arrowUpIcon from "../../../../Images/icon_arrow_up.png";
import arrowDownIcon from "../../../../Images/icon_arrow_down.png";
//CSS
import "./TaskLog.css";

class TasksLog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMinimized: true
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.props.fetchTasksLogByDate(this.props.date);
    }
  }

  minimizeTaskLog() {
    this.setState({ isMinimized: !this.state.isMinimized });
  }

  //Соберем таблицу для отображения лога по задачам
  getContent() {
    //Здесь немного извращенно — сначала пушим записи в логе, потом шапку. Чтобы была правильная сортировка
    let content = [];

    //Соберем список задач. Он одинаковый для каждой записи в логе
    let tasksList = [];
    const tasks = this.props.tasks;
    let tasksForChosenDate = {};

    //Отфильтруем за нужную дату
    for (var ts in tasks) {
      if (tasks[ts].for_date === this.props.date) {
        tasksForChosenDate[tasks[ts].id] = tasks[ts];
      }
    }

    //Соберем список задача для выпадающего списка из текущих задача
    for (var t in tasksForChosenDate) {
      tasksList.push({
        value: tasksForChosenDate[t].id,
        label: tasksForChosenDate[t].name
      });
    }

    //После этого пройдемся и соберем все записи таск лога
    const tasksLog = this.props.tasksLog;

    let tasksLogForChosenDate = {};

    //Отфильтруем за нужную дату
    for (var tl in tasksLog) {
      if (tasksLog[tl].for_date === this.props.date) {
        tasksLogForChosenDate[tasksLog[tl].id] = tasksLog[tl];
      }
    }

    for (var tlcd in tasksLogForChosenDate) {
      let task_id = tasksLogForChosenDate[tlcd].task_id;

      //Проверим, доступна ли задача в логе в выпадающем списке. Если нет — добавим
      if (
        typeof tasksList.find(task => {
          return task.value === task_id;
        }) === "undefined"
      ) {
        tasksList.push({
          value: task_id,
          label: tasksLogForChosenDate[tlcd].task_name
        });
      }

      //добавим текущую
      let tasks = {
        list: tasksList,
        current: task_id
      };

      content.unshift([
        { key: "id", type: "hidden", value: tasksLogForChosenDate[tlcd].id },
        {
          key: "task_id",
          type: "select",
          disabled: false,
          value: tasks
        },
        {
          key: "execution_start",
          type: "time",
          disabled: false,
          value: tasksLogForChosenDate[tlcd].execution_start
        },
        {
          key: "execution_end",
          type: "time",
          disabled: false,
          value: tasksLogForChosenDate[tlcd].execution_end
        },
        {
          key: "execution_time",
          type: "time",
          disabled: true,
          value: getTimeFromMins(tasksLogForChosenDate[tlcd].execution_time)
        },
        {
          key: "comment",
          type: "text",
          disabled: false,
          value: tasksLogForChosenDate[tlcd].comment
        }
      ]);
    }

    content.unshift([
      {
        key: "id",
        type: "hidden",
        disabled: true,
        value: "ID"
      },
      {
        key: "task_id",
        type: "string",
        disabled: true,
        value: "Задача",
        width: 580
      },
      {
        key: "execution_start",
        type: "string",
        disabled: true,
        value: "Старт",
        width: 80
      },
      {
        key: "execution_end",
        type: "string",
        disabled: true,
        value: "Стоп",
        width: 80
      },
      {
        key: "execution_time",
        type: "string",
        disabled: true,
        value: "Время",
        width: 80
      },
      {
        key: "comment",
        type: "string",
        disabled: true,
        value: "Комментарий",
        width: 250
      }
    ]);

    return content;
  }

  render() {
    return (
      <div className="taskLogTableContainer">
        <div className="taskLogTable">
          <div className="taskLog">
            <div className="taskLogResize">
              <Action
                icon={!!this.state.isMinimized ? arrowUpIcon : arrowDownIcon}
                isTransparent={true}
                onClick={() => this.minimizeTaskLog()}
              />
            </div>
            <Table
              maxHeight={!!this.state.isMinimized ? "81px" : "375px"}
              isFixed={true}
              isEditable={true}
              isResizeble={false}
              saveRow={taskLog =>
                this.props.updateTaskLog(taskLog, this.props.date)
              }
              deleteRow={taskLog => this.props.deleteTaskLog(taskLog.id)}
            >
              {this.getContent()}
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    tasksLog: state.tasksLog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasksLogByDate: date => {
      dispatch(fetchTasksLogByDate(date));
    },
    updateTaskLog: (taskLog, date) => {
      dispatch(updateTaskLog(taskLog, date));
    },
    deleteTaskLog: id => {
      dispatch(deleteTaskLog(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksLog);
