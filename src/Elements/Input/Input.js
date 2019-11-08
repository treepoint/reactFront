import React from "react";
import LableValidation from "../LableValidation/LableValidation";
import "./Input.css";

class Input extends React.Component {
  render() {
    //Проходимся по массиву функций валидации. Если что-то вернулось — значит поле не валидное
    let isNotValid = this.props.validationFunctions.find(
      item => item.getInvalidMessage(this.props.value) !== ""
    );

    return (
      <div>
        <label style={{ display: "flex" }}>
          <input
            className={"input" + (!!isNotValid ? " error" : "")}
            type="text"
            name={this.props.name}
            defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder}
            onChange={event => {
              this.props.onChange(event);
            }}
          />
        </label>
        <LableValidation
          value={
            !!isNotValid ? isNotValid.getInvalidMessage(this.props.value) : ""
          }
        />
      </div>
    );
  }
}

export default Input;
