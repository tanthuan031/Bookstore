import * as React from "react";

import FeaturedBooks from "../FeaturedBooks.js";
import GridSkeleton from "../../../base/Skeleton/GridSkeleton";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../../utils/useSelector";

class RenderOnFeatured extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const onFeaturedBooks =
            this.props.home.tagFeaturedBooks.length === 0 ? (
                <GridSkeleton
                    xl={3}
                    lg={4}
                    md={4}
                    sm={6}
                    xs={6}
                    quantity={8}
                    customClass="app-card-padding align-items-stretch"
                />
            ) : (
                <FeaturedBooks data={this.props.home.tagFeaturedBooks} />
            );

        return (
            <div
                className={`${
                    this.props.app.width < 576
                        ? ""
                        : "py-3 px-5 app-border app-border-8px"
                }`}
            >
                {onFeaturedBooks}
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(RenderOnFeatured);
