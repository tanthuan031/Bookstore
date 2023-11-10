import * as React from "react";

import ControlQuantity from "../../base/ControlQuantity/ControlQuantity";

class CartListResponsive extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="acr-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="font-weight-semi w-50">Product</h6>
                        <a
                            href={`/shop/${this.props.id}`}
                            target="_blank"
                            className="d-flex flex-column justify-content-center w-50 align-items-end"
                        >
                            <img
                                src={this.props.book_cover_photo}
                                alt={this.props.book_title}
                                width="80"
                                height="120"
                                className="app-border-8px"
                            />
                            <div className="mt-4 text-right">
                                <p className="font-weight-bold font-18px card-title mb-1">
                                    {this.props.book_title}
                                </p>
                                <p className="font-16px font-weight-medium author_name">
                                    {this.props.author_name}
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-4">
                        <h6 className="w-50 font-weight-semi">Price</h6>
                        {!this.props.is_discount ? (
                            <div className="w-50 text-red font-weight-bold text-right font-18px">
                                $
                                {parseFloat(
                                    parseFloat(this.props.book_price) /
                                        this.props.quantity
                                )
                                    .toFixed(2)
                                    .toString()}
                            </div>
                        ) : (
                            <div className="w-50 text-right">
                                <div className="text-red font-weight-bold font-18px">
                                    $
                                    {parseFloat(
                                        parseFloat(this.props.discount_price) /
                                            this.props.quantity
                                    )
                                        .toFixed(2)
                                        .toString()}
                                </div>
                                <strike>
                                    <div className="text-grey font-weight-semi font-16px">
                                        ${this.props.book_price}
                                    </div>
                                </strike>
                            </div>
                        )}
                    </div>
                    <div className="d-flex align-items-center justify-content-between py-4">
                        <h6 className="w-50 font-weight-semi">Quantity</h6>
                        <div className="w-50">
                            <ControlQuantity
                                id={this.props.id}
                                key={this.props.key_control}
                                quantity={this.props.temp_quantity}
                                setQuantity={this.props.setQuantity}
                                regex="with_zero"
                                handleQuantity={this.props.handleQuantity}
                            />
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="w-50 font-weight-semi">Total</h6>
                        <div className="w-50 text-right text-red font-weight-bold font-18px">
                            {!this.props.is_discount
                                ? `$${parseFloat(this.props.book_price)
                                      .toFixed(2)
                                      .toString()}`
                                : `$${parseFloat(this.props.discount_price)
                                      .toFixed(2)
                                      .toString()}`}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CartListResponsive;
