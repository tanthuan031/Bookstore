import * as React from "react";

import { Card } from "react-bootstrap";
import Chip from "../Chip/Chip";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils/useSelector";

class userInformation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="p-3 d-flex flex-column justify-content-center align-items-center bg-light-blue">
                <img
                    src={this.props.app.user.avatar}
                    width="60"
                    height="60"
                    alt={this.props.app.user.full_name}
                    className="mb-3"
                />
                <Chip
                    title={this.props.app.user.admin ? "ADMIN" : "USER"}
                    background="bg-blue"
                    color="text-white"
                />
                <p className="font-weight-bold mt-3">
                    {this.props.app.user.full_name}
                </p>
                <p className="font-weight-bold mt-2">
                    {this.props.app.user.email}
                </p>
            </Card>
        );
    }
}

export default connect(mapStateToProps, null)(userInformation);
