import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./page.css";

//Храним описание страниц пока так. Потом, возможно, вынесем в базу
const PAGES_SUBSCRIPTION = [
  {
    code: "home page",
    title: "Домашняя страница",
    content:
      "<div style='margin-top: 25vh'><center><p>Этот проект есть на Github <a href='https://github.com/treepoint/reactFront'>https://github.com/treepoint/reactFront</a>.</p>" +
      "<p>Спасибо за посещение!</p><center><div>"
  }
];

class Page extends React.Component {
  render() {
    let current_page = PAGES_SUBSCRIPTION.filter(
      page => page.code === this.props.pageCode
    );

    return (
      <div className="page">
        <div className="title">{current_page[0].title}</div>
        <div className="hr" />
        <div className="content">
          {/* Парсим HTML-контент страницы. Верстка включена в контент. Это было бы опасно, если бы мы
           *  позволяли редактировать контент из вне, но так — нет*/
          ReactHtmlParser(current_page[0].content)}
        </div>
      </div>
    );
  }
}

export default Page;
