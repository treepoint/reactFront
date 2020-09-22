import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
import DocumentTitle from "react-document-title";
//Подключаем redux
import { connect } from "react-redux";
import {
  restoreFromCookies,
  setWindowHeight,
  setWindowWidth,
  checkNextDayAlreadyComes
} from "../../Store/actions/app.js";
//Подключаем модальные окна
import { getGlobalModalWindow } from "../../Components/GlobalModalWindow/GLOBAL_MODAL_WINDOWS";
//Подключаем компоненты и контейнеры
import Header from "../Header/Header";
import Home from "../Sections/Home/Home";
import TasksManager from "../Sections/TasksManager/TasksManager";
import Categories from "../Sections/Categories/Categories";
import Statistic from "../Sections/Statistic/Statistic";
import About from "../Sections/About/About";
import Page404 from "../Sections/Page404/Page404";
import AdminPanelRouter from "../Sections/AdminPanel/AdminPanelRouter";
import Bottom from "../Bottom/Bottom";
import NotificationSystem from "../NotificationSystem/NotificationSystem";
//Детектим изменения размеров окна
import ReactResizeDetector from "react-resize-detector";
//Обои по умолчанию
import defaultWallpaper from "../../Images/default_wallpaper.jpg";
//CSS
import "./App.css";

class App extends React.PureComponent {
  componentDidMount() {
    //Пробуем подтянуть состояние приложения основываясь на информации в cookies
    this.props.restoreFromCookies();

    //Напишем номер версии
    console.log("Номер сборки: 0.9.9");

    //Проверяем не наступил ли следующий день, возможно стоит выдать аллерт об этом
    setInterval(this.props.checkNextDayAlreadyComes, 5000);
  }

  isFirefox() {
    return navigator.userAgent.indexOf("Firefox") + 1;
  }

  //Обрабатываем резайс окна и пишем в сторе
  onResize(width, height) {
    this.props.setWindowWidth(width);
    this.props.setWindowHeight(height);
  }

  getRouter() {
    if (!!this.props.userAuthState) {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/tasks_manager" component={TasksManager} />
          <Route path="/categories" component={Categories} />
          <Route path="/statistic" component={Statistic} />
          <Route path="/admin" component={AdminPanelRouter} />
          <Route path="/about" component={About} />
          <Route component={Page404} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route component={Page404} />
        </Switch>
      );
    }
  }

  render() {
    return (
      <DocumentTitle title={this.props.title}>
        <React.Fragment>
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={(width, height) => this.onResize(width, height)}
          />
          <div
            className="wallpaper"
            style={
              !!this.props.wallpaper
                ? { backgroundImage: "url(" + this.props.wallpaper + ")" }
                : { background: "url(" + defaultWallpaper + ")" }
            }
          >
            <div className="wallpaperBlur">
              <Header />
              {this.getRouter()}
              {getGlobalModalWindow(
                this.props.modalWindowState,
                this.props.modalWindowName
              )}
              <Bottom />
              <NotificationSystem />
            </div>
          </div>
        </React.Fragment>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalWindowState: state.modalWindowState,
    modalWindowName: state.modalWindowName,
    userAuthState: state.userAuthState,
    wallpaper: state.userSettings.wallpaper,
    title: state.title
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restoreFromCookies: () => {
      dispatch(restoreFromCookies());
    },
    setWindowWidth: width => {
      dispatch(setWindowWidth(width));
    },
    setWindowHeight: height => {
      dispatch(setWindowHeight(height));
    },
    checkNextDayAlreadyComes: () => {
      dispatch(checkNextDayAlreadyComes());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
