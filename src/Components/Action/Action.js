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
      }, 875);
    });
  }

  render() {
    return (
      <div className="actionContainer" onClick={event => this.onClick(event)}>
        <div className={this.getClassName("actionIconContainer")}>
          <div
            className="action"
            onMouseOver={() => {
              this.onHover();
            }}
            onMouseLeave={() => {
              this.setState({ isHover: false, needHover: false });
            }}
            style={Object.assign(
              {
                backgroundImage: "url(" + this.props.icon + ") ",
                backgroundRepeat: "no-repeat",
                backgroundSize:
                  (!!this.props.height ? this.props.height : 24) +
                  "px " +
                  (!!this.props.width ? this.props.width : 24) +
                  "px",
                height: !!this.props.height ? this.props.height : 24,
                width: !!this.props.width ? this.props.width : 24
              },
              this.props.style
            )}
          />
          {!!this.props.lable ? (
            <div className={"actionLable"}>{this.props.lable}</div>
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
