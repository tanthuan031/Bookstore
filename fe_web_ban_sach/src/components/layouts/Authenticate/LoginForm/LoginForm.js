import * as React from "react";
import * as yup from "yup";

import { Button, Form } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";

import Notiflix from "notiflix";
import TextField from "../../../base/TextField/TextField.js";
import { Toast } from "../../../../utils/toast.js";
import { hashPassword } from "../../../../utils/hashPassword.js";
import { login } from "../../../../adapters/AuthAdapter/AuthAdapter.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
    .object({
        email: yup.string().email("Invalid email").required("Required"),
        password: yup.string().required("Required"),
    })
    .required();

function LoginForm(props) {
    const [showPassword, setShowPassword] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleShowPassword = () => {
        setShowPassword((prevCheck) => !prevCheck);
    };

    const handleAuthenticateForm = () => {
        props.handleAuthenticateForm("register");
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
        const result = await login(body);

        if (result.data.message === "Password is incorrect") {
            Toast.fire({
                icon: "error",
                title: "Password is incorrect",
                background: "#fde8e8",
                color: "#f27474",
            });
            Notiflix.Block.remove(".modal-content");
            props.setBackdrop(true);
        } else if (result.data.message === "User not found") {
            Toast.fire({
                icon: "error",
                title: "This email is not registered",
                background: "#fde8e8",
                color: "#f27474",
            });
            Notiflix.Block.remove(".modal-content");
            props.setBackdrop(true);
        }

        if (result.message === "Login Successfully") {
            Toast.fire({
                icon: "success",
                title: "Login successfully",
                background: "#f0f9eb",
                color: "#a5dc86",
            });
            const token = result.data.token;
            localStorage.setItem("token", token);
            Notiflix.Block.remove(".modal-content");
            props.setBackdrop(true);
            setTimeout(() => {
                window.location.reload();
            }, 100);
        }
    };

    return (
        <Form id="form-login" onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3">
                <p className="mb-3 font-weight-bold font-18px">
                    Hi, Welcome back 👋
                </p>
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
                    id="login-show-password"
                    checked={showPassword}
                    label="Show password"
                    onChange={handleShowPassword}
                />
                <p className="font-weight-semi mt-3">
                    Don't have account?{" "}
                    <a
                        className="cursor-pointer text-blue"
                        onClick={() => handleAuthenticateForm()}
                    >
                        Register
                    </a>
                </p>
            </div>
            <div className="p-3 app-border-top-card d-flex justify-content-end">
                <Button
                    variant="blue"
                    type="submit"
                    className="font-weight-semi"
                >
                    Login
                </Button>
            </div>
        </Form>
    );
}

export default LoginForm;
