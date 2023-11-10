import * as React from "react";

import { Col, Row } from "react-bootstrap";

import Skeleton from "./Skeleton.js";

class GridSkeleton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                {[...Array(this.props.quantity)].map((item, index) => (
                    <Col
                        xl={this.props.xl}
                        lg={this.props.lg}
                        md={this.props.md}
                        sm={this.props.sm}
                        xs={this.props.xs}
                        key={index}
                        className={this.props.customClass}
                    >
                        <Skeleton />
                    </Col>
                ))}
            </Row>
        );
    }
}

export default GridSkeleton;
