import * as React from "react";

import { Card } from "react-bootstrap";

class FilterSkeleton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="app-skeleton">
                <Card.Header>
                    <div className="skeleton-title skeleton-animation" />
                </Card.Header>
                <Card.Body>
                    <div className="skeleton-title skeleton-animation mb-4" />
                    <div className="skeleton-title skeleton-animation mb-4" />
                    <div className="skeleton-title skeleton-animation mb-4" />
                    <div className="skeleton-title skeleton-animation mb-4" />
                    <div className="skeleton-title skeleton-animation" />
                </Card.Body>
            </Card>
        );
    }
}

export default FilterSkeleton;
