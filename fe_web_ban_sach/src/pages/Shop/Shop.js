import * as React from "react";

import { Button, Col, Row } from "react-bootstrap";
import {
  getBooks,
  getShopData,
} from "../../adapters/ShopAdapter/ShopAdapter.js";

import ButtonSkeleton from "../../components/base/Skeleton/ButtonSkeleton.js";
import Dropdown from "../../components/base/Dropdown/Dropdown.js";
import { FaFilter } from "react-icons/fa";
import FilterDrawer from "../../components/base/Drawer/FilterDrawer.js";
import { Helmet } from "react-helmet";
import RenderBookData from "../../components/layouts/Shop/Common/RenderBookData.js";
import RenderCurrentValueFilter from "../../components/layouts/Shop/Common/RenderCurrentValueFilter.js";
import RenderFilterData from "../../components/layouts/Shop/Common/RenderFilterData.js";
import RenderPagination from "../../components/layouts/Shop/Common/RenderPagination.js";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../adapters/ShopAdapter/ShopAdapter.js";
import { mapStateToProps } from "../../utils/useSelector.js";
import { showData } from "../../assets/data/show.js";
import { sortData } from "../../assets/data/sort.js";

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    await this.props.setReset();
    await this.props.setResetFilter();
    this.setState({ data: [] });
    this.getShopData();
  }

  getShopData = async () => {
    const { data, books } = await getShopData();
    this.props.setDataFilter(data);
    this.setBooks(books);
    this.props.setFirstLoading(false);
  };

  handlePerPage = async (event) => {
    const per_page = Number.parseInt(event.split(" ")[1]);
    this.handleStateData(1);
    await this.props.setCurrentPerPage(per_page);
    const { category, author, ratingStar, perPage, sortValue, sortKey } =
      this.handleStateAdvanced();
    const response = await getBooks({
      perPage,
      category,
      author,
      ratingStar,
      sortValue,
      sortKey,
    });
    this.setBooks(response);
  };

  handleSort = async (event) => {
    this.handleStateData(1);
    switch (event) {
      case "Sort by on sale":
        await this.props.setCurrentSort({
          sort_key: "Sort by on sale",
          sort_value: "desc",
        });
        break;
      case "Sort by popularity":
        await this.props.setCurrentSort({
          sort_key: "Sort by popularity",
          sort_value: "desc",
        });
        break;
      case "Sort by price: low to high":
        await this.props.setCurrentSort({
          sort_key: "Sort by price: low to high",
          sort_value: "asc",
        });
        break;
      case "Sort by price: high to low":
        await this.props.setCurrentSort({
          sort_key: "Sort by price: high to low",
          sort_value: "desc",
        });
        break;
    }
    const { category, author, ratingStar, perPage, sortValue, sortKey } =
      this.handleStateAdvanced();
    const response = await getBooks({
      perPage,
      category,
      author,
      ratingStar,
      sortValue,
      sortKey,
    });
    this.setBooks(response);
  };

  getFilterBooks = async () => {
    const { category, author, ratingStar, perPage, sortValue, sortKey } =
      this.handleStateAdvanced();
    this.handleStateData(1);
    const response = await getBooks({
      perPage,
      category,
      author,
      ratingStar,
      sortValue,
      sortKey,
    });
    this.setBooks(response);
  };

  resetFilter = async () => {
    await this.props.setResetFilterShop();
    const { category, author, ratingStar, perPage, sortValue, sortKey } =
      this.handleStateAdvanced();
    this.handleStateData(1);
    const response = await getBooks({
      perPage,
      category,
      author,
      ratingStar,
      sortValue,
      sortKey,
    });
    this.setBooks(response);
  };

  handleStateData = (pageNumber) => {
    this.props.setLoading(true);
    this.props.setBooks([]);
    this.props.setCurrentPage(pageNumber);
  };

  handleStateAdvanced = () => {
    let category;
    let author;
    let ratingStar;
    let perPage;
    let sortKey;
    let sortValue;
    const filterStateArray = [...this.props.shop.current_filter];
    const categoryIndex = filterStateArray.findIndex(
      (item) => item.title === "Category"
    );
    const authorIndex = filterStateArray.findIndex(
      (item) => item.title === "Author"
    );
    const ratingStarIndex = filterStateArray.findIndex(
      (item) => item.title === "Rating Review"
    );
    if (categoryIndex !== -1) {
      category = filterStateArray[categoryIndex].item;
    }
    if (authorIndex !== -1) {
      author = filterStateArray[authorIndex].item;
    }
    if (ratingStarIndex !== -1) {
      ratingStar = Number.parseInt(
        filterStateArray[ratingStarIndex].item.split(" ")[0]
      );
    }
    if (this.props.shop.per_page !== 5) {
      perPage = this.props.shop.per_page;
    }
    if (this.props.shop.sort_key && this.props.shop.sort_value) {
      sortValue = this.props.shop.sort_value;
      switch (this.props.shop.sort_key) {
        case "Sort by on sale":
          sortKey = "on_sale";
          break;
        case "Sort by popularity":
          sortKey = "on_popularity";
          break;
        case "Sort by price: low to high":
        case "Sort by price: high to low":
          sortKey = "price";
          break;
        default:
          sortKey = "on_sale";
      }
    }
    return {
      category,
      author,
      ratingStar,
      perPage,
      sortValue,
      sortKey,
    };
  };

  handleDrawer = () => {
    this.props.openFilterDrawer();
  };

  setBooks = (payload) => {
    const { data, meta } = payload.data;
    const { total, last_page, from, to } = meta;
    if (data.length > 0) {
      this.props.setIndexItem({ from, to });
      this.props.setTotalPage(last_page);
    } else {
      this.props.setIndexItem({ from: 0, to: 0 });
      this.props.setTotalPage(0);
    }
    this.props.setItemsTotal(total);
    this.props.setLoading(false);
    this.props.setBooks(data);
  };

  render() {
    return (
      <main>
        <Helmet>
          <title>Shop | Bookworm</title>
        </Helmet>

        <section>
          <div
            className={`d-flex ${
              this.props.app.width <= 576
                ? "align-items-start flex-column"
                : "align-items-center"
            }`}
          >
            <p className="text-center font-18px font-weight-bold">Books</p>
            <RenderCurrentValueFilter />
          </div>
          <div className="app-divide mt-4 mb-5" />
          <Row>
            <Col lg={3} className="pl-0 d-none d-lg-block">
              <div className="mb-4 d-flex align-items-center">
                <p className="text-blue d-flex align-items-center flex-grow-1">
                  <FaFilter />
                  <span className="flex-grow-1 font-16px font-weight-semi ml-2">
                    Filter By
                  </span>
                </p>
                {this.props.shop.current_filter.length > 0 && (
                  <p
                    onClick={() => this.resetFilter()}
                    className="cursor-pointer text-right flex-grow-1"
                  >
                    Reset filter
                  </p>
                )}
              </div>
              <RenderFilterData getFilterBooks={this.getFilterBooks} />
            </Col>
            <Col
              lg={9}
              className={`pr-0 ${this.props.app.width <= 992 ? "pl-0" : ""} ${
                this.props.app.width <= 400 ? "mx-2" : ""
              }`}
            >
              <Row className="align-items-center mb-2">
                <Col
                  xs={12}
                  sm={6}
                  className={`${
                    this.props.app.width <= 576 ? "mb-3 pl-2" : ""
                  }`}
                >
                  <p className="font-16px">
                    Showing {this.props.shop.from} - {this.props.shop.to} of{" "}
                    {this.props.shop.items_total > 1 ? (
                      <span>
                        {this.props.shop.items_total}
                        &nbsp;books
                      </span>
                    ) : (
                      <span>
                        {this.props.shop.items_total}
                        &nbsp;book
                      </span>
                    )}
                  </p>
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  className={`d-flex pr-2 ${
                    this.props.app.width <= 576
                      ? "justify-content-start pl-1"
                      : "justify-content-end"
                  }`}
                >
                  {this.props.shop.first_loading ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <ButtonSkeleton />
                      <span className="mx-2"></span>
                      <ButtonSkeleton />
                    </div>
                  ) : (
                    <>
                      <Dropdown
                        variant="blue"
                        currentSelect={this.props.shop.sort_key}
                        selectData={sortData}
                        size="sm"
                        customClass="mr-2"
                        customClassButtonDropdown="font-weight-bold"
                        handleCurrentItem={this.handleSort}
                      />
                      <Dropdown
                        variant="blue"
                        currentSelect={`Show ${this.props.shop.per_page}`}
                        size="sm"
                        selectData={showData}
                        customClassButtonDropdown="font-weight-bold"
                        handleCurrentItem={this.handlePerPage}
                      />
                    </>
                  )}
                </Col>
              </Row>
              <RenderBookData />
              <RenderPagination
                handleStateAdvanced={this.handleStateAdvanced}
                handleStateData={this.handleStateData}
                setBooks={this.setBooks}
              />
            </Col>
          </Row>
        </section>
        <Button
          onClick={() => this.handleDrawer()}
          className="app-filter-button-shop"
          variant="blue"
        >
          <FaFilter />
        </Button>
        <FilterDrawer
          getFilterBooks={this.getFilterBooks}
          resetFilter={this.resetFilter}
        />
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
