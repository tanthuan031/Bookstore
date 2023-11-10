import * as React from "react";

import { Modal, Tab, TabContainer } from "react-bootstrap";

import LoginForm from "../LoginForm/LoginForm.js";
import RegisterForm from "../RegisterForm/RegisterForm.js";
import { connect } from "react-redux";
import { hideModal } from "../../../../redux/actions/modal.action.js";
import { mapStateToProps } from "../../../../utils/useSelector.js";

class AuthenticateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_tab: "login",
            backdrop: true,
        };
    }

    hideModal = () => {
        this.props.hideModal();
    };

    setBackdrop = (value) => {
        this.setState({ backdrop: value });
    };

    handleAuthenticateForm = (action) => {
        this.setState({ active_tab: action });
    };

    render() {
        let action;

        if (this.state.active_tab === "login") {
            action = "Login";
        } else if (this.state.active_tab === "register") {
            action = "Register";
        }

        return (
            <Modal
                show={this.props.modal.status}
                onHide={this.hideModal}
                size="md"
                centered
                backdrop={this.state.backdrop}
                id="authenticate-form"
            >
                <Modal.Header closeButton>
                    <p className="font-weight-bold font-20px">{action}</p>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <TabContainer
                        activeKey={this.state.active_tab}
                        defaultActiveKey="login"
                    >
                        <Tab.Content>
                            <Tab.Pane eventKey="login">
                                <LoginForm
                                    handleAuthenticateForm={
                                        this.handleAuthenticateForm
                                    }
                                    setBackdrop={this.setBackdrop}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="register">
                                <RegisterForm
                                    handleAuthenticateForm={
                                        this.handleAuthenticateForm
                                    }
                                    setBackdrop={this.setBackdrop}
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </TabContainer>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateModal);
