import * as React from "react";

import { BsDash, BsPlus } from "react-icons/bs";
import { Button, FormControl, InputGroup } from "react-bootstrap";

class ControlQuantity extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = (event) => {
        const regexNumber =
            this.props.regex !== "with_zero"
                ? /^[1-8\b]\g{0,1}$/
                : /^[0-8\b]\g{0,1}$/;
        if (event.target.value === "" || regexNumber.test(event.target.value)) {
            this.props.setQuantity(event.target.value, event.target.id);
        }
    };

    preventNumericInput = ($event) => {
        const keyCode = $event.keyCode ? $event.keyCode : $event.which;
        if (keyCode < 48 || keyCode > 57) {
            $event.preventDefault();
        }
    };

    render() {
        return (
            <div className="app-text-field">
                <InputGroup>
                    <Button
                        variant="blue"
                        className={`d-flex align-items-center app-border-radius-right-0 ${
                            this.props.quantity == 1 &&
                            this.props.regex !== "with_zero"
                                ? "cursor-no-drop"
                                : ""
                        }`}
                        onClick={() =>
                            this.props.handleQuantity("minus", this.props.id)
                        }
                        disabled={
                            this.props.quantity == 1 &&
                            this.props.regex !== "with_zero"
                        }
                    >
                        <BsDash className="font-18px" />
                    </Button>
                    <FormControl
                        id={this.props.id}
                        className="text-center"
                        type="number"
                        value={this.props.quantity}
                        onChange={(e) => this.onChange(e)}
                        onKeyPress={this.preventNumericInput}
                    />
                    <Button
                        variant="blue"
                        className={`d-flex align-items-center app-border-radius-left-0 ${
                            this.props.quantity == 8 ? "cursor-no-drop" : ""
                        }`}
                        onClick={() =>
                            this.props.handleQuantity("add", this.props.id)
                        }
                        disabled={this.props.quantity == 8}
                    >
                        <BsPlus className="font-18px" />
                    </Button>
                </InputGroup>
            </div>
        );
    }
}

export default ControlQuantity;
