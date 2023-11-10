import * as React from "react";

import { Form, InputGroup } from "react-bootstrap";

import { Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { forwardRef } from "react";

function TextField(
    {
        label,
        select,
        kind,
        isClearable,
        mandatory,
        icon,
        type,
        message,
        control,
        name,
        values = [],
        ...inputProps
    },
    ref
) {
    const options = values.map((value) => ({
        label: value,
        value,
    }));

    return (
        <Form.Group className="app-text-field mb-4">
            <Form.Label className="font-weight-semi">
                {label}
                {mandatory ? <span className="text-red">*</span> : ""}
            </Form.Label>
            {select ? (
                <Controller
                    name={name}
                    control={control}
                    render={({ field: { value, onChange } }) => {
                        return (
                            <Select
                                isClearable={isClearable}
                                options={options}
                                onChange={(options) => onChange(options?.value)}
                                value={options?.filter(
                                    (option) => value === option?.value
                                )}
                            />
                        );
                    }}
                />
            ) : (
                <InputGroup>
                    {icon ? (
                        <InputGroup.Prepend>
                            <InputGroup.Text>{icon}</InputGroup.Text>
                        </InputGroup.Prepend>
                    ) : (
                        ""
                    )}
                    <Form.Control
                        as={kind}
                        type={type}
                        ref={ref}
                        name={name}
                        {...inputProps}
                    />
                </InputGroup>
            )}
            <span className="text-red font-weight-semi font-14px">
                {message}
            </span>
        </Form.Group>
    );
}

export default forwardRef(TextField);
