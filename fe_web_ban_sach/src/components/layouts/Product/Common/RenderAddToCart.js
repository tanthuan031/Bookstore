import * as React from "react";

import AddToCart from "../AddToCart.js";
import ProductAddToCartSkeleton from "../../../base/Skeleton/ProductAddToCartSkeleton.js";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../../utils/useSelector.js";

class RenderAddToCart extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSumCartQuantity = (data) => {
        this.props.handleSumCartQuantity(data);
    };

    render() {
        const addToCart =
            this.props.product.detail_book.length === 0 ? (
                <ProductAddToCartSkeleton />
            ) : (
                <AddToCart handleSumCartQuantity={this.handleSumCartQuantity} />
            );

        return <>{addToCart}</>;
    }
}

export default connect(mapStateToProps, null)(RenderAddToCart);
