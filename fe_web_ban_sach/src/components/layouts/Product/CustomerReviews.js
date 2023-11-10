import * as React from "react";

import { Card, Col, Row } from "react-bootstrap";

import Chip from "../../base/Chip/Chip.js";
import Dropdown from "../../../components/base/Dropdown/Dropdown.js";
import Pagination from "react-js-pagination";
import RenderFilterRatingReview from "./Common/RenderFilterRatingReview.js";
import RenderListReviews from "./Common/RenderListReviews.js";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../adapters/ProductAdapter/ProductAdapter.js";
import { mapStateToProps } from "../../../utils/useSelector.js";
import { showData } from "../../../assets/data/show.js";
import { sortReviewData } from "../../../assets/data/review_sort.js";

class CustomerReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePageChange = (pageNumber) => {
    this.props.handleStateData(pageNumber);
  };

  handlePerPage = (event) => {
    this.props.handlePerPage(event);
  };

  handleSort = (event) => {
    this.props.handleSort(event);
  };

  handleFilter = (ratingStar) => {
    this.props.handleFilter(ratingStar);
  };

  render() {
    return (
      <Card
        className={`bg-light-blue ${this.props.app.width <= 400 ? "mx-2" : ""}`}
      >
        <div className="p-4">
          <div className="d-flex align-items-center mb-4">
            <div className="font-18px font-weight-bold">Customer Reviews</div>
            {this.props.product.current_filter_star !== 0 && (
              <>
                &nbsp;
                <div className="d-flex align-items-center text-grey font-16px">
                  <div>(&nbsp;Filtered by&nbsp;</div>
                  <Chip
                    background="bg-blue"
                    color="text-white"
                    title={`${this.props.product.current_filter_star} star`}
                  />
                  <div>&nbsp;)</div>
                </div>
              </>
            )}
          </div>
          <Row className="mb-4 mx-0">
            <Col
              sm={12}
              md={2}
              className={`pl-0 ${this.props.app.width <= 768 ? "mb-4" : ""}`}
            >
              <p className="font-20px font-weight-bold">
                {this.props.product.average}
              </p>
              <p className="font-16px font-weight-semi">
                <u>({this.props.product.total_review})</u>
              </p>
            </Col>
            <Col
              sm={12}
              md={10}
              className={`px-0 ${this.props.app.width <= 768 ? "ml-0" : ""}`}
            >
              <p className="font-20px font-weight-bold">Star</p>
              <RenderFilterRatingReview handleFilter={this.handleFilter} />
            </Col>
          </Row>
          <Row className="mx-0">
            <Col
              md={6}
              className={`px-0 ${this.props.app.width <= 768 ? "mb-4" : ""}`}
            >
              <p className="font-16px">
                Showing {this.props.product.from} - {this.props.product.to} of{" "}
                {this.props.product.total_review === 1
                  ? `${this.props.product.total_review} review`
                  : `${this.props.product.total_review} reviews`}{" "}
              </p>
            </Col>
            <Col
              md={6}
              className={`d-flex align-items-center px-0 ${
                this.props.app.width >= 768 ? "justify-content-end" : ""
              } ${this.props.app.width <= 420 ? "flex-wrap" : ""}`}
            >
              <Dropdown
                variant="blue"
                currentSelect={this.props.product.sort_key}
                selectData={sortReviewData}
                size="sm"
                customClass="mr-4 mb-4"
                customClassButtonDropdown="font-weight-bold"
                handleCurrentItem={this.handleSort}
              />
              <Dropdown
                variant="blue"
                currentSelect={`Show ${this.props.product.per_page}`}
                size="sm"
                selectData={showData}
                customClass="mb-4"
                customClassButtonDropdown="font-weight-bold"
                handleCurrentItem={this.handlePerPage}
              />
            </Col>
          </Row>
          <RenderListReviews />
          {this.props.product.total_page > 1 && (
            <div className="mt-4 d-flex justify-content-center">
              <Pagination
                activePage={this.props.product.current_page}
                itemsCountPerPage={Number.parseInt(this.props.product.per_page)}
                totalItemsCount={Number.parseInt(
                  this.props.product.total_review
                )}
                pageRangeDisplayed={3}
                prevPageText="Previous"
                nextPageText="Next"
                itemClass="page-item"
                linkClass="page-link"
                onChange={this.handlePageChange}
              />
            </div>
          )}
        </div>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReviews);
