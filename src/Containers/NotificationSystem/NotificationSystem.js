import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { removeNotification } from "../../Store/actions/notifications";
//Компоненты
import Notification from "../../Components/Notification/Notifiaction";
//CSS
import "./NotificationSystem.css";

class NotificationSystem extends React.Component {
  getNotifications() {
    //Получим список уведомлений
    const notifications = this.props.notifications;

    //Соберем стек уведомлений для отрисовки
    let notificationsStack = [];

    for (var n in notifications) {
      notificationsStack.push(
        <Notification
          message={notifications[n].message}
          type={notifications[n].type}
          uuid={notifications[n].uuid}
          autohide={notifications[n].autohide}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSystem);
