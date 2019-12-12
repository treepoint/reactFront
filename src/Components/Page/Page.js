import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем модалки
import { login, registration } from "../ModalWindow/MODAL_WINDOWS";
import AnchorModalWindow from "../../Containers/AnchorModalWindow/AnchorModalWindow";
//Импортируем компоненты
import Anchor from "../Anchor/Anchor";
import "./Page.css";

class Page extends React.Component {
  isAccesseble() {
    //Если страница не приватная — ничего не проверяем
    if (!this.props.isPrivate) {
      return true;
    }

    //Иначе нужен токен и email как минимум
    if (!!this.props.token && !!this.props.user.email) {
      return true;
    }

    return false;
  }

  getPrivatePageMessage() {
    return (
      <div>
        <p>Страница доступна только зарегистрированным пользователям.</p>
        <p>
          Пожалуйста,{" "}
          <Anchor>
            <AnchorModalWindow value="войдите" modalWindowName={login} />
          </Anchor>{" "}
          или{" "}
          <Anchor>
            <AnchorModalWindow
              value="зарегистрируйтесь"
              modalWindowName={registration}
            />
          </Anchor>
          .
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="page">
        <div className="title">{this.props.title}</div>
        <div className="hr" />
        <div className="content">
          {this.isAccesseble()
            ? this.props.children
            : this.getPrivatePageMessage()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token
  };
};

export default connect(mapStateToProps)(Page);
