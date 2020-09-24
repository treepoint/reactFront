import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Компоненты
import Logo from "../../Components/Logo/Logo";
import DesktopHeaderNavigation from "../../Components/DesktopHeaderNavigation/DesktopHeaderNavigation";
import MobileHeaderNavigation from "../../Components/MobileHeaderNavigation/MobileHeaderNavigation";
import ProjectSelecter from "../../Components/ProjectSelecter/ProjectSelecter"
import Spacer from "../../Components/Spacer/Spacer";
import LoginMenu from "../../Components/LoginMenu/LoginMenu";

//CSS
import "./Header.css";

class Header extends React.PureComponent {
  isNeedMobileVersion() {
    if (this.props.windowWidth < 700) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <div className="header">
        {!!this.isNeedMobileVersion() ? null : <Logo />}
        {!!this.isNeedMobileVersion() ? (
          <MobileHeaderNavigation />
        ) : (
            <DesktopHeaderNavigation />
          )}
        <Spacer />
        <ProjectSelecter />
        <LoginMenu />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    windowWidth: state.windowWidth
  };
};

export default connect(mapStateToProps)(Header);
