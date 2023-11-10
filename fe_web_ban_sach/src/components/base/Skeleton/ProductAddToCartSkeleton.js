import * as React from "react";

import ButtonSkeleton from "./ButtonSkeleton.js";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector.js";

class ProductAddToCartSkeleton extends React.Component {
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
                <Card.Header>
                    <div className="skeleton-title skeleton-animation" />
                </Card.Header>
                <Card.Body
                    className={`${this.props.app.width <= 400 ? "p-4" : "p-5"}`}
                >
                    <div className="mb-5">
                        <div className="skeleton-title skeleton-animation mb-3" />
                        <ButtonSkeleton />
                    </div>
                    <ButtonSkeleton />
                </Card.Body>
            </Card>
        );
    }
}

export default connect(mapStateToProps, null)(ProductAddToCartSkeleton);
