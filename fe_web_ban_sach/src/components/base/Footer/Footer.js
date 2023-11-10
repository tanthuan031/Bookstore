import * as React from "react";

import { Col, Navbar, Row } from "react-bootstrap";

import Logo64 from "../../../assets/logo_64_64.png";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar bg="light">
        <Row className="align-items-center">
          <Col className="px-2 flex-grow-0">
            <img src={Logo64} width="64" height="64" alt="Bookworm Logo" />
          </Col>
          <Col className="px-2">
            <p className="text-blue font-weight-bold font-20px">BOOKWORM</p>
            <p className="text-blue font-weight-semi font-14px">
              444/24 Cach Mang Thang 8 Str, Ward 11, District 3, Ho Chi Minh
              City
            </p>
            <p className="text-blue font-weight-semi font-14px">0903784019</p>
          </Col>
        </Row>
      </Navbar>
    );
  }
}

export default Footer;
