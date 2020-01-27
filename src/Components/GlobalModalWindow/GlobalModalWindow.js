import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setModalWindowState } from "../../Store/actions/globalModalWindow";
import ModalWindow from "../ModalWindow/ModalWindow";

class GlobalModalWindow extends React.PureComponent {
  render() {
    return (
      <ModalWindow onClose={event => this.props.hideModalWindow(event)}>
        {this.props.children}
      </ModalWindow>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideModalWindow: event => {
      event.stopPropagation();
      event.preventDefault();
      dispatch(setModalWindowState(false));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GlobalModalWindow);
