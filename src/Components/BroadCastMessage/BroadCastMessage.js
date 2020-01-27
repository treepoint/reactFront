import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setShowBroadcastMessage } from "../../Store/actions/app";
//CSS
import "./BroadCastMessage.css";

class BroadCastMessage extends React.PureComponent {
  render() {
    if (this.props.isActive) {
      return (
        <div className="broadCastMessage">
          <div
            className={"broadcastMessageClose"}
            onClick={() => this.props.setShowBroadcastMessage()}
          />
          {this.props.message}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    isActive: state.showBroadcastMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShowBroadcastMessage: () => {
      dispatch(setShowBroadcastMessage(false));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BroadCastMessage);
