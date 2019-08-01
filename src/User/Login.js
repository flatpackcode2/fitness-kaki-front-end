import React, { Component } from "react";
import "./Login.css";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            formErrors: {
                username: "",
                password: ""
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
        --SUBMITTING--
        Username: ${this.state.username}
        Password: ${this.state.password}
      `);
        } else {
            console.error("Create account");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "username":
                formErrors.username =
                    value.length < 8 ? "please use unique username" : "";
                break;
            case "password":
                formErrors.password =
                    value.length < 8 ? "minimum 8 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };

    render() {
        const { formErrors } = this.state;

        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="username">
                            <label htmlFor="username">Username</label>
                            <input
                                className={formErrors.username.length > 0 ? "error" : null}
                                placeholder="username"
                                type="text"
                                name="username"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.username.length > 0 && (
                                <span className="errorMessage">{formErrors.username}</span>
                            )}
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                className={formErrors.password.length > 0 ? "error" : null}
                                placeholder="Password"
                                type="password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit">Login</button>
                            <small>Forgot password?</small>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Registration;