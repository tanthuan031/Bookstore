import * as React from "react";

import { Dropdown as BootstrapDropdown } from "react-bootstrap";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCurrentItem = (e) => {
        this.props.handleCurrentItem(e);
    };

    render() {
        return (
            <BootstrapDropdown
                onSelect={this.handleCurrentItem}
                className={this.props.customClass}
            >
                <BootstrapDropdown.Toggle
                    variant={this.props.variant}
                    size={this.props.size}
                    className={this.props.customClassButtonDropdown}
                >
                    {this.props.currentSelect}
                </BootstrapDropdown.Toggle>
                <BootstrapDropdown.Menu>
                    {this.props.selectData.map((item, index) => {
                        return (
                            <BootstrapDropdown.Item
                                eventKey={item.title}
                                key={index}
                                active={item.title === this.props.currentSelect}
                            >
                                {item.title}
                            </BootstrapDropdown.Item>
                        );
                    })}
                </BootstrapDropdown.Menu>
            </BootstrapDropdown>
        );
    }
}

export default Dropdown;
