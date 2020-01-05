import React from "react";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Подключаем redux
import { connect } from "react-redux";
import { setScrollTop, setScrollLeft } from "../../Store/actions";
//Импортируем компоненты
import PageTitle from "./PageTitle/PageTitle";
import PageContent from "./PageContent/PageContent";
import "./Page.css";

class Page extends React.Component {
  //Обрабатываем скролл контента
  //Нужно для правильного позиционирования элементов в таблицах
  handleVerticalScroll() {
    if (this._scrollBarRef !== null) {
      this.props.setScrollTop(this._scrollBarRef.scrollTop);
      this.props.setScrollLeft(this._scrollBarRef.scrollLeft);
    }
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
          style={{ width: "100%", height: "calc(-112px + 100vh)" }}
          //Обрабатываем вертикальный скролл
          ref={ref => {
            this._scrollBarRef = ref;
          }}
          onScrollStop={() => this.handleVerticalScroll()}
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
    scrollTop: state.scrollTop,
    scrollLeft: state.scrollLeft
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setScrollTop: number => {
      dispatch(setScrollTop(number));
    },
    setScrollLeft: number => {
      dispatch(setScrollLeft(number));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
