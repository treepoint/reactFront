import React from "react";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Подключаем redux
import { connect } from "react-redux";
import { setScrollTop, setScrollLeft } from "../../Store/actions/page";
//Импортируем компоненты
import PageTitle from "./PageTitle/PageTitle";
import PageContent from "./PageContent/PageContent";
import "./Page.css";

class Page extends React.PureComponent {
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

  getTitle() {
    if (typeof this.props.title !== "undefined") {
      return (
        <React.Fragment>
          <PageTitle
            title={this.props.title}
            routerLinksArray={this.props.routerLinksArray}
            anchorLinksArray={this.props.anchorLinksArray}
          />
          <div className="page hr" />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <div className="page">
        {this.getTitle()}
        {this.getPageContent()}
      </div>
    );
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
