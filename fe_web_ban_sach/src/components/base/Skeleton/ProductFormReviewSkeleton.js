import * as React from "react";

import ButtonSkeleton from "./ButtonSkeleton";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector.js";

class ProductFormReviewSkeleton extends React.Component {
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
                <Card.Body>
                    <div className="mb-4">
                        <div className="skeleton-subtitle skeleton-animation mb-2" />
                        <div className="skeleton-main-title skeleton-animation" />
                    </div>
                    <div className="mb-4">
                        <div className="skeleton-subtitle skeleton-animation mb-2" />
                        <div className="skeleton-main-title skeleton-animation" />
                    </div>
                    <div>
                        <div className="skeleton-subtitle skeleton-animation mb-2" />
                        <div className="skeleton-main-title skeleton-animation" />
                    </div>
                </Card.Body>
                <Card.Footer>
                    <ButtonSkeleton />
                </Card.Footer>
            </Card>
        );
    }
}

export default connect(mapStateToProps, null)(ProductFormReviewSkeleton);
