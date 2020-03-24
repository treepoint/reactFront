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
      isChrome: this.isChrome()
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      if (!this.state.isReadOnly && this.state.value !== this.props.value) {
        this.setState({ value: this.props.value });
      }
      this.setState({ isReadOnly: false });
    }
  }

  componentWillUnmount() {
    this.onEndEditing();
  }

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

  onKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();

      this.onEndEditing();

      if (typeof this.props.onKeyPress === "function") {
        this.props.onKeyPress(event);
      }
    }
  }

  onBlur(event) {
    this.setState({ wideEditAreaIsHidden: true });

    this.onEndEditing();

    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(event);
    }
  }

  onEndEditing() {
    if (this.state.value !== this.props.value) {
      this.setState(
        { isReadOnly: false, wideEditAreaIsHidden: true },
        this.props.onChange(this.state.value)
      );
    }

    this.setState({ isReadOnly: false, wideEditAreaIsHidden: true });
    this.textarea.blur();
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
      wideEditAreaIsHidden: false
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
      return <div className="textareaScrollbar">{children}</div>;
    } else {
      //Если скроллы есть — вернем скроллированное
      return (
        <ReactCustomScroll
          trackYProps={{
            renderer: props => {
              const { elementRef, ...restProps } = props;
              return (
                <span
                  {...restProps}
                  ref={elementRef}
                  className="Scrollbars-TrackY"
                />
              );
            }
          }}
          className={
            "textareaScrollbar" + (!!this.props.isHaveError ? " error" : "")
          }
          noScrollX
          style={{
            height: this.props.height,
            width: this.props.width
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
            onWheel={event => this.onBlur(event)}
            onClick={event => this.onBlur(event)}
            onContextMenu={event => this.onBlur(event)}
          />
        )}

        {this.scrollWrapper(
          <TextareaAutosize
            autoFocus={this.props.autoFocus}
            inputRef={tag => (this.textarea = tag)}
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
                    (!!this.state.wideEditAreaIsHidden ? 14 : 7)
                  : "100%",
                marginLeft: !!this.state.wideEditAreaIsHidden
                  ? 0 + "px"
                  : -(!!this.props.isFixed ? 0 : this.props.scrollLeft) + "px",
                marginTop: !!this.state.wideEditAreaIsHidden
                  ? 0 + "px"
                  : -(!!this.props.isFixed ? 0 : this.props.scrollTop) + "px"
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
            onClick={event => event.stopPropagation()}
            onChange={event => this.onChange(event)}
            //Обрабатываем двойной клик
            onDoubleClick={() => this.showWideEditArea()}
            //Обрабатываем контекстное меню
            onContextMenu={this.props.onContextMenu}
            //Обрабатываем потерю фокуса
            onBlur={event => this.onBlur(event)}
            onKeyPress={event => this.onKeyPress(event)}
            minRows={this.props.minRows}
            maxRows={this.props.maxRows}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    scrollTop: state.scrollTop,
    scrollLeft: state.scrollLeft
  };
};

export default connect(mapStateToProps)(TextareaScrollbar);
