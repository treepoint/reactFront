import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { removeNotification } from "../../Store/actions/notifications";
//CSS
import "./Notifications.css";

class Notifications extends React.Component {
  getNotifications() {
    //Получим список уведомлений
    const notifications = this.props.notifications;

    //Соберем стек уведомлений для отрисовки
    let notificationsStack = [];

    for (var n in notifications) {
      let uuid = notifications[n].uuid;

      notificationsStack.push(
        <div className={"notification " + notifications[n].type}>
          {notifications[n].message}
          <div
            className="notificationClose"
            onClick={() => this.props.removeNotification(uuid)}
          />
        </div>
      );
    }
    return notificationsStack;
  }

  render() {
    return (
      <div className="notificationsContainer">
        {this.getNotifications().map(item => item)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeNotification: uuid => {
      dispatch(removeNotification(uuid));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
