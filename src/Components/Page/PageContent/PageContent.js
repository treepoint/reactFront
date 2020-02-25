import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Импортируем компоненты
import OnlyAdminMessage from "../ServiceMessages/OnlyAdminMessage";
import OnlyRegistredUsersMessage from "../ServiceMessages/OnlyRegistredUsersMessage";
//Подключаем CSS
import "./PageContent.css";

class PageContent extends React.PureComponent {
  getContent() {
    //Если страница не приватная и доступна не только админам — cразу отдадим контент
    if (!this.props.isPrivate && !this.props.isAdmin) {
      return this.props.children;
    }

    //Но если нужны еще и админские права — чекнем их
    if (this.props.isAdmin && !this.props.userIsAdmin) {
      return <OnlyAdminMessage />;
    }

    //Иначе нужна авторизация
    if (!this.props.userAuthState) {
      return <OnlyRegistredUsersMessage />;
    }

    //Ну и на всякий случай — вернем ничего)
    return this.props.children;
  }

  render() {
    return <div className={!!this.props.isCustomContent ? "pageContainer" : "pageContent"}>{this.getContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    userAuthState: state.userAuthState,
    userIsAdmin: state.currentUserIsAdmin,
    user: state.user
  };
};

export default connect(mapStateToProps)(PageContent);
