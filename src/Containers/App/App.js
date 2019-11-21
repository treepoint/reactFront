import React from "react";
import ReduxHeader from "../Header/ReduxHeader";
import ReduxRegistration from "../Registration/ReduxRegistration";
import "./app.css";

class App extends React.Component {
  render() {
    return (
      <body>
        <ReduxHeader />

        {!!this.props.isRegistrationModalWindowActive ? (
          <ReduxRegistration />
        ) : (
          ""
        )}
      </body>
    );
  }
}
export default App;
