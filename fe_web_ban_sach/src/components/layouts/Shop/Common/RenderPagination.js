import * as React from "react";

import { Col, Row } from "react-bootstrap";

import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getBooks } from "../../../../adapters/ShopAdapter/ShopAdapter";
import { mapStateToProps } from "../../../../utils/useSelector";

class RenderPagination extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePageChange = async (pageNumber) => {
        this.props.handleStateData(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        const { category, author, ratingStar, perPage, sortValue, sortKey } =
            this.props.handleStateAdvanced();
        const response = await getBooks({
            page: pageNumber,
            perPage,
            category,
            author,
            ratingStar,
            sortValue,
            sortKey,
        });
        this.props.setBooks(response);
    };

    render() {
        let onPaginate;

        if (this.props.shop.total_page > 1) {
            onPaginate = (
                <Row className="pt-4 mt-4">
                    <Col className="d-flex px-0 justify-content-center">
                        <Pagination
                            activePage={this.props.shop.current_page}
                            itemsCountPerPage={Number.parseInt(
                                this.props.shop.per_page
                            )}
                            totalItemsCount={Number.parseInt(
                                this.props.shop.items_total
                            )}
                            pageRangeDisplayed={3}
                            prevPageText="Previous"
                            nextPageText="Next"
                            itemClass="page-item"
                            linkClass="page-link"
                            onChange={this.handlePageChange}
                        />
                    </Col>
                </Row>
            );
        }

        return <>{onPaginate}</>;
    }
}

export default connect(mapStateToProps, null)(RenderPagination);
