import React from "react";
import LableValidation from "../LableValidation/LableValidation";
import "./Input.css";

class Input extends React.Component {
  render() {
    return (
      <div>
        <label style={{ display: "flex" }}>
          <input
            className={"input" + (this.props.invalidMessage ? " error" : "")}
            type="text"
            name={this.props.name}
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            onChange={event => {
              this.props.onChange(event);
            }}
          />
        </label>
        <LableValidation value={this.props.invalidMessage} />
      </div>
    );
  }
}

export default Input;
