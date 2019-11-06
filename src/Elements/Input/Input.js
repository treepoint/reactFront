import React from "react";
import LableValidation from "../LableValidation/LableValidation";
import "./Input.css";

class Input extends React.Component {
  render() {
    let error = !!this.props.isValid(this.props.value) ? " error" : "";

    return (
      <div>
        <label style={{ display: "flex" }}>
          <input
            className={"input" + error}
            type="text"
            name={this.props.name}
            placeholder={this.props.placeholder}
            onChange={event => {
              this.props.onChange(event);
            }}
          />
        </label>
        <LableValidation value={this.props.isValid(this.props.value)} />
      </div>
    );
  }
}

export default Input;
