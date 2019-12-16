import React from "react";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Подключаем redux
import { connect } from "react-redux";
import { setScrollTop } from "../../Store/actions";
//Импортируем компоненты
import PageTitle from "./PageTitle/PageTitle";
import PageContent from "./PageContent/PageContent";
import "./Page.css";

class Page extends React.Component {
  //Обрабатываем вертикальный скролл контента
  //Нужно для правильного позиционирования элементов в таблицах
  handleVerticalScroll() {
    this.props.setScrollTop(this._scrollBarRef.scrollTop);
  }

  render() {
    return (
      <div className="page">
        <PageTitle
          title={this.props.title}
          menuLinksArray={this.props.menuLinksArray}
        />
        <div className="page hr" />
        <ReactCustomScroll
          //Задаем стиль
          style={{ width: "100%", height: "calc(100vh - 126px)" }}
          //Обрабатываем вертикальный скролл
          ref={ref => {
            this._scrollBarRef = ref;
          }}
          onScrollStop={event => this.handleVerticalScroll(event)}
        >
          <PageContent
            isAdmin={this.props.isAdmin}
            isPrivate={this.props.isPrivate}
          >
            {this.props.children}
          </PageContent>
        </ReactCustomScroll>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    scrollTop: state.scrollTop
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setScrollTop: number => {
      dispatch(setScrollTop(number));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
