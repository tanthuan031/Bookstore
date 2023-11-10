import * as React from "react";

import { Col, Row } from "react-bootstrap";
import {
  getBookById,
  getReviewByBookId,
} from "../../adapters/ProductAdapter/ProductAdapter.js";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import RenderAddToCart from "../../components/layouts/Product/Common/RenderAddToCart.js";
import RenderCustomerReviews from "../../components/layouts/Product/Common/RenderCustomerReviews.js";
import RenderFormReview from "../../components/layouts/Product/Common/RenderFormReview.js";
import RenderProductInformation from "../../components/layouts/Product/Common/RenderProductInformation.js";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../adapters/ProductAdapter/ProductAdapter.js";
import { mapStateToProps } from "../../utils/useSelector.js";
// import pageNotFound from "../../../assets/page_not_found.png";
import pageNotFound from "../../assets/page_not_found.png";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: 0,
      checkData: true,
    };
  }

  async componentDidMount() {
    await this.props.setReset();
    const bookId = await this.getIdBook();
    this.setState({ book_id: bookId });
    this.getBookById(bookId);
    window.addEventListener("storage", (e) => {
      const bookId = this.getIdBook();
      this.getBookById(bookId);
    });
  }

  getIdBook = () => {
    return Number.parseInt(window.location.pathname.split("/").at(-1));
  };

  getBookById = (bookId) => {
    getBookById(bookId).then((result) => {
      const { data } = result;
      if (!data.message) {
        this.getReviewByBookId(bookId);
        this.props.setPriceBook(data[0].final_price);
        const checkCart = localStorage.getItem("cart");
        if (checkCart) {
          const cart = JSON.parse(checkCart);
          const find = cart.find((element) => element.id === data[0].id);
          data[0].quantity = find ? find.quantity : 1;
          if (data[0].is_discount) {
            data[0].discount_price = parseFloat(
              (data[0].discount_price * data[0].quantity).toFixed(2)
            ).toString();
            data[0].final_price = data[0].discount_price;
          } else {
            data[0].book_price = parseFloat(
              (data[0].book_price * data[0].quantity).toFixed(2)
            ).toString();
            data[0].final_price = data[0].book_price;
          }
        } else {
          data[0].quantity = 1;
        }
        this.props.setDetailBook(data);
        this.handleCartWhenReload(data);
      } else {
        this.setState({ checkData: false });
      }
    });
  };

  handleCartWhenReload = async (data) => {
    const checkCart = localStorage.getItem("cart");
    if (checkCart) {
      const cart = JSON.parse(checkCart);
      const findIndex = cart.findIndex((element) => element.id === data[0].id);
      if (findIndex !== -1) {
        const newCart = await cart.map(
          (obj) => data.find((element) => element.id === obj.id) || obj
        );
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.handleSumCartQuantity(newCart);
      } else {
        this.handleSumCartQuantity(cart);
      }
    }
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

  getReviewByBookId = (bookId) => {
    getReviewByBookId({ id: bookId }).then((result) => {
      this.setReviews(result);
      this.props.setFirstLoadingReview(false);
    });
  };

  handlePerPage = async (event) => {
    const per_page = Number.parseInt(event.split(" ")[1]);
    this.handleStateData(1);
    await this.props.setPerPage(per_page);
    this.handleSetReviews();
  };

  handleFilter = async (ratingStar) => {
    this.handleStateData(1);
    if (ratingStar === this.props.product.current_filter_star) {
      await this.props.setCurrentFilterStar(0);
    } else {
      await this.props.setCurrentFilterStar(ratingStar);
    }
    this.handleSetReviews();
  };

  handleSort = async (event) => {
    this.handleStateData(1);
    switch (event) {
      case "Sort by date: newest to oldest":
        await this.props.setSortReview({
          sort_key: "Sort by date: newest to oldest",
          sort_value: "desc",
        });
        break;
      case "Sort by date: oldest to newest":
        await this.props.setSortReview({
          sort_key: "Sort by date: oldest to newest",
          sort_value: "asc",
        });
        break;
    }
    this.handleSetReviews();
  };

  handleSetReviews = async () => {
    const { rating_star, perPage, sortValue, sortKey, id } =
      this.handleStateAdvanced();
    const result = await getReviewByBookId({
      id,
      perPage,
      ratingStar: rating_star,
      sortValue,
      sortKey,
    });
    this.setReviews(result);
  };

  handleStateData = (pageNumber) => {
    this.props.setSecondLoadingReview(true);
    this.props.setReviewData([]);
    this.props.setCurrentPageReview(pageNumber);
  };

  handleStateAdvanced = () => {
    let rating_star;
    let perPage;
    let sortKey;
    let sortValue;
    const id = this.state.book_id;

    if (this.props.product.current_filter_star !== 0) {
      rating_star = this.props.product.current_filter_star;
    }

    if (this.props.product.per_page !== 5) {
      perPage = this.props.product.per_page;
    }

    if (this.props.product.sort_key && this.props.product.sort_value) {
      sortValue = this.props.product.sort_value;
      sortKey = "review_date";
    }

    return {
      id,
      rating_star,
      perPage,
      sortKey,
      sortValue,
    };
  };

  setReviews = (payload) => {
    const response = payload.data;
    const {
      data,
      count_rating_star,
      from,
      to,
      last_page,
      total,
      general_total,
    } = response;
    this.props.setReviewData(data);

    if (count_rating_star !== null) {
      this.props.setCountRatingStar(count_rating_star);
    }

    if (data.length > 0) {
      this.props.setFromReview(from);
      this.props.setToReview(to);
      this.props.setTotalPageReview(last_page);
      this.props.setTotalReview(total);
    } else {
      this.props.setFromReview(0);
      this.props.setToReview(0);
      this.props.setTotalPageReview(0);
      this.props.setTotalReview(0);
    }

    if (general_total !== null) {
      this.props.setAverageReview(
        parseFloat(general_total.average_rating_star).toFixed(2)
      );
    }
    this.props.setSecondLoadingReview(false);
  };

  render() {
    return (
      <main>
        {this.props.product.detail_book.length > 0 && (
          <Helmet>
            <title>
              {this.props.product.detail_book[0].book_title} | Bookworm
            </title>
          </Helmet>
        )}

        {this.state.checkData && (
          <section>
            {this.props.product.detail_book.length === 0 ? (
              <div className="app-skeleton">
                <div className="skeleton-subtitle-2 skeleton-animation" />
              </div>
            ) : (
              <p className="font-18px font-weight-bold">
                Category:{" "}
                <span className="text-blue">
                  {this.props.product.detail_book[0].category_name}
                </span>
              </p>
            )}
            <div className="app-divide mt-4 mb-5" />
            <Row className="mb-4">
              <Col
                lg={8}
                className={`${
                  this.props.app.width >= 992 ? "pl-0" : "px-0 mb-4"
                }`}
              >
                <RenderProductInformation />
              </Col>
              <Col
                lg={4}
                className={`${this.props.app.width >= 992 ? "pr-0" : "px-0"}`}
              >
                <RenderAddToCart
                  handleSumCartQuantity={this.handleSumCartQuantity}
                />
              </Col>
            </Row>
            <Row>
              <Col
                lg={8}
                className={`${
                  this.props.app.width >= 992 ? "pl-0" : "px-0 mb-4"
                }`}
              >
                <RenderCustomerReviews
                  handleStateData={this.handleStateData}
                  handleStateAdvanced={this.handleStateAdvanced}
                  setReviews={this.setReviews}
                  handlePerPage={this.handlePerPage}
                  handleSort={this.handleSort}
                  handleFilter={this.handleFilter}
                />
              </Col>
              <Col
                lg={4}
                className={`${this.props.app.width >= 992 ? "pr-0" : "px-0"}`}
              >
                <RenderFormReview bookId={this.state.book_id} />
              </Col>
            </Row>
          </section>
        )}

        {!this.state.checkData && (
          <div className="text-center">
            <img
              src={pageNotFound}
              width={this.props.app.width <= 530 ? "100%" : "500"}
              height={this.props.app.width <= 530 ? "100%" : "500"}
              alt="404 Page Not Found"
            />
            <p className="font-20px text-blue font-weight-bold pt-4 mt-4">
              Oops... The book with the corresponding id could not be found.
              Back to{" "}
              <Link className="text-red" to="/">
                home page
              </Link>
            </p>
          </div>
        )}
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
