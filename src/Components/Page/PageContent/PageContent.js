import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Импортируем компоненты
import OnlyAdminMessage from "../ServiceMessages/OnlyAdminMessage";
import OnlyRegistredUsersMessage from "../ServiceMessages/OnlyRegistredUsersMessage";
//Подключаем CSS
import "./PageContent.css";

class PageContent extends React.Component {
  getContent() {
    //Если страница не приватная и доступна не только админам — cразу отдадим контент
    if (!this.props.isPrivate && !this.props.isAdmin) {
      return this.props.children;
    }

    //Но если нужны еще и админские права — чекнем их
    if (this.props.isAdmin && this.props.user.role !== "admin") {
      return <OnlyAdminMessage />;
    }

    //Иначе нужен токен и email как минимум
    if (!!!this.props.token && !!!this.props.user.email) {
      return <OnlyRegistredUsersMessage />;
    }

    return this.props.children;
  }

  render() {
    return <div className="pageContent">{this.getContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token
  };
};

export default connect(mapStateToProps)(PageContent);
