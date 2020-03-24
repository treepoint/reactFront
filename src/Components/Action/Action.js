import React from "react";
import "./Action.css";

class Action extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isHover: false,
      needHover: false
    };
  }

  onClick(event) {
    if (typeof this.props.onClick !== "function") {
      return;
    }

    this.props.onClick(event);
  }

  getClassName(cl) {
    let className = cl;

    if (this.props.disabled) {
      className += " disabled";
    }

    if (!!this.props.isPressed) {
      className += " pressed";
    }

    if (!!this.props.isTransparent) {
      className += " transparent";
    }

    if (!!this.props.isVanishing) {
      className += " vanishing";
    }

    if (!!this.props.isFlicker) {
      className += " flicker";
    }

    if (!!this.state.isHover && !!!this.props.lable) {
      className += " visible";
    }

    return className;
  }

  onHover() {
    this.setState({ needHover: true }, () => {
      setTimeout(() => {
        if (this.state.needHover) {
          this.setState({ isHover: true });
        }
      }, 800);
    });
  }

  render() {
    return (
      <div className="actionContainer" onClick={event => this.onClick(event)}>
        <div className="actionIconContainer">
          <div
            className={this.getClassName("action")}
            onMouseOver={() => {
              this.onHover();
            }}
            onMouseLeave={() => {
              this.setState({ isHover: false, needHover: false });
            }}
            style={Object.assign(
              {
                background:
                  "url(" +
                  this.props.icon +
                  ") no-repeat scroll 50% 50% transparent"
              },
              this.props.style
            )}
          />
          {!!this.props.lable ? (
            <div className={this.getClassName("actionLable")}>
              {this.props.lable}
            </div>
          ) : null}
        </div>
        {!!this.props.hint ? (
          <div className="actionHintContainer">
            <div className={this.getClassName("actionHint")}>
              {this.props.hint}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Action;
