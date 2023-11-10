import * as React from "react";

import { Col, Row } from "react-bootstrap";

import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector.js";

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Row>
                    <Col
                        xs={12}
                        className={`${
                            this.props.app.width <= 400
                                ? "app-card-padding"
                                : ""
                        }`}
                    >
                        <p className="text-center font-18px font-weight-bold mb-4">
                            Welcome to BookWorm
                        </p>
                        <p className="font-weight-semi text-blue text-justify font-16px mb-4">
                            <i>
                                "Bookworm is an independent New York bookstore
                                and language school with locations in Manhattan
                                and Brooklyn. We specialize in travel books and
                                language classes."
                            </i>
                        </p>
                    </Col>
                    <Col
                        md={6}
                        className={`text-justify ${
                            this.props.app.width <= 768 ? "mb-4" : ";"
                        } ${
                            this.props.app.width <= 400
                                ? "app-card-padding"
                                : ""
                        }`}
                    >
                        <p className="font-weight-bold font-18px">Our Story</p>
                        <br />
                        <p className="font-weight-medium font-16px">
                            The name Bookworm was taken from the original name
                            for New York International Airport, which was
                            renamed JFK in December 1963.
                        </p>
                        <br />
                        <p className="font-weight-medium font-16px">
                            Our Manhattan store has just moved to the West
                            Village. Our new location is 170 7th Avenue South,
                            at the corner of Perry Street.
                        </p>
                        <br />
                        <p className="font-weight-medium font-16px">
                            From March 2008 through May 2016, the store was
                            located in the Flatiron District.
                        </p>
                    </Col>
                    <Col
                        md={6}
                        className={`text-justify ${
                            this.props.app.width <= 400
                                ? "app-card-padding"
                                : ""
                        }`}
                    >
                        <p className="font-weight-bold font-18px">Our Vision</p>
                        <br />
                        <p className="font-weight-medium font-16px">
                            One of the last travel bookstores in the country,
                            our Manhattan store carries a range of guidebooks
                            (all 10% off) to suit the needs and tastes of every
                            traveller and budget.
                        </p>
                        <br />
                        <p className="font-weight-medium font-16px">
                            We believe that a novel or travelogue can be just as
                            valuable a key to a place as any guidebook, and our
                            well-read, well-travelled staff is happy to make
                            reading recommendations for any traveller, book
                            lover, or gift giver.
                        </p>
                    </Col>
                </Row>
            </>
        );
    }
}

export default connect(mapStateToProps, null)(AboutUs);
