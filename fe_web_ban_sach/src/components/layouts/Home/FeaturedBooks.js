import * as React from "react";

import ListProduct from "../../base/ListProduct/ListProduct.js";

class FeaturedBooks extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListProduct
                data={this.props.data}
                xl={3}
                lg={4}
                md={4}
                sm={6}
                xs={6}
                customClass="app-card-padding align-items-stretch"
            />
        );
    }
}

export default FeaturedBooks;
