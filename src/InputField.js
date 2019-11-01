import React from "react";

class InputField extends React.Component {
  render() {
    return (
      <div>
        <p>
          <label>
            {this.props.manReadingName}
            <input
              type="text"
              name={this.props.name}
              value={this.props.value}
              onChange={event => {
                this.props.onChange(event);
              }}
            />
          </label>
        </p>
        <p>{this.props.validate}</p>
      </div>
    );
  }
}

export default InputField;
