import * as React from "react";

import { connect } from "react-redux";
import { mapStateToProps } from "../../../../utils/useSelector.js";

class RenderFilterRatingReviews extends React.Component {
    constructor(props) {
        super(props);
    }

    handleFilter = (ratingStar) => {
        this.props.handleFilter(ratingStar);
    };

    render() {
        let filterStar;
        if (this.props.product.count_rating_star.length === 0) {
            filterStar = (
                <ul className="product-filter-rating-star font-16px font-weight-semi">
                    <li className="cursor-pointer">
                        <u>5 stars (0)</u>
                    </li>
                    <li className="cursor-pointer">
                        <u>4 stars (0)</u>
                    </li>
                    <li className="cursor-pointer">
                        <u>3 stars (0)</u>
                    </li>
                    <li className="cursor-pointer">
                        <u>2 stars (0)</u>
                    </li>
                    <li className="cursor-pointer">
                        <u>1 star (0)</u>
                    </li>
                </ul>
            );
        } else {
            const oneStar = this.props.product.count_rating_star.find(
                (obj) => obj.rating_star === 1
            );
            const twoStar = this.props.product.count_rating_star.find(
                (obj) => obj.rating_star === 2
            );
            const threeStar = this.props.product.count_rating_star.find(
                (obj) => obj.rating_star === 3
            );
            const fourStar = this.props.product.count_rating_star.find(
                (obj) => obj.rating_star === 4
            );
            const fiveStar = this.props.product.count_rating_star.find(
                (obj) => obj.rating_star === 5
            );

            filterStar = (
                <ul className="product-filter-rating-star font-16px font-weight-medium">
                    <li
                        className={`cursor-pointer ${
                            this.props.product.current_filter_star === 5 &&
                            "text-blue font-weight-bold"
                        }`}
                        onClick={() => this.handleFilter(5)}
                    >
                        <u>5 stars ({fiveStar ? fiveStar.count : 0})</u>
                    </li>
                    <li
                        className={`cursor-pointer ${
                            this.props.product.current_filter_star === 4 &&
                            "text-blue font-weight-bold"
                        }`}
                        onClick={() => this.handleFilter(4)}
                    >
                        <u>4 stars ({fourStar ? fourStar.count : 0})</u>
                    </li>
                    <li
                        className={`cursor-pointer ${
                            this.props.product.current_filter_star === 3 &&
                            "text-blue font-weight-bold"
                        }`}
                        onClick={() => this.handleFilter(3)}
                    >
                        <u>3 stars ({threeStar ? threeStar.count : 0})</u>
                    </li>
                    <li
                        className={`cursor-pointer ${
                            this.props.product.current_filter_star === 2 &&
                            "text-blue font-weight-bold"
                        }`}
                        onClick={() => this.handleFilter(2)}
                    >
                        <u>2 stars ({twoStar ? twoStar.count : 0})</u>
                    </li>
                    <li
                        className={`cursor-pointer ${
                            this.props.product.current_filter_star === 1 &&
                            "text-blue font-weight-bold"
                        }`}
                        onClick={() => this.handleFilter(1)}
                    >
                        <u>1 star ({oneStar ? oneStar.count : 0})</u>
                    </li>
                </ul>
            );
        }
        return <>{filterStar}</>;
    }
}

export default connect(mapStateToProps, null)(RenderFilterRatingReviews);
