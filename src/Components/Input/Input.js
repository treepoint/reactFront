import React from "react";
import LabelValidation from "../LabelValidation/LableValidation";
import "./Input.css";

class Input extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="inputContainer">
          <div className="inputLable">{this.props.label}</div>
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
        </div>
        <LabelValidation value={this.props.invalidMessage} />
      </React.Fragment>
    );
  }
}

export default Input;
