import * as React from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class CardProduct extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Link to={`/shop/${this.props.productId}`}>
                <Card className="app-card-product h-100">
                    <div className="card-image">
                        <div className="card-image-layout">
                            <Card.Img
                                variant="top"
                                src={this.props.productImage}
                            />
                        </div>
                    </div>
                    <Card.Body className="d-flex flex-column text-black">
                        <p className="font-weight-bold font-18px card-title mb-auto">
                            {this.props.productName}
                        </p>
                        <Card.Text className="font-weight-semi font-16px mt-1">
                            {this.props.productAuthor}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        {!this.props.productIsDiscount ? (
                            <span className="text-red font-weight-bold font-18px">
                                ${this.props.productBookPrice}
                            </span>
                        ) : (
                            <>
                                <strike>
                                    <span className="text-grey font-weight-semi font-16px">
                                        ${this.props.productBookPrice}
                                    </span>
                                </strike>
                                &nbsp;
                                <span className="text-red font-weight-bold font-18px">
                                    ${this.props.productDiscountPrice}
                                </span>
                            </>
                        )}
                    </Card.Footer>
                </Card>
            </Link>
        );
    }
}

export default CardProduct;
