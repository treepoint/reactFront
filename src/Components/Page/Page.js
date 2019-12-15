import React from "react";
//Подключаем красивые скроллы
import { Scrollbars } from "react-custom-scrollbars";
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
    if (this.props.loading === true) {
      return;
    }

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
    //Если redux еще не загрузился — будем возвращать ничего
    if (this.props.loading === true) {
      return null;
    } else {
      //Но если у нас уже есть данные — будем возвращать контент
      return (
        <div className="page">
          <div className="title">
            {this.props.title}{" "}
            <div className="pageMenu">{this.props.pageMenu}</div>
          </div>
          <div className="hr" />
          <Scrollbars style={{ width: "100%", height: "calc(100vh - 126px)" }}>
            <div className="content">{this.getContent()}</div>
          </Scrollbars>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    loading: state.loading
  };
};

export default connect(mapStateToProps)(Page);
