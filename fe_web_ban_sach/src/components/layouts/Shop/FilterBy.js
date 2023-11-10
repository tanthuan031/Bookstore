import * as React from "react";

import { Accordion, Card } from "react-bootstrap";

import { connect } from "react-redux";
import { mapDispatchToProps } from "../../../adapters/ShopAdapter/ShopAdapter.js";
import { mapStateToProps } from "../../../utils/useSelector.js";

class FilterBy extends React.Component {
    constructor(props) {
        super(props);
    }

    findItemFilter = (title) => {
        return this.props.shop.current_filter.findIndex(
            (item) => item.title === title
        );
    };

    checkActive = (value) => {
        if (value && this.props.shop.current_filter.length > 0) {
            const index = this.props.shop.current_filter.findIndex(
                (item) => item.item === value
            );
            return index !== -1
                ? this.props.shop.current_filter[index].item
                : "";
        }
    };

    handleFilter = async (title, item) => {
        const index = this.findItemFilter(title);

        if (index === -1) {
            await this.props.setCurrentFilter({
                title,
                item,
            });
        } else {
            const check = this.props.shop.current_filter[index].item === item;
            if (check) {
                await this.props.removeCurrentFilter(index);
            } else {
                await this.props.editCurrentFilter({
                    index,
                    item,
                });
            }
        }

        this.props.getFilterBooks();
    };

    render() {
        return (
            <>
                {this.props.data.map((item, index) => {
                    return (
                        <Accordion
                            key={index}
                            defaultActiveKey={index + 1}
                            className={`${
                                index < this.props.data.length - 1 ? "mb-4" : ""
                            }`}
                        >
                            <Card>
                                <Accordion.Toggle
                                    as={Card.Header}
                                    eventKey={index + 1}
                                    className="cursor-pointer"
                                >
                                    <p className="text-blue d-flex align-items-center">
                                        {item.icon}
                                        <span className="flex-grow-1 font-weight-semi ml-2">
                                            {item.title}
                                        </span>
                                    </p>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={index + 1}>
                                    <Card.Body>
                                        <ul className="h-100 d-flex flex-column justify-content-center">
                                            {item.data.map((itemList, idx) => {
                                                return (
                                                    <li
                                                        key={idx}
                                                        className={`font-weight-semi cursor-pointer px-2 py-1
                                                            ${
                                                                itemList ===
                                                                this.checkActive(
                                                                    itemList
                                                                )
                                                                    ? "bg-blue-active"
                                                                    : "bg-blue-no-active"
                                                            }
                                                            ${
                                                                idx <
                                                                item.data
                                                                    .length -
                                                                    1
                                                                    ? "mb-2"
                                                                    : ""
                                                            }`}
                                                        onClick={() =>
                                                            this.handleFilter(
                                                                item.title,
                                                                itemList
                                                            )
                                                        }
                                                    >
                                                        {itemList}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    );
                })}
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBy);
