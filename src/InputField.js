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
      <div style={{ textAlign: "left" }}>
        <p style={{ marginBottom: "0px" }}>
          <label style={{ display: "flex" }}>
            <input
              style={{
                display: "flex",
                width: "100%",
                background: "rgba(247, 247, 247, 0.28)",
                border: "1px solid " + this.props.borderColor,
                height: "20px",
                paddingLeft: "4px",
                fontSize: "14px"
              }}
              type="text"
              name={this.props.name}
              placeholder={this.props.placeholder}
              onChange={event => {
                this.props.onChange(event);
              }}
            />
          </label>
        </p>
        {this.renderValidateLable(this.props.validate)}
      </div>
    );
  }
}

export default InputField;
