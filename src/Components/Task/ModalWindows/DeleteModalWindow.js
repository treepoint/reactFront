import React from "react";
//Компоненты
import ConfirmModalWindow from "../../ConfirmModalWindow/ConfirmModalWindow";

class DeleteModalWindow extends React.PureComponent {
  /*
   * Модалка для переноса задачи на другую дату
   */
  render() {
    return (
      <ConfirmModalWindow
        title="Удалить задачу?"
        message="Вместе с задачей будут удалены все записи из лога и статистики. 
                   Если вы хотите закрыть задачу — проставьте у неё статус с типом «Окончательный»."
        onCancel={() =>
          this.props.setState({ isDeleteModalWindowHidden: true })
        }
        onConfirm={() => this.props.deleteTask()}
      />
    );
  }
}

export default DeleteModalWindow;
