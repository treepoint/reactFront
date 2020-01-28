import React from "react";
import Logo from "../../Components/Logo/Logo";
import HeaderNavigation from "../../Components/HeaderNavigation/HeaderNavigation";
import Spacer from "../../Components/Spacer/Spacer";
import HeaderWarning from "../../Components/HeaderWarning/HeaderWarning";
import LoginMenu from "../../Components/LoginMenu/LoginMenu";
import "./Header.css";

class Header extends React.PureComponent {
  render() {
    return (
      <div className="header">
        <Logo />
        <HeaderNavigation />
        <Spacer />
        <HeaderWarning
          message={
            <React.Fragment>
              <p>
                Веб-приложение находится в разработке. Рекомендуемый браузер —
                Firefox.
              </p>
              <p>Номер сборки: 0.6.3"</p>
            </React.Fragment>
          }
        />
        <LoginMenu />
      </div>
    );
  }
}

export default Header;
