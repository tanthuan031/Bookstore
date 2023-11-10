import * as React from "react";
import * as yup from "yup";

import { Button, Form } from "react-bootstrap";
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";

import Notiflix from "notiflix";
import TextField from "../../../base/TextField/TextField.js";
import { Toast } from "../../../../utils/toast.js";
import authApi from "../../../../api/authApi.js";
import { hashPassword } from "../../../../utils/hashPassword.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup
        .string()
        .min(8, "Be at least 8 in length")
        .required("Required"),
});

function RegisterForm(props) {
    const [showPassword, setShowPassword] = React.useState(false);

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleShowPassword = () => {
        setShowPassword((prevCheck) => !prevCheck);
    };

    const handleAuthenticateForm = () => {
        props.handleAuthenticateForm("login");
    };

    const onSubmit = async (data) => {
        Notiflix.Block.hourglass(".modal-content", "Please wait...", {
            backgroundColor: "rgba(239, 244, 251, 0.91)",
            messageColor: "#739dd8",
            svgColor: "#739dd8",
            fontWeight: "700",
        });
        props.setBackdrop("static");
        const body = Object.assign({}, data);
        body.password = await hashPassword(data.password);
        body.password_confirmation = body.password;
        const result = await authApi.register(body);

        if (result.data.error?.email) {
            Toast.fire({
                icon: "error",
                title: "This email is already registered",
                background: "#fde8e8",
                color: "#f27474",
            });
            Notiflix.Block.remove(".modal-content");
            props.setBackdrop(true);
        }

        if (result.message === "Register Successfully") {
            Toast.fire({
                icon: "success",
                title: "Register successfully",
                background: "#f0f9eb",
                color: "#a5dc86",
            });
            Notiflix.Block.remove(".modal-content");
            props.setBackdrop(true);
            resetField("first_name");
            resetField("last_name");
            resetField("email");
            resetField("password");
            setTimeout(() => {
                handleAuthenticateForm();
            }, 100);
        }
    };

    return (
        <Form id="form-register" onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3">
                <p className="mb-3 font-weight-bold font-18px">
                    Hi, Welcome to Bookworm 👋
                </p>
                <TextField
                    label="First name"
                    type="text"
                    mandatory={true}
                    select={false}
                    icon={<FaUserAlt />}
                    {...register("first_name")}
                    name="first_name"
                    message={errors.first_name?.message}
                />
                <TextField
                    label="Last name"
                    type="text"
                    mandatory={true}
                    select={false}
                    icon={<FaUserAlt />}
                    {...register("last_name")}
                    name="last_name"
                    message={errors.last_name?.message}
                />
                <TextField
                    label="Email"
                    type="text"
                    mandatory={true}
                    select={false}
                    icon={<FaEnvelope />}
                    {...register("email")}
                    name="email"
                    message={errors.email?.message}
                />
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    mandatory={true}
                    select={false}
                    icon={<FaLock />}
                    {...register("password")}
                    name="password"
                    message={errors.password?.message}
                />
                <Form.Check
                    custom
                    type="checkbox"
                    id="register-show-password"
                    checked={showPassword}
                    label="Show password"
                    onChange={handleShowPassword}
                />
                <p className="font-weight-semi mt-3">
                    Have an account?{" "}
                    <a
                        className="cursor-pointer text-blue"
                        onClick={() => handleAuthenticateForm()}
                    >
                        Login
                    </a>
                </p>
            </div>
            <div className="p-3 app-border-top-card d-flex justify-content-end">
                <Button
                    variant="blue"
                    type="submit"
                    className="font-weight-semi"
                >
                    Register
                </Button>
            </div>
        </Form>
    );
}

export default RegisterForm;
