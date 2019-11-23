import React from "react";
import userIcon from "../../Images/user_icon.png";
import "./userIcon.css";

class UserIcon extends React.Component {
  render() {
    return (
      <div
        className="userIcon"
        style={{
          background:
            "url(" + userIcon + ") no-repeat scroll 100% 0 transparent",
          backgroundSize: "20px 20px"
        }}
      />
    );
  }
}

export default UserIcon;
