import React from "react";
import "./RadioButtonCarousel.css";

class RadioButtonCarousel extends React.Component {
  onClick(event) {
    this.setState({ currentButtonId: event.target.id });
  }

  getContent() {
    let className;

    //Последний индекс массива для отрисовки последней кнопки
    let lastIndex = this.props.items.length - 1;

    let buttons = this.props.items.map((item, index) => {
      switch (index) {
        case 0:
          className = "radioButton first";
          break;
        case lastIndex:
          className = "radioButton last";
          break;
        default:
          className = "radioButton";
      }

      if (item.isPrimary) {
        className += " primary";
      }

      if (item.isToday) {
        className += " today";
      }

      return (
        <input
          id={item.key}
          name={item.name}
          type="submit"
          className={className}
          value={item.value}
          onClick={event => {
            item.onClick(event);
            this.onClick(event);
          }}
        />
      );
    });

    return buttons;
  }

  render() {
    return <div className="radioButtonCarousel">{this.getContent()}</div>;
  }
}

export default RadioButtonCarousel;
