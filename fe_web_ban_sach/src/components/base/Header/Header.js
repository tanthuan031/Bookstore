import * as React from "react";
import * as style from "@dicebear/micah";

import { Button, Col, Nav, Navbar, Row } from "react-bootstrap";
import {
  setLogin,
  setSumCartQuantity,
  setUser,
} from "../../../redux/actions/app.action.js";

import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo40 from "../../../assets/logo_40_40.png";
import Menu from "../Menu/Menu.js";
import { connect } from "react-redux";
import { createAvatar } from "@dicebear/avatars";
import { modal_OPEN_MODAL } from "../../../redux/types/modal.type.js";
import { openDrawer } from "../../../redux/actions/drawer.action.js";
import { userInformation } from "../../../adapters/AuthAdapter/AuthAdapter";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkLogin();
    if (!window.location.pathname.includes("/shop")) {
      this.handleSumCartQuantity();
    }
  }

  checkLogin = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const result = await userInformation(token);
      if (result.status === "success") {
        const user = { ...result.data };
        const random = (Math.random() + 1).toString(36).substring(7);
        const svg = createAvatar(style, {
          seed: random,
          dataUri: true,
          baseColor: ["mellow"],
        });
        user.avatar = svg;
        await this.props.setUser(user);
        this.props.setLogin();
      }

      if (result.status === 401) {
        localStorage.removeItem("token");
        console.clear();
      }
    }
  };

  handleSumCartQuantity = () => {
    const checkCart = localStorage.getItem("cart");
    let sumCartQuantity = 0;
    if (checkCart) {
      const cart = JSON.parse(checkCart);
      const initialValue = 0;
      sumCartQuantity = cart.reduce((accumulator, current) => {
        return accumulator + current.quantity;
      }, initialValue);
    }
    this.props.setSumCartQuantity(sumCartQuantity);
  };

  handleModal = () => {
    this.props.showModal();
  };

  handleDrawer = () => {
    this.props.openDrawer();
  };

  render() {
    return (
      <Navbar bg="light" sticky="top">
        <Navbar.Brand>
          <Link to="/">
            <Row className="align-items-center">
              <Col className="px-0">
                <img
                  src={Logo40}
                  width="100%"
                  height="100%"
                  alt="Bookworm Logo"
                  className="ml-1"
                />
              </Col>
              <Col className="px-0 ml-3">
                <p className="text-blue font-weight-bold font-20px">BOOKWORM</p>
              </Col>
            </Row>
          </Link>
        </Navbar.Brand>
        <Button
          id="app-hamburger-button"
          variant="blue"
          className="py-2 ml-auto"
          onClick={this.handleDrawer}
        >
          <FaBars className="text-white mb-1" />
        </Button>
        <Nav id="app-menu-header" className="ml-auto">
          <Menu handleModal={this.handleModal} />
        </Nav>
      </Navbar>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch({ type: modal_OPEN_MODAL }),
    openDrawer: () => dispatch(openDrawer()),
    setLogin: () => dispatch(setLogin()),
    setUser: (data) => dispatch(setUser(data)),
    setSumCartQuantity: (data) => dispatch(setSumCartQuantity(data)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
