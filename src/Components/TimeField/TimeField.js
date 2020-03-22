import React from "react";
import TF from "react-simple-timefield";
import TextContent from "../TextContent/TextContent";

import "./TimeField.css";

class TimeField extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        {!!this.props.disabled ? (
          <div className="timefield disabled">
            <TextContent
              value={this.props.value}
              disabled={this.props.disabled}
              isStandalone={true}
            />
          </div>
        ) : (
          <TF
            value={this.props.value}
            className={this.props.className}
            style={this.props.style}
            onFocus={event => this.props.onFocus(event)}
            onChange={event => this.props.onChange(event)}
            onBlur={event => this.props.onBlur(event)}
            onKeyPress={event => this.props.onKeyPress(event)}
          />
        )}
      </React.Fragment>
    );
  }
}

export default TimeField;
