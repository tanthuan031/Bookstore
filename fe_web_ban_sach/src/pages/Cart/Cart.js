import * as React from "react";

import { Col, Row } from "react-bootstrap";

import CartList from "../../components/layouts/Cart/CartList.js";
import CartTotals from "../../components/layouts/Cart/CartTotals.js";
import { Helmet } from "react-helmet";
import Notiflix from "notiflix";
import Swal from "sweetalert2";
import { Toast } from "../../utils/toast.js";
import { connect } from "react-redux";
import { deleteKeyValue } from "../../utils/deleteKeyValue.js";
import { mapStateToProps } from "../../utils/useSelector.js";
import orderApi from "../../api/orderApi.js";
import { setSumCartQuantity } from "../../redux/actions/app.action.js";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            total_amount: "0.00",
        };
    }

    componentDidMount() {
        this.getCart();
        window.addEventListener("storage", (e) => {
            this.getCart("listener");
        });
    }

    getCart = (value) => {
        const checkCart = localStorage.getItem("cart");
        let newCart = [];
        if (checkCart) {
            const cart = JSON.parse(checkCart);
            newCart = cart.map((obj) => ({
                ...obj,
                temp_quantity: obj.quantity.toString(),
            }));
            this.handleSumAmount(newCart);
            this.setState({ cart: [...newCart] });
        }
        if (value === "listener") this.handleSumCartQuantity(newCart);
    };

    handleSumAmount = (data) => {
        const initialValue = 0;
        const sumAmount = data.reduce((accumulator, current) => {
            return current.is_discount
                ? accumulator + parseFloat(current.discount_price)
                : accumulator + parseFloat(current.book_price);
        }, initialValue);
        this.setState({ total_amount: sumAmount.toFixed(2).toString() });
    };

    handleQuantity = (action, id) => {
        const findValue = this.state.cart.find((element) => element.id === id);
        if (findValue.temp_quantity === "") {
            this.setQuantityItemCart(1, id);
        }
        if (action === "minus") {
            this.setQuantityItemCart(
                (parseInt(findValue.temp_quantity) - 1).toString(),
                id
            );
        } else if (action === "add" && parseInt(findValue.temp_quantity) < 8) {
            this.setQuantityItemCart(
                (parseInt(findValue.temp_quantity) + 1).toString(),
                id
            );
        }
    };

    setQuantityItemCart = async (quantity, id) => {
        const findValue = this.state.cart.find((element) => element.id === id);
        const newValue = [];
        const new_quantity = quantity === "" ? "" : quantity;
        const temp_new_quantity =
            new_quantity === "" ? 1 : parseInt(new_quantity);
        const state_cart = JSON.parse(JSON.stringify(this.state.cart));
        if (temp_new_quantity > 0) {
            const main_quantity = findValue.quantity;

            const get_price = findValue.is_discount
                ? "discount_price"
                : "book_price";

            const book_price = parseFloat(
                parseFloat(findValue[get_price]) / main_quantity
            ).toFixed(2);
            findValue[get_price] = parseFloat(book_price * temp_new_quantity)
                .toFixed(2)
                .toString();
            findValue.final_price = findValue[get_price];
            findValue.quantity = temp_new_quantity;

            findValue.temp_quantity = new_quantity;
            newValue.push(findValue);
            const newCart = state_cart.map(
                (obj) =>
                    newValue.find((element) => element.id === obj.id) || obj
            );
            this.handleSumCartQuantity(newCart);
            this.setState({ cart: [...newCart] });
            this.handleSumAmount(newCart);
            this.handleLocalStorage(newCart);
            return;
        }
        const newCart = state_cart.filter((object) => {
            return object.id !== findValue.id;
        });
        this.handleSumCartQuantity(newCart);
        this.setState({ cart: [...newCart] });
        this.handleSumAmount(newCart);
        this.handleLocalStorage(newCart);
    };

    handleSumCartQuantity = (data) => {
        const initialValue = 0;
        let sumCartQuantity = 0;
        if (data.length > 0) {
            sumCartQuantity = data.reduce((accumulator, current) => {
                return accumulator + current.quantity;
            }, initialValue);
        }
        this.props.setSumCartQuantity(sumCartQuantity);
    };

    handleLocalStorage = (data) => {
        let cart_local_storage = JSON.parse(JSON.stringify(data));
        cart_local_storage = deleteKeyValue(cart_local_storage, [
            "temp_quantity",
        ]);
        if (data.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart_local_storage));
        } else {
            localStorage.removeItem("cart");
        }
    };

    placeOrder = async () => {
        const booleanArray = [];
        this.state.cart.forEach((item, index) => {
            if (item.temp_quantity === "") booleanArray.push(false);
            if (item.temp_quantity !== "") booleanArray.push(true);
        });
        const checkBooleanArray = booleanArray.every(
            (element) => element === true
        );

        if (!checkBooleanArray) {
            Toast.fire({
                icon: "warning",
                title: "Quantity is required",
                background: "#fef1e7",
                color: "#f8bb86",
            });
            return;
        }

        Notiflix.Block.hourglass("#app-cart-page", "Please wait...", {
            backgroundColor: "rgba(239, 244, 251, 0.91)",
            messageColor: "#739dd8",
            svgColor: "#739dd8",
            fontWeight: "700",
        });

        const temp_cart = JSON.parse(JSON.stringify(this.state.cart));
        const new_cart = [];
        temp_cart.forEach((item, index) => {
            if (item.is_discount) {
                new_cart.push({
                    book_id: item.id,
                    book_title: item.book_title,
                    quantity: item.quantity,
                    price: item.discount_price,
                });
            } else {
                new_cart.push({
                    book_id: item.id,
                    quantity: item.quantity,
                    price: item.book_price,
                });
            }
        });

        const create_cart = {
            user_id: this.props.app.user.id,
            order_amount: this.state.total_amount,
            cart: JSON.parse(JSON.stringify(new_cart)),
        };

        const response = await orderApi.createOrder(create_cart);

        if (
            response.status === 404 &&
            response.data.message === "Some books are not available"
        ) {
            const book_unvailable = response.data.data;

            let name = "";
            book_unvailable.forEach((element, index) => {
                name +=
                    index === 0
                        ? element.book_title
                        : `; ${element.book_title}`;
            });

            await Swal.fire({
                title: "<p class='text-red font-20px font-weight-bold'>Place order unsuccessfully</p>",
                html: `<p class='font-16px font-weight-semi'>Book titled <span class="font-weight-bold text-blue">${name}</span> was unavailable. So we will remove it from your cart</p>`,
                icon: "error",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: "#739dd8",
                confirmButtonText: "I understand",
            });

            const array_index = [];

            book_unvailable.forEach((item) => {
                array_index.push(item.book_id);
            });

            const newCart = this.state.cart.filter(
                (element) => !array_index.includes(element.id)
            );

            this.handleSumCartQuantity(newCart);
            this.setState({ cart: [...newCart] });
            this.handleSumAmount(newCart);
            this.handleLocalStorage(newCart);

            Notiflix.Block.remove("#app-cart-page");
        }

        if (response.status === "success") {
            let timer = 10;
            Notiflix.Block.remove("#app-cart-page");
            setTimeout(() => {
                Swal.close();
                window.location.href = "/";
                localStorage.removeItem("cart");
            }, 10000);
            Swal.fire({
                title: "<p class='text-blue font-20px font-weight-bold'>Place order successfully</p>",
                html: "<p className='font-16px font-weight-semi'>This page will reload after <b></b> seconds</p>",
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                timer: 10000,
                didOpen: () => {
                    const b = Swal.getHtmlContainer().querySelector("b");
                    b.textContent = 10;
                    timer = setInterval(() => {
                        b.textContent = Math.abs(
                            Swal.getTimerLeft() / 1000
                        ).toFixed(0);
                    }, 500);
                },
            });
        }
    };

    render() {
        return (
            <main>
                <Helmet>
                    <title>Cart | Bookworm</title>
                </Helmet>

                <section>
                    <p className="font-weight-bold font-20px">
                        Your Cart:{" "}
                        <span className="text-blue">
                            {this.props.app.totalQuantity > 1
                                ? `${this.props.app.totalQuantity} items`
                                : `${this.props.app.totalQuantity} item`}
                        </span>
                    </p>
                    <div className="app-divide mt-4 mb-5" />
                    <Row id="app-cart-page" className="mx-0">
                        <Col
                            lg={9}
                            className={`${
                                this.props.app.width <= 992
                                    ? "px-0 mb-4"
                                    : "pl-0"
                            }`}
                        >
                            <CartList
                                data={this.state.cart}
                                setQuantityItemCart={this.setQuantityItemCart}
                                handleQuantity={this.handleQuantity}
                            />
                        </Col>
                        <Col lg={3} className="px-0">
                            <CartTotals
                                total_amount={this.state.total_amount}
                                placeOrder={this.placeOrder}
                            />
                        </Col>
                    </Row>
                </section>
            </main>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSumCartQuantity: (data) => dispatch(setSumCartQuantity(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
