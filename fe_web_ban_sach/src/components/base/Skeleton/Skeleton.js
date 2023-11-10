import * as React from "react";

import { Card } from "react-bootstrap";

class Skeleton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="app-skeleton">
                <div className="skeleton-image">
                    <div className="skeleton-image-layout">
                        <div className="skeleton-image-layout-image skeleton-animation" />
                    </div>
                </div>
                <Card.Body>
                    <div className="skeleton-main-title skeleton-animation mb-2" />
                    <div className="skeleton-title skeleton-animation mb-2" />
                    <div className="skeleton-subtitle skeleton-animation" />
                </Card.Body>
                <Card.Footer>
                    <div className="skeleton-title skeleton-animation" />
                </Card.Footer>
            </Card>
        );
    }
}

export default Skeleton;
