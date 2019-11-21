import React from "react";
import userIcon from "../../Images/user_icon.png";
import "./header.css";

class Header extends React.Component {
  getFullName() {
    let fullName =
      this.props.userName +
      " " +
      this.props.userSecondName +
      " " +
      this.props.userThirdName;

    switch ("") {
      case this.props.userName:
        return "";
      case this.props.userSecondName:
        return "";
      case this.props.userThirdName:
        return "";
      default:
        return fullName;
    }
  }

  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(true);

    console.log(this.props.isRegistrationModalWindowActive);
  }

  render() {
    return (
      <div className="Header">
        <div
          className="fullUserName"
          onClick={event => this.onClick(event)}
          style={{
            background:
              "url(" + userIcon + ") no-repeat scroll 0 0 transparent",
            backgroundSize: "20px 20px",
            display: "block"
          }}
        >
          {!!this.getFullName() ? this.getFullName() : "Зарегистрироваться"}
        </div>
      </div>
    );
  }
}
export default Header;
