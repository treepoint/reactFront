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
    let borderColor = "rgba(216, 216, 216, 0.56)";

    if (this.props.validate !== "") {
      borderColor = "rgba(175, 4, 4, 0.63)";
    }

    return (
      <div>
        <label style={{ display: "flex" }}>
          <input
            className="input"
            style={{
              border: "1px solid " + borderColor
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
