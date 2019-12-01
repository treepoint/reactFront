import React from "react";
//Подключаем роутинг
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Подключаем redux
import { connect } from "react-redux";
import { setToken, setUser } from "../../Store/actions";
//Подключаем cookies
import { bake_cookie, read_cookie } from "../../Lib/Sfcookies";
//Подключаем API
import { getUserByID, reauth } from "../../APIController/APIController";
//Шапка
import Header from "../Header/Header";
//Страницы
import Home from "../Contents/Home";
import About from "../Contents/About";
import Users from "../Contents/Users";
//Подключаем модальные окна
import { getModalWindow } from "../../Components/ModalWindow/MODAL_WINDOWS";
//Сообщение—уведомление
import BroadCastMessage from "../../Components/BroadCastMessage/BroadCastMessage";
//CSS
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    //Попробуем подтянуть часть стора из cookies по обычному токену и ID пользователя
    this.setStoreFromCookies(isSuccess => {
      if (!isSuccess) {
        //Если не получилось — попробуем подтянуть по refresh токену
        this.setStoreAndCookiesFromAPI();
      }
      //Если и здесь не получилось, значит ничего из этого нет — игнорируем ситуацию
    });
  }

  //Обновим стор по значениям токена и userID
  setStoreFromCookies(callback) {
    let token = read_cookie("token");
    let userId = read_cookie("user_id");

    if (token.lenght !== 0 && userId.lenght !== 0) {
      //Токен просто запишем
      this.props.setToken(token);

      //Пользователя получим по ID и запишем
      let promise = getUserByID(userId);

      promise.then(user => {
        this.props.setUser(user);
        callback(true);
      });
    } else {
      callback(false);
    }
  }

  //Обновим стор и куки из API
  setStoreAndCookiesFromAPI() {
    let promise = reauth();

    promise.then(result => {
      //Если есть ошибки
      if (typeof result.response !== "undefined") {
        return;
      }

      //Unixtime в обычное время
      let tokenExp = new Date(result.token.exp * 1000);

      //Unixtime в обычное время
      let refreshTokenExp = new Date(result.refreshToken.exp * 1000);

      bake_cookie("token", result.token.value, tokenExp);
      bake_cookie("user_id", result.user.id, tokenExp);
      bake_cookie("refresh_token", result.refreshToken.value, refreshTokenExp);

      this.props.setToken(result.token.value);
      this.props.setUser(result.user);
    });
  }

  render() {
    return (
      <body>
        <Header />
        <Router>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
        {getModalWindow(
          this.props.modalWindowState,
          this.props.modalWindowName
        )}
        <BroadCastMessage message="Веб-приложение находится в разработке. Номер сборки: 0.1.1" />
      </body>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    modalWindowState: state.modalWindowState,
    modalWindowName: state.modalWindowName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => {
      dispatch(setToken(token));
    },
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
