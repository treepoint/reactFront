import React from "react";
import LabelValidation from "../LabelValidation/LableValidation";
import "./Input.css";

class Input extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <label style={{ display: "flex" }}>
          <input
            className={"input" + (this.props.invalidMessage ? " error" : "")}
            type={this.props.type}
            name={this.props.name}
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            onChange={event => {
              this.props.onChange(event);
            }}
          />
        </label>
        <LabelValidation value={this.props.invalidMessage} />
      </React.Fragment>
    );
  }
}

export default Input;
