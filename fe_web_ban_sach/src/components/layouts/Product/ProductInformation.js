import * as React from "react";

import { Card, Col, Row } from "react-bootstrap";

import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector.js";

class ProductInformation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card
                id="app-product-information"
                className={`${this.props.app.width <= 400 ? "mx-2" : ""}`}
            >
                <Row className="m-0">
                    <Col
                        xs={4}
                        sm={3}
                        className={`product-column-image ${
                            this.props.app.width <= 400 ? "pt-4 px-4" : "px-0"
                        }`}
                    >
                        <div className="pi-image mb-4">
                            <div className="image-layout">
                                <img
                                    src={this.props.cover}
                                    alt={this.props.title}
                                />
                            </div>
                        </div>
                        <p className="text-right font-14px mb-4 ml-4">
                            By (author){" "}
                            <span className="font-weight-bold">
                                {this.props.author}
                            </span>
                        </p>
                    </Col>
                    <Col
                        xs={8}
                        sm={9}
                        className="px-0 product-column-information"
                    >
                        <div className="p-4">
                            <p className="mb-4 font-18px font-weight-bold">
                                {this.props.title}
                            </p>
                            <p className="font-weight-semi font-16px mb-2">
                                Book description
                            </p>
                            <p
                                className="font-16px"
                                dangerouslySetInnerHTML={{
                                    __html: this.props.summary,
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default connect(mapStateToProps, null)(ProductInformation);
