import * as React from "react";

import { Card, Col, Row } from "react-bootstrap";

import ButtonSkeleton from "./ButtonSkeleton";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector.js";

class ProductCustomerReviewSkeleton extends React.Component {
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
                <div className="p-4">
                    <div className="skeleton-title skeleton-animation mb-4" />
                    <div className="mb-4">
                        <div className="skeleton-subtitle skeleton-animation mb-2" />
                        <div className="skeleton-main-title skeleton-animation" />
                    </div>
                    <Row className="align-items-center mb-4 mx-0">
                        <Col
                            md={6}
                            className={`px-0 ${
                                this.props.app.width >= 768 ? "" : "mb-4"
                            }`}
                        >
                            <div className="skeleton-subtitle skeleton-animation mb-2" />
                        </Col>
                        <Col
                            md={6}
                            className={`d-flex align-items-center px-0 ${
                                this.props.app.width >= 768
                                    ? "justify-content-end"
                                    : ""
                            }`}
                        >
                            <ButtonSkeleton />
                            <span className="mx-2" />
                            <ButtonSkeleton />
                        </Col>
                    </Row>
                    {[...Array(5)].map((item, index) => (
                        <div
                            key={index}
                            className={`${index < 4 ? "mb-5" : ""}`}
                        >
                            <div className="skeleton-subtitle skeleton-animation mb-3" />
                            <div className="skeleton-main-title skeleton-animation mb-2" />
                            <div className="skeleton-main-title skeleton-animation mb-2" />
                            <div className="skeleton-subtitle-2 skeleton-animation" />
                        </div>
                    ))}
                </div>
            </Card>
        );
    }
}

export default connect(mapStateToProps, null)(ProductCustomerReviewSkeleton);
