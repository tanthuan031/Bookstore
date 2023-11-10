import * as React from "react";

import { Button } from "react-bootstrap";
import Menu from "../Menu/Menu.js";
import { Toast } from "../../../utils/toast.js";
import UserInformation from "../UserInformation/UserInformation.js";
import { closeDrawer } from "../../../redux/actions/drawer.action.js";
import { connect } from "react-redux";
import { logout } from "../../../adapters/AuthAdapter/AuthAdapter.js";
import { mapStateToProps } from "../../../utils/useSelector.js";
import { showModal } from "../../../redux/actions/modal.action.js";

class Drawer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleModal = () => {
    this.props.showModal();
  };

  handleDrawer = () => {
    this.props.closeDrawer();
  };

  logout = async () => {
    const token = localStorage.getItem("token");
    logout(token);
    // eslint-disable-next-line
    if (result.message === "Logout Successfully") {
      Toast.fire({
        icon: "success",
        title: "Logout successfully",
        background: "#f0f9eb",
        color: "#a5dc86",
      });
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      Toast.fire({
        icon: "error",
        title: "Logout unsuccessfully",
        background: "#fde8e8",
        color: "#f27474",
      });
    }
  };

  render() {
    return (
      <>
        {this.props.drawer.status && (
          <div
            onClick={this.handleDrawer}
            className="app-overlay cursor-pointer"
          >
            <div className="app-overlay-scope" />
          </div>
        )}
        <nav
          className={`app-nav-menu d-flex flex-column ${
            this.props.drawer.status ? "amb-active" : "amb-inactive"
          }`}
        >
          <div className="p-4 flex-grow-1">
            <div className="d-flex flex-column">
              <Menu handleModal={this.handleModal} />
            </div>
            {this.props.app.isLogin && (
              <div>
                <UserInformation />
              </div>
            )}
          </div>
          {this.props.app.isLogin && (
            <div className="p-4">
              <Button
                variant="blue"
                block
                className="font-weight-bold"
                onClick={() => this.logout()}
              >
                Logout
              </Button>
            </div>
          )}
        </nav>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    closeDrawer: () => dispatch(closeDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
