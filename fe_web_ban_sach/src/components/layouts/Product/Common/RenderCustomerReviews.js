import * as React from "react";

import CustomerReviews from "../CustomerReviews";
import ProductCustomerReviewSkeleton from "../../../base/Skeleton/ProductCustomerReviewSkeleton";
import { connect } from "react-redux";
import { getReviewByBookId } from "../../../../adapters/ProductAdapter/ProductAdapter.js";
import { mapStateToProps } from "../../../../utils/useSelector.js";

class RenderCustomerReviews extends React.Component {
    constructor(props) {
        super(props);
    }

    handleStateData = async (pageNumber) => {
        this.props.handleStateData(pageNumber);
        const { rating_star, perPage, sortValue, sortKey, id } =
            this.props.handleStateAdvanced();
        const result = await getReviewByBookId({
            id,
            perPage,
            page: pageNumber,
            ratingStar: rating_star,
            sortValue,
            sortKey,
        });
        this.props.setReviews(result);
    };

    handlePerPage = (event) => {
        this.props.handlePerPage(event);
    };

    handleSort = (event) => {
        this.props.handleSort(event);
    };

    handleFilter = (ratingStar) => {
        this.props.handleFilter(ratingStar);
    };

    render() {
        const customerReviews = this.props.product.first_loading_review ? (
            <ProductCustomerReviewSkeleton />
        ) : (
            <CustomerReviews
                handleStateData={this.handleStateData}
                handlePerPage={this.handlePerPage}
                handleSort={this.handleSort}
                handleFilter={this.handleFilter}
            />
        );

        return <>{customerReviews}</>;
    }
}

export default connect(mapStateToProps, null)(RenderCustomerReviews);
