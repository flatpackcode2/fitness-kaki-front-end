import React, { Component } from "react";
import "./Login.css";
import axios from 'axios';


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

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            formErrors: {
                username: "",
                password: "",
                loginSuccess: false,
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault()
        const RegistrationApp = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.LogMeUp(RegistrationApp);
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
    render() {
        const { formErrors } = this.state;
        console.log(formErrors)
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
                            <button type="submit" href="/profile">Login</button>
                            <a href="/registration">Do Not Have an Account?</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;