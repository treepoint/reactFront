import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
//Подключаем redux
import { connect } from "react-redux";
import { restoreFromCookies } from "../../Store/actions/app";
//Подключаем модальные окна
import { getGlobalModalWindow } from "../../Components/GlobalModalWindow/GLOBAL_MODAL_WINDOWS";
//Подключаем компоненты и контейнеры
import Header from "../Header/Header";
import Home from "../Sections/Home/Home";
import TasksManager from "../Sections/TasksManager/TasksManager";
import TaskStatuses from "../Sections/TaskStatuses/TaskStatuses";
import Categories from "../Sections/Categories/Categories";
import StatisticRouter from "../Sections/Statistic/StatisticRouter";
import About from "../Sections/About/About";
import AdminPanelRouter from "../Sections/AdminPanel/AdminPanelRouter";
import Bottom from "../Bottom/Bottom";
//Обои по умолчанию
import defaultWallpaper from "../../Images/default_wallpaper.jpg";
//CSS
import "./App.css";

class App extends React.PureComponent {
  componentDidMount() {
    //Пробуем подтянуть состояние приложения основываясь на информации в cookies
    this.props.restoreFromCookies();
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="wallpaper"
          style={!!this.props.wallpaper ?
            { backgroundImage: "url(" + this.props.wallpaper + ")" }
            :
            { background: "url(" + defaultWallpaper + ")" }
          }
        >
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            {/*Если не авторизован — эти пункты вообще не обрабатываем*/}
            {!!this.props.userAuthState ? (
              <React.Fragment>
                <Route path="/tasks_manager" component={TasksManager} />
                <Route path="/task_statuses" component={TaskStatuses} />
                <Route path="/categories" component={Categories} />
                <Route path="/statistic" component={StatisticRouter} />
                <Route path="/admin" component={AdminPanelRouter} />
                <Route path="/about" component={About} />
              </React.Fragment>
            ) : null}
            <Route path="/about" component={About} />
          </Switch>
          {getGlobalModalWindow(
            this.props.modalWindowState,
            this.props.modalWindowName
          )}
          <Bottom />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalWindowState: state.modalWindowState,
    modalWindowName: state.modalWindowName,
    userAuthState: state.userAuthState,
    wallpaper: state.userSettings.wallpaper
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restoreFromCookies: () => {
      dispatch(restoreFromCookies());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
