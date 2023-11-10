import * as React from "react";

import FilterBy from "../../../layouts/Shop/FilterBy";
import FilterSkeleton from "../../../base/Skeleton/FilterSkeleton";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../../utils/useSelector";

class RenderFilterData extends React.Component {
    constructor(props) {
        super(props);
    }

    getFilterBooks = () => {
        this.props.getFilterBooks();
    };

    render() {
        let onFilterBy;

        if (this.props.filter.filters.length === 0) {
            {
                onFilterBy = [...Array(3)].map((item, index) => (
                    <div key={index} className={`${index < 2 ? "mb-4" : ""}`}>
                        <FilterSkeleton />
                    </div>
                ));
            }
        } else {
            onFilterBy = (
                <FilterBy
                    data={this.props.filter.filters}
                    getFilterBooks={this.getFilterBooks}
                />
            );
        }

        return <>{onFilterBy}</>;
    }
}

export default connect(mapStateToProps, null)(RenderFilterData);
