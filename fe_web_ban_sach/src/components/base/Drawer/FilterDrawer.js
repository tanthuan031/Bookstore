import * as React from "react";

import { FaFilter, FaTimes } from "react-icons/fa";

import RenderFilterData from "../../layouts/Shop/Common/RenderFilterData";
import { closeFilterDrawer } from "../../../redux/actions/drawer.action";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector.js";

class FilterDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDrawer = () => {
        this.props.closeFilterDrawer();
    };

    getFilterBooks = () => {
        this.props.getFilterBooks();
    };

    render() {
        return (
            <>
                {this.props.drawer.filter_status && (
                    <div
                        onClick={this.handleDrawer}
                        className="app-overlay cursor-pointer"
                    >
                        <div className="app-overlay-scope" />
                    </div>
                )}
                <nav
                    className={`app-nav-menu ${
                        this.props.drawer.filter_status
                            ? "filter amb-active"
                            : "amb-inactive"
                    }`}
                >
                    <div className="d-flex flex-column h-100 app-overflow p-4">
                        <p
                            onClick={this.handleDrawer}
                            className="text-red flex-grow-1 cursor-pointer mb-3"
                        >
                            <FaTimes />
                        </p>
                        <div className="d-flex align-items-center mb-4 ">
                            <p className="text-blue flex-grow-1 d-flex align-items-center">
                                <FaFilter />
                                <span className="flex-grow-1 font-weight-semi ml-2">
                                    Filter By
                                </span>
                            </p>
                            {this.props.shop.current_filter.length > 0 && (
                                <p
                                    onClick={() => this.props.resetFilter()}
                                    className="font-weight-bold flex-grow-1 text-right cursor-pointer"
                                >
                                    Reset filter
                                </p>
                            )}
                        </div>
                        <RenderFilterData
                            getFilterBooks={this.getFilterBooks}
                        />
                    </div>
                </nav>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeFilterDrawer: () => dispatch(closeFilterDrawer()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDrawer);
