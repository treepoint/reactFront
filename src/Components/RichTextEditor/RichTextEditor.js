import React from "react";
//CKEditor
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//CSS
import "./RichTextEditor.css";

const editorConfiguration = {
  height: 400,
  width: 600
};

class RichTextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  componentWillUnmount() {
    this.onBlur();
  }

  onBlur(event) {
    //При закрытии окна — отправим
    if (this.state.data !== this.props.data) {
      this.props.onChange(this.state.data);
    }

    if (typeof this.props.onBlur === "function") {
      this.props.onBlur(event);
    }
  }

  onChange(editor) {
    const data = editor.getData();

    this.setState({ data });
  }

  render() {
    return (
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        placeholder="Описание задачи"
        data={this.props.data}
        onChange={(event, editor) => {
          this.onChange(editor);
        }}
      />
    );
  }
}

export default RichTextEditor;
