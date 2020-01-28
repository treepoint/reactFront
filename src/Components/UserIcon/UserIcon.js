import React from "react";
import userIcon from "../../Images/icon_user.png";
import "./UserIcon.css";

class UserIcon extends React.PureComponent {
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
