import * as React from "react";

import { Card, Col, Row } from "react-bootstrap";

import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector";

class ProductInformationSkeleton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card
                className={`app-skeleton ${
                    this.props.app.width <= 400 ? "mx-2" : ""
                }`}
            >
                <Row className="m-0">
                    <Col
                        xs={4}
                        sm={3}
                        className={`product-column-image ${
                            this.props.app.width <= 400 ? "pt-4 px-4" : "px-0"
                        }`}
                    >
                        <div className="skeleton-image mb-4">
                            <div className="skeleton-image-layout">
                                <div className="skeleton-image-layout-image skeleton-product-image skeleton-animation " />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className="skeleton-title skeleton-animation" />
                        </div>
                    </Col>
                    <Col
                        xs={8}
                        sm={9}
                        className="px-0 product-column-information"
                    >
                        <div className="p-4">
                            <div className="skeleton-title skeleton-animation mb-4" />
                            <div className="skeleton-subtitle skeleton-animation mb-3" />
                            {[...Array(8)].map((item, index) => (
                                <div
                                    key={index}
                                    className={`skeleton-main-title skeleton-animation ${
                                        index < 8 ? "mb-2" : ""
                                    }`}
                                />
                            ))}
                            <br />
                            {[...Array(2)].map((item, index) => (
                                <div
                                    key={index}
                                    className={`skeleton-main-title skeleton-animation ${
                                        index < 1 ? "mb-2" : ""
                                    }`}
                                />
                            ))}
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default connect(mapStateToProps, null)(ProductInformationSkeleton);
