import * as React from "react";

import CartEmpty from "../../../assets/cart_empty.png";
import CartListResponsive from "./CartListResponsive";
import ControlQuantity from "../../../components/base/ControlQuantity/ControlQuantity.js";
import { Table } from "react-bootstrap";
import { bookCoverData } from "../../../assets/data/bookcover.js";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector.js";

class CartList extends React.Component {
  constructor(props) {
    super(props);
  }

  setQuantity = (quantity, id) => {
    this.props.setQuantityItemCart(quantity, parseInt(id));
  };

  handleQuantity = (action, id) => {
    this.props.handleQuantity(action, id);
  };

  render() {
    return (
      <>
        {this.props.app.width <= 768 && this.props.data.length > 0 && (
          <div className="app-cart app-cart-responsive">
            <div className="acr-heading py-4 bg-blue" />
            <div
              style={{
                height: this.props.data.length > 2 ? "920px" : "auto",
              }}
              className="acr-main"
            >
              {this.props.data.length > 0 &&
                this.props.data.map((item, index) => {
                  return (
                    <CartListResponsive
                      key={index}
                      book_cover_photo={bookCoverData[item.book_cover_photo]}
                      book_title={item.book_title}
                      author_name={item.author_name}
                      is_discount={item.is_discount}
                      book_price={item.book_price}
                      discount_price={item.discount_price}
                      quantity={item.quantity}
                      id={item.id}
                      key_control={index}
                      temp_quantity={item.temp_quantity.toString()}
                      setQuantity={this.setQuantity}
                      handleQuantity={this.handleQuantity}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {(this.props.app.width >= 768 ||
          (this.props.app.width <= 768 && this.props.data.length === 0)) && (
          <Table borderless={true} id="app-cart-list">
            <thead>
              <tr>
                <th colSpan="2">
                  <h6 className="text-white font-weight-semi">Product</h6>
                </th>
                <th>
                  <h6 className="text-white font-weight-semi">Price</h6>
                </th>
                <th colSpan={this.props.app.width <= 1200 ? 2 : 1}>
                  <h6 className="text-white font-weight-semi">Quantity</h6>
                </th>
                <th>
                  <h6 className="text-white font-weight-semi">Total</h6>
                </th>
              </tr>
            </thead>
            <tbody
              style={{
                height: this.props.data.length > 2 ? "298px" : "auto",
              }}
            >
              {this.props.data.length > 0 &&
                this.props.data.map((item, index) => {
                  return (
                    <tr key={index} className="app-cart">
                      <td colSpan="2">
                        <a
                          href={`/shop/${item.id}`}
                          target="_blank"
                          className="d-flex align-items-center"
                        >
                          <img
                            src={bookCoverData[item.book_cover_photo]}
                            alt={item.book_title}
                            width="80"
                            height="120"
                            className="app-border-8px"
                          />
                          <div className="flex-grow-1 ml-4">
                            <p className="font-weight-bold font-18px card-title mb-1">
                              {item.book_title}
                            </p>
                            <p className="font-16px font-weight-medium author_name">
                              {item.author_name}
                            </p>
                          </div>
                        </a>
                      </td>
                      <td>
                        {!item.is_discount ? (
                          <div className="text-red font-weight-bold font-18px">
                            $
                            {parseFloat(
                              parseFloat(item.book_price) / item.quantity
                            )
                              .toFixed(2)
                              .toString()}
                          </div>
                        ) : (
                          <>
                            <div className="text-red font-weight-bold font-18px">
                              $
                              {parseFloat(
                                parseFloat(item.discount_price) / item.quantity
                              )
                                .toFixed(2)
                                .toString()}
                            </div>
                            <strike>
                              <div className="text-grey font-weight-semi font-16px">
                                ${item.book_price}
                              </div>
                            </strike>
                          </>
                        )}
                      </td>
                      <td colSpan={this.props.app.width <= 1200 ? 2 : 1}>
                        <ControlQuantity
                          id={item.id}
                          key={index}
                          quantity={item.temp_quantity.toString()}
                          setQuantity={this.setQuantity}
                          regex="with_zero"
                          handleQuantity={this.handleQuantity}
                        />
                      </td>
                      <td>
                        <div className="text-red font-weight-bold font-18px">
                          {!item.is_discount
                            ? `$${parseFloat(item.book_price)
                                .toFixed(2)
                                .toString()}`
                            : `$${parseFloat(item.discount_price)
                                .toFixed(2)
                                .toString()}`}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {this.props.data.length === 0 && (
                <tr className="h-100 d-flex flex-column align-items-center justify-content-center p-5">
                  <td className="d-flex flex-column align-items-center justify-content-center">
                    <img src={CartEmpty} width="130" height="130" />
                    <p className="mt-3 text-blue font-weight-bold font-20px text-center">
                      Oops... Your cart is empty
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, null)(CartList);
