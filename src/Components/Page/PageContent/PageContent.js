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
          return <OnlyAdminMessage />;
        }
      }
      //Если не админка и есть токен и email — так же отдадим контент
      return this.props.children;
    }

    return <OnlyRegistredUsersMessage />;
  }

  render() {
    return <div className="pageContent">{this.getContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    loading: state.loading
  };
};

export default connect(mapStateToProps)(PageContent);
