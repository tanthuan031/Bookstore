import * as React from "react";

import { Button, ButtonGroup, DropdownButton } from "react-bootstrap";

import Chip from "../Chip/Chip.js";
import { NavLink } from "react-router-dom";
import { Toast } from "../../../utils/toast.js";
import { closeDrawer } from "../../../redux/actions/drawer.action.js";
import { connect } from "react-redux";
import { logout } from "../../../adapters/AuthAdapter/AuthAdapter.js";
import { mapStateToProps } from "../../../utils/useSelector.js";
import { menuData } from "../../../assets/data/menu.js";

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleModal = () => {
    this.props.handleModal();

    if (this.props.app.width <= 992) {
      this.props.closeDrawer();
    }
  };

  logout = async () => {
    const token = localStorage.getItem("token");
    const result = await logout(token);
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
        {menuData.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                `text-black font-weight-bold px-4 py-2 ${
                  this.props.app.width >= 992 ? "mr-3" : "mb-3"
                }` + (isActive ? " app-active-link" : " app-not-active-link")
              }
            >
              {item.title}
              {item.title === "Cart" && (
                <span>&nbsp;({this.props.app.totalQuantity})</span>
              )}
            </NavLink>
          );
        })}
        {this.props.app.isLogin ? (
          <DropdownButton
            as={ButtonGroup}
            variant="blue"
            align="center"
            title={this.props.app.user.full_name}
            id="dropdown-user"
            className="d-none d-lg-block"
          >
            <div className="p-3 d-flex flex-column justify-content-center align-items-center">
              <img
                src={this.props.app.user.avatar}
                width="60"
                height="60"
                alt={this.props.app.user.full_name}
                className="mb-3"
              />
              <Chip
                title={this.props.app.user.admin ? "ADMIN" : "USER"}
                background="bg-light-blue"
                color="text-blue"
              />
              <p className="font-weight-bold mt-3">
                {this.props.app.user.email}
              </p>
              <div className="app-border-top-card w-100 mt-3 pt-3 d-flex justify-content-center">
                <Button
                  onClick={() => this.logout()}
                  variant="blue"
                  className="font-weight-bold"
                >
                  Logout
                </Button>
              </div>
            </div>
          </DropdownButton>
        ) : (
          <a
            className={`text-black font-weight-bold px-4 py-2 cursor-pointer ${
              this.props.width >= 992 ? "mr-3" : ""
            }`}
            onClick={this.handleModal}
          >
            Login
          </a>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
