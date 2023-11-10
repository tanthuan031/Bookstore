import * as React from "react";

class ButtonSkeleton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-skeleton">
                <div className="skeleton-button skeleton-animation"></div>
            </div>
        );
    }
}

export default ButtonSkeleton;
