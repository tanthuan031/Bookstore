import * as React from "react";

import FormReview from "../FormReview";
import ProductFormReviewSkeleton from "../../../base/Skeleton/ProductFormReviewSkeleton";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../../utils/useSelector.js";

class RenderFormReview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const formReview = this.props.product.first_loading_review ? (
            <ProductFormReviewSkeleton />
        ) : (
            <FormReview bookId={this.props.bookId} />
        );

        return <>{formReview}</>;
    }
}

export default connect(mapStateToProps, null)(RenderFormReview);
