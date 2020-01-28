import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setShowHeaderWarning } from "../../Store/actions/app";
//Картинка
import iconWarning from "../../Images/icon_important.png";
//CSS
import "./HeaderWarning.css";

class HeaderWarning extends React.PureComponent {
  getButton() {
    return (
      <div
        className={
          "headerWarningButton" + (!!this.props.isActive ? " active" : "")
        }
        style={{
          background: "url(" + iconWarning + ") no-repeat scroll 100% ",
          backgroundSize: "24px 24px",
          backgroundColor: "rgba(255, 255, 255, 0.1)"
        }}
        onClick={() => this.props.setShowHeaderWarning(!this.props.isActive)}
      />
    );
  }

  //Само сообщение
  getMessageBox() {
    if (this.props.isActive) {
      return (
        <div className="headerWarningMessageBox">{this.props.message}</div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.getButton()}
        {this.getMessageBox()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isActive: state.showHeaderWarning
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShowHeaderWarning: boolean => {
      dispatch(setShowHeaderWarning(boolean));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderWarning);
