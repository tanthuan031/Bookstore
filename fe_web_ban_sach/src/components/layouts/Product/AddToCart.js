import * as React from "react";

import { Button, Card, CardDeck } from "react-bootstrap";

import ControlQuantity from "../../../components/base/ControlQuantity/ControlQuantity.js";
import { Toast } from "../../../utils/toast.js";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../adapters/ProductAdapter/ProductAdapter.js";
import { mapStateToProps } from "../../../utils/useSelector.js";

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
    }

    setQuantity = (quantity) => {
        if (quantity === "") {
            this.handlePrice(1);
        } else {
            this.handlePrice(parseInt(quantity));
        }
        this.props.setQuantityBook(parseInt(quantity));
    };

    handleQuantity = (action) => {
        if (this.props.product.detail_book[0].quantity === "") {
            this.props.setQuantityBook(1);
            this.handlePrice(1);
            return;
        }
        const currentQuantity = Number.parseInt(
            this.props.product.detail_book[0].quantity
        );
        let quantity = 1;
        if (action === "minus" && currentQuantity > 1) {
            quantity = currentQuantity - 1;
            this.handlePrice(quantity);
            this.props.setQuantityBook(quantity);
        } else if (action === "add" && currentQuantity < 8) {
            quantity = currentQuantity + 1;
            this.handlePrice(quantity);
            this.props.setQuantityBook(quantity);
        }
    };

    addToCart = async () => {
        let finalCart = [];
        const checkCart = localStorage.getItem("cart");

        if (!checkCart) {
            finalCart.push(this.props.product.detail_book[0]);
            this.addNewCart(finalCart);
            this.props.handleSumCartQuantity(finalCart);
            return;
        }

        const cart = JSON.parse(checkCart);
        const findIndex = cart.findIndex(
            (element) => element.id === this.props.product.detail_book[0].id
        );

        if (findIndex !== -1) {
            if (
                cart[findIndex].quantity !==
                this.props.product.detail_book[0].quantity
            ) {
                finalCart = cart.map(
                    (obj) =>
                        this.props.product.detail_book.find(
                            (element) => element.id === obj.id
                        ) || obj
                );
                localStorage.setItem("cart", JSON.stringify(finalCart));
                this.notifyUpdateCart();
            } else {
                this.notifyNoUpdate();
            }
        } else {
            finalCart = [this.props.product.detail_book[0]].concat(cart);
            this.addNewCart(finalCart);
        }

        this.props.handleSumCartQuantity(finalCart);
    };

    addNewCart = async (data) => {
        localStorage.setItem("cart", JSON.stringify(data));
        this.notifyAddToCart();
    };

    notifyAddToCart = () => {
        Toast.fire({
            icon: "success",
            title: "Add to cart successfully",
            background: "#f0f9eb",
            color: "#a5dc86",
        });
    };

    notifyUpdateCart = () => {
        Toast.fire({
            icon: "success",
            title: "Update cart successfully",
            background: "#f0f9eb",
            color: "#a5dc86",
        });
    };

    notifyNoUpdate = () => {
        Toast.fire({
            icon: "warning",
            title: "Please update the quantity of this book",
            background: "#fef1e7",
            color: "#f8bb86",
        });
    };

    handlePrice = (quantity) => {
        const final_discount_price = parseFloat(
            (this.props.product.price_book * quantity).toFixed(2)
        );
        if (this.props.product.detail_book[0].is_discount) {
            this.props.setDiscountPriceBook(final_discount_price.toString());
        } else {
            this.props.setMainPriceBook(final_discount_price.toString());
        }
    };

    render() {
        return (
            <Card className={`${this.props.app.width <= 400 ? "mx-2" : ""}`}>
                <Card.Header className="bg-blue">
                    {!this.props.product.detail_book[0].is_discount ? (
                        <span className="text-red font-weight-bold font-20px">
                            ${this.props.product.detail_book[0].book_price}
                        </span>
                    ) : (
                        <>
                            <strike className="text-white">
                                <span className="font-16px font-weight-semi">
                                    $
                                    {
                                        this.props.product.detail_book[0]
                                            .book_price
                                    }
                                </span>
                            </strike>
                            &nbsp;
                            <span className="text-red font-weight-bold font-18px">
                                $
                                {
                                    this.props.product.detail_book[0]
                                        .discount_price
                                }
                            </span>
                        </>
                    )}
                </Card.Header>
                <Card.Body
                    className={`${this.props.app.width <= 400 ? "p-4" : "p-5"}`}
                >
                    <div className="mb-5">
                        <p className="mb-3 font-16px font-weight-bold">
                            Quantity
                        </p>
                        <ControlQuantity
                            quantity={
                                this.props.product.detail_book[0].quantity
                            }
                            setQuantity={this.setQuantity}
                            handleQuantity={this.handleQuantity}
                        />
                        <small className="text-red">
                            <i>*Quantity limit is 8</i>
                        </small>
                    </div>
                    <Button
                        variant="blue"
                        block
                        className="font-weight-bold font-16px"
                        onClick={() => this.addToCart()}
                    >
                        Add to Cart
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
