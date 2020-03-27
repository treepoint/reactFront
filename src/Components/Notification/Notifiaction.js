import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { removeNotification } from "../../Store/actions/notifications";
//CSS
import "./Notification.css";

class Notification extends React.Component {
  removeNotification() {
    setTimeout(() => {
      this.props.removeNotification(this.props.uuid);
    }, 5000);
  }

  render() {
    //При рендере сразу заряжаем самоуничтожение
    this.removeNotification();

    return (
      <div key={this.props.uuid} className={"notification " + this.props.type}>
        {this.props.message}
        <div
          className="notificationClose"
          onClick={() => this.props.removeNotification(this.props.uuid)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeNotification: uuid => {
      dispatch(removeNotification(uuid));
    }
  };
};

export default connect(null, mapDispatchToProps)(Notification);
