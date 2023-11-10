import * as React from "react";

import { Button, Col, Row } from "react-bootstrap";
import {
    getPopularBooks,
    getRecommendedBooks,
    getTopTenOnSaleBooks,
    mapDispatchToProps,
} from "../../adapters/HomeAdapter/HomeAdapter.js";

import ButtonSkeleton from "../../components/base/Skeleton/ButtonSkeleton.js";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import RenderOnFeatured from "../../components/layouts/Home/Common/RenderOnFeatured.js";
import RenderOnSale from "../../components/layouts/Home/Common/RenderOnSale.js";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils/useSelector.js";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.props.setReset();
        this.getOnSaleBooks();
        this.getRecommendedBooks();
    }

    getOnSaleBooks = () => {
        getTopTenOnSaleBooks().then((result) => {
            this.props.setTopTenOnSaleBooks(result.data);
        });
    };

    getRecommendedBooks = () => {
        this.props.setTagFeaturedBooks([]);
        this.props.setIsRecommended(true);
        getRecommendedBooks().then((result) => {
            this.props.setTagFeaturedBooks(result.data);
            this.props.setFirstLoading(false);
        });
    };

    getPopularBooks = () => {
        this.props.setTagFeaturedBooks([]);
        this.props.setIsRecommended(false);
        getPopularBooks().then((result) => {
            this.props.setTagFeaturedBooks(result.data);
        });
    };

    render() {
        return (
            <main>
                <Helmet>
                    <title>Home | Bookworm</title>
                </Helmet>

                <section className="mb-5">
                    <Row className="align-items-center mb-4">
                        <Col xs={6} className="app-card-padding">
                            <p className="font-weight-bold font-20px">
                                On Sale
                            </p>
                        </Col>
                        <Col
                            xs={6}
                            className="d-flex justify-content-end app-card-padding"
                        >
                            {this.props.home.topTenOnSaleBooks.length > 0 ? (
                                <Link to="/shop">
                                    <Button
                                        variant="blue"
                                        className="font-weight-bold font-16px d-flex align-items-center"
                                    >
                                        <span className="flex-grow-1">
                                            View All
                                        </span>
                                        &nbsp;
                                        <FaAngleRight />
                                    </Button>
                                </Link>
                            ) : (
                                <ButtonSkeleton />
                            )}
                        </Col>
                    </Row>
                    <RenderOnSale />
                </section>
                <section>
                    <div className="text-center mb-4">
                        <p className="font-weight-bold font-20px mb-4">
                            Featured Books
                        </p>
                        {!this.props.home.firstLoading ? (
                            <>
                                <Button
                                    variant={
                                        this.props.home.isRecommended
                                            ? "blue"
                                            : "link"
                                    }
                                    className="font-weight-bold font-16px"
                                    disabled={this.props.home.isRecommended}
                                    onClick={() => this.getRecommendedBooks()}
                                >
                                    Recommended
                                </Button>
                                <Button
                                    variant={
                                        this.props.home.isRecommended
                                            ? "link"
                                            : "blue"
                                    }
                                    disabled={!this.props.home.isRecommended}
                                    className="font-weight-bold font-16px"
                                    onClick={() => this.getPopularBooks()}
                                >
                                    Popular
                                </Button>
                            </>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center">
                                <ButtonSkeleton />
                                <span className="mx-2"></span>
                                <ButtonSkeleton />
                            </div>
                        )}
                    </div>
                    <RenderOnFeatured />
                </section>
            </main>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
