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
    let error = !!this.props.isValid(this.props.value) ? " error" : "";

    console.log(
      "Значение:" +
        this.props.isValid(this.props.value) +
        "Второе значение: " +
        !!this.props.isValid(this.props.value)
    );

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
        <ValidateLable value={this.props.isValid(this.props.value)} />
      </div>
    );
  }
}

export default InputField;
