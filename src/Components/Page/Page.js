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
  //Нужно для правильного позиционирования fixed элементов
  handleScroll() {
    if (this._scrollBarRef !== null) {
      this.props.setScrollTop(this._scrollBarRef.scrollTop);
      this.props.setScrollLeft(this._scrollBarRef.scrollLeft);
    }
  }

  getPageContent() {
    let content = (
      <PageContent
        isAdmin={this.props.isAdmin}
        isPrivate={this.props.isPrivate}
      >
        {this.props.children}
      </PageContent>
    );

    if (this.props.isNotScrollable) {
      return content;
    } else {
      return (
        <ReactCustomScroll
          //Задаем стиль
          style={{ width: "100%", height: "calc(-127px + 100vh)" }}
          ref={ref => {
            this._scrollBarRef = ref;
          }}
          //Обрабатываем скролл
          onScrollStop={() => this.handleScroll()}
        >
          {content}
        </ReactCustomScroll>
      );
    }
  }

  getPage() {
    if (typeof this.props.title === "undefined") {
      return <div className="page">{this.getPageContent()}</div>;
    } else {
      return (
        <div className="page">
          <PageTitle
            title={this.props.title}
            menuLinksArray={this.props.menuLinksArray}
          />
          <div className="page hr" />
          {this.getPageContent()}
        </div>
      );
    }
  }

  render() {
    return this.getPage();
  }
}

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
  null,
  mapDispatchToProps
)(Page);
