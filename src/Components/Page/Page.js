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
  getContent() {
    //Если страница не приватная и доступна не только админам — cразу отдадим контент
    if (!this.props.isPrivate && !this.props.isAdmin) {
      return this.props.children;
    }

    //Иначе нужен токен и email как минимум
    if (!!this.props.token && !!this.props.user.email) {
      //Но если нужны еще и админские права — чекнем их
      if (this.props.isAdmin) {
        if (this.props.user.role !== "admin") {
          return this.getAdminPageMessage();
        }
      }
      //Если не админка и есть токен и email — так же отдадим контент
      return this.props.children;
    }

    return this.getAuthPageMessage();
  }

  getAdminPageMessage() {
    return (
      <div>
        <p>Страница доступна только администраторам.</p>
        <p>
          Пожалуйста,{" "}
          <Anchor>
            <AnchorModalWindow value="войдите" modalWindowName={login} />
          </Anchor>{" "}
          под учетной записью администратора.
        </p>
      </div>
    );
  }

  getAuthPageMessage() {
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
        <div className="content">{this.getContent()}</div>
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
