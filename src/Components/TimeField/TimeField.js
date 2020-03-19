import React from "react";
import TimeField from "react-simple-timefield";
import TextContent from "../TextContent/TextContent";

class TimeFieldd extends React.PureComponent {
  render() {
    return (
      <div className="TimeField">
        {!!this.props.disabled ? (
          <TextContent
            value={this.props.value}
            disabled={this.props.disabled}
            isStandalone={true}
          />
        ) : (
          <TimeField
            value={this.props.value}
            className={this.props.className}
            style={this.props.style}
            onFocus={event => this.props.onFocus(event)}
            onChange={event => this.props.onChange(event)}
            onBlur={event => this.props.onBlur(event)}
            onKeyPress={event => this.props.onKeyPress(event)}
          />
        )}
      </div>
    );
  }
}

export default TimeFieldd;
