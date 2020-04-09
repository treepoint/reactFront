import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем компоненты
import Blur from "../Blur/Blur";
import ReactCustomScroll from "react-scrollbars-custom";
import TextareaAutosize from "react-textarea-autosize";
import "./TextareaScrollbar.css";

class TextareaScrollbar extends React.Component {
  constructor() {
    super();
    this.state = {
      wideEditAreaIsHidden: true,
      value: "",
      isReadOnly: false,
      isChrome: this.isChrome(),
    };
  }

  //При создании компонента
  componentDidMount() {
    /* Вот смотри какая дичь. Если нет ни ширины не высоты, то
       иногда высота TextareaAutosize расхерачивается, но приходит в норму после ререндеринга
       Я не понимаю, почему так. Так ведет себя не одна TextareaAutosize, а все блин. 
       В общем если не задана ни высота ни ширина — выставим задержку на иницилизацию значения. 
       Так работает, но я душе не чаю почему. Anyway — нас тут MVP, а не курсы хорошего тона. */

    if (
      typeof this.props.height === "undefined" &&
      typeof this.props.width === "undefined"
    ) {
      setTimeout(() => {
        this.setState({ value: this.props.value });
      }, 10);
    } else {
      this.setState({ value: this.props.value });
    }
  }

  //При обновлении компонента
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      if (!this.state.isReadOnly && this.state.value !== this.props.value) {
        this.setState({ value: this.props.value });
      }
      this.setState({ isReadOnly: false });
    }
  }

  //При разрушении компонента
  componentWillUnmount(event) {
    this.onEndEditing(event);
  }

  //Определяем хром это или нет. От этого немного зависит верстка
  isChrome() {
    return navigator.userAgent.indexOf("Chrome") + 1;
  }

  //Изменяем контент по вводу
  onChange(event) {
    let value = event.target.value;

    //Если в режиме одной строки — просто удалим переносы при вводе если они были
    if (this.props.isSingleLineMode) {
      value = value.replace(/\n/g, "");
    }

    this.setState({ value });
  }

  //Ловим обработку клавиш
  onKeyPress(event) {
    //Если просто enter — завершаем редактирование
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();

      this.onEndEditing();

      if (typeof this.props.onKeyPress === "function") {
        this.props.onKeyPress(event);
      }
    }
  }

  //При потере фокуса
  onBlur(event) {
    this.setState({ wideEditAreaIsHidden: true });

    this.onEndEditing();

    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(event);
    }
  }

  //По завершению редактирования
  onEndEditing() {
    if (this.state.value !== this.props.value) {
      this.setState(
        { isReadOnly: false, wideEditAreaIsHidden: true },
        this.props.onChange(this.state.value)
      );
    } else {
      this.setState({ isReadOnly: false, wideEditAreaIsHidden: true }, () =>
        this.textarea.blur()
      );
    }
  }

  //Срабатывает при двойном клике
  showWideEditArea() {
    if (this.props.disabled || this.props.wideAreaDisabled) {
      return;
    }

    if (
      typeof this.props.height === "undefined" &&
      typeof this.props.width === "undefined"
    ) {
      return;
    }

    this.setState({
      wideEditAreaIsHidden: false,
    });
  }

  getClassName() {
    if (!this.state.wideEditAreaIsHidden) {
      return "textareaAutosize widearea";
    }

    return "textareaAutosize";
  }

  scrollWrapper(children) {
    //Хоть у нас тут и со скроллами — но может быть и без ограничений
    if (
      typeof this.props.height === "undefined" &&
      typeof this.props.width === "undefined"
    ) {
      //Если так — просто обернем в нужный класс
      return (
        <div
          className={
            "textareaScrollbar" +
            (!!this.props.isHaveError ? " error" : "") +
            (!!this.props.disabled ? " disabled" : "")
          }
        >
          {children}
        </div>
      );
    } else {
      //Если скроллы есть — вернем скроллированное
      return (
        <ReactCustomScroll
          trackYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              return (
                <span
                  {...restProps}
                  ref={elementRef}
                  className="Scrollbars-TrackY"
                />
              );
            },
          }}
          className={
            "textareaScrollbar" +
            (!!this.props.isHaveError ? " error" : "") +
            (!!this.props.disabled ? " disabled" : "")
          }
          noScrollX
          style={{
            height: this.props.height,
            width: this.props.width - (!!this.props.isStylable ? 0 : 8),
          }}
        >
          {children}
        </ReactCustomScroll>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {!!this.state.wideEditAreaIsHidden ? null : (
          <Blur
            onWheel={(event) => this.onBlur(event)}
            onClick={(event) => this.onBlur(event)}
            onContextMenu={(event) => this.onBlur(event)}
          />
        )}

        {this.scrollWrapper(
          <TextareaAutosize
            autoFocus={this.props.autoFocus}
            inputRef={(tag) => (this.textarea = tag)}
            style={Object.assign(
              {
                minHeight: !!this.props.height
                  ? !!this.state.isChrome
                    ? this.props.height -
                      (!!this.state.wideEditAreaIsHidden ? 7 : 1)
                    : this.props.height
                  : "100%",
                width: !!this.props.width
                  ? this.props.width -
                    (!!this.state.wideEditAreaIsHidden ? 22 : 15)
                  : "100%",
                marginLeft: !!this.state.wideEditAreaIsHidden
                  ? 0 + "px"
                  : -(!!this.props.isFixed ? 0 : this.props.scrollLeft) + "px",
                marginTop: !!this.state.wideEditAreaIsHidden
                  ? 0 + "px"
                  : -(!!this.props.isFixed ? 0 : this.props.scrollTop) + "px",
              },
              this.props.style
            )}
            spellCheck={this.props.spellCheck}
            className={this.getClassName()}
            placeholder={this.props.placeholder}
            //Задаем контент
            value={this.state.value}
            onFocus={this.props.onFocus}
            disabled={this.props.disabled}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => this.onChange(event)}
            //Обрабатываем двойной клик
            onDoubleClick={() => this.showWideEditArea()}
            //Обрабатываем контекстное меню
            onContextMenu={this.props.onContextMenu}
            //Обрабатываем потерю фокуса
            onBlur={(event) => this.onBlur(event)}
            onKeyPress={(event) => this.onKeyPress(event)}
            minRows={this.props.minRows}
            maxRows={this.props.maxRows}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scrollTop: state.scrollTop,
    scrollLeft: state.scrollLeft,
  };
};

export default connect(mapStateToProps)(TextareaScrollbar);
