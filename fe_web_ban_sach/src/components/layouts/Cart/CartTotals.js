import * as React from "react";

import { Button, Card } from "react-bootstrap";

import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector.js";
import { showModal } from "../../../redux/actions/modal.action.js";

class CartTotals extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePlaceOrder = () => {
        if (!this.props.app.isLogin) {
            this.props.showModal();
            return;
        }

        this.props.placeOrder();
    };

    render() {
        return (
            <Card>
                <Card.Header className="text-center bg-blue">
                    <h6 className="text-white font-weight-semi">Cart Totals</h6>
                </Card.Header>
                <Card.Body className="p-5 text-center">
                    <Card.Title className="mb-5">
                        <h3 className="font-weight-bold">
                            ${this.props.total_amount}
                        </h3>
                    </Card.Title>
                    <Button
                        onClick={() => this.handlePlaceOrder()}
                        variant="blue"
                        className={`font-weight-semi ${
                            this.props.app.totalQuantity === 0
                                ? "cursor-no-drop"
                                : ""
                        }`}
                        disabled={this.props.app.totalQuantity === 0}
                    >
                        Place Order
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showModal: () => dispatch(showModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTotals);
