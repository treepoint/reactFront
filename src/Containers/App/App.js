import React from "react";
import Header from "../Header/Header";
import Registration from "../Registration/Registration";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <body>
        <Header />
        <Registration />
      </body>
    );
  }
}
export default App;
