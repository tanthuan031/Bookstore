import * as React from "react";

import NoReviewData from "../../../base/NoData/NoReviewData.js";
import ShowMoreText from "react-show-more-text";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../../utils/useSelector.js";
import moment from "moment";

class RenderListReviews extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let listReview;

        if (this.props.product.second_loading_review) {
            listReview = (
                <>
                    {[...Array(5)].map((item, index) => (
                        <div
                            key={index}
                            className={`${
                                index < 4 ? "mb-5" : ""
                            } app-skeleton`}
                        >
                            <div className="skeleton-subtitle skeleton-animation mb-3" />
                            <div className="skeleton-main-title skeleton-animation mb-2" />
                            <div className="skeleton-main-title skeleton-animation mb-2" />
                            <div className="skeleton-subtitle-2 skeleton-animation" />
                        </div>
                    ))}
                </>
            );
        } else {
            listReview =
                this.props.product.review_data.length > 0 ? (
                    <>
                        {this.props.product.review_data.map((item, idx) => (
                            <div key={`${item.review_title}-${idx}`}>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <span className="font-20px font-weight-semi mr-2">
                                            {item.review_title}
                                        </span>
                                        <span className="app-border-right" />
                                        <span className="text-grey font-14px ml-2">
                                            {item.rating_star === 1
                                                ? `${item.rating_star} star`
                                                : `${item.rating_star} stars`}
                                        </span>
                                    </div>
                                    {item.review_details && (
                                        <div className="mb-2 font-16px">
                                            <ShowMoreText
                                                lines={3}
                                                more="Show more"
                                                less="Show less"
                                                className="content-css"
                                                anchorClass="font-weight-semi text-blue"
                                                truncatedEndingComponent={
                                                    "... "
                                                }
                                            >
                                                {item.review_details}
                                            </ShowMoreText>
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-14px">
                                            {moment(item.review_date).format(
                                                "MMMM DD, YYYY"
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="app-divide-2 mb-2" />
                            </div>
                        ))}
                    </>
                ) : (
                    <NoReviewData />
                );
        }

        return <>{listReview}</>;
    }
}

export default connect(mapStateToProps, null)(RenderListReviews);
