import React from "react";
import LabelValidation from "../../LabelValidation/back/LabelValidation";
import "./Input.css";

class Input extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Input;
