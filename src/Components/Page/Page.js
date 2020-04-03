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
        isCustomContent={this.props.isCustomContent}
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
            actionsArray={this.props.actionsArray}
            additionalTitleBlock={this.props.additionalTitleBlock}
          />
        </React.Fragment>
      );
    }
  }

  getStyle() {
    if (this.props.windowWidth < 1300) {
      return { width: "calc(100% - 24px)" };
    }

    return { width: "calc(100% - 112px)" };
  }

  render() {
    return (
      <div className="page" style={this.getStyle()}>
        {this.getTitle()}
        {this.getPageContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth
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

export default connect(mapStateToProps, mapDispatchToProps)(Page);
