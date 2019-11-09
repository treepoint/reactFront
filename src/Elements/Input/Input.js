import React from "react";
import LableValidation from "../LableValidation/LableValidation";
import "./Input.css";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { invalidMessage: "" };
  }
  render() {
    //Проходимся по массиву функций валидации. Если что-то вернулось — значит поле не валидное
    let isNotValid = this.props.validationFunctions.find(
      item =>
        item.getInvalidMessage(this.props.value) !== "" && this.props.isTouched
    );

    //Если нажали на кнопку — обновляем сообщение об ошибке. В противном случае только рендерим новое value
    if (this.props.isTouched) {
      this.setState({
        invalidMessage: !!isNotValid
          ? isNotValid.getInvalidMessage(this.props.value)
          : ""
      });
    }

    return (
      <div>
        <label style={{ display: "flex" }}>
          <input
            className={"input" + (this.state.invalidMessage ? " error" : "")}
            type="text"
            name={this.props.name}
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            onChange={event => {
              this.props.onChange(event);
            }}
          />
        </label>
        <LableValidation value={this.state.invalidMessage} />
      </div>
    );
  }
}

export default Input;
