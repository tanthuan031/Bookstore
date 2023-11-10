import * as React from "react";

import Chip from "../../../base/Chip/Chip.js";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../../utils/useSelector.js";

class RenderCurrentValueFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let chipCategory;
        let chipAuthor;
        let chipRatingStar;
        let currentCategory;
        let currentAuthor;
        let currentRatingStar;

        if (this.props.shop.current_filter.length > 0) {
            this.props.shop.current_filter.forEach((element) => {
                if (element.title === "Category") {
                    chipCategory = (
                        <Chip
                            background="bg-light-blue"
                            color="text-blue"
                            title={element.item}
                        />
                    );
                    currentCategory = element.item;
                }
                if (element.title === "Author") {
                    chipAuthor = (
                        <Chip
                            background="bg-light-blue"
                            color="text-blue"
                            title={element.item}
                        />
                    );
                    currentAuthor = element.item;
                }
                if (element.title === "Rating Review") {
                    chipRatingStar = (
                        <Chip
                            background="bg-light-blue"
                            color="text-blue"
                            title={element.item}
                        />
                    );
                    currentRatingStar = element.item;
                }
            });
        }

        return (
            <>
                {this.props.app.width <= 576 ? (
                    <>
                        {this.props.shop.current_filter.length > 0 && (
                            <div
                                className={`${
                                    this.props.app.width <= 576 ? "" : "ml-3"
                                }`}
                            >
                                <span className="font-16px">Filter by (</span>
                                {currentCategory && (
                                    <span className="font-weight-bold text-blue font-16px">
                                        {currentCategory}
                                        {this.props.shop.current_filter.length >
                                            1 && <span>,&nbsp;</span>}
                                    </span>
                                )}
                                {currentAuthor && (
                                    <span className="font-weight-bold text-blue font-16px">
                                        {currentAuthor}{" "}
                                        {this.props.shop.current_filter.length >
                                            2 && <span>,&nbsp;</span>}
                                    </span>
                                )}
                                {currentRatingStar && (
                                    <span className="font-weight-bold text-blue font-16px">
                                        {currentRatingStar}
                                    </span>
                                )}
                                <span>)</span>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {this.props.shop.current_filter.length > 0 && (
                            <div className="ml-3 d-flex align-items-center">
                                <div>(&nbsp;</div>
                                <span className="font-16px">Filter by</span>
                                {chipCategory && (
                                    <span className="ml-2">{chipCategory}</span>
                                )}
                                {chipAuthor && (
                                    <span className="ml-2">{chipAuthor}</span>
                                )}
                                {chipRatingStar && (
                                    <span className="ml-2">
                                        {chipRatingStar}
                                    </span>
                                )}
                                <div>&nbsp;)</div>
                            </div>
                        )}
                    </>
                )}
            </>
        );
    }
}

export default connect(mapStateToProps, null)(RenderCurrentValueFilter);
