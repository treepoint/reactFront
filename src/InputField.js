import React from "react";
import ValidateLable from "./ValidateLable";

class InputField extends React.Component {
  renderValidateLable(validate) {
    var display = "block";

    if (this.props.validate === "") {
      display = "none";
    }

    return <ValidateLable validate={validate} display={display} />;
  }

  render() {
    return (
      <div>
        <label style={{ display: "flex" }}>
          <input
            className="input"
            style={{
              border: "1px solid " + this.props.borderColor
            }}
            type="text"
            name={this.props.name}
            placeholder={this.props.placeholder}
            onChange={event => {
              this.props.onChange(event);
            }}
          />
        </label>
        {this.renderValidateLable(this.props.validate)}
      </div>
    );
  }
}

export default InputField;
