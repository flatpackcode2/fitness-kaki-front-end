import React, { Component } from "react";
import "./Registration.css";
import axios from 'axios';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const passwordRegex = RegExp(
    /(?=.*[0-9])/
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
            firstname: null,
            lastname: null,
            username: null,
            email: null,
            password: null,
            formErrors: {
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                password: "",
                loginSuccess: false,
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault()
        const RegistrationApp = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }


        this.props.LiftMeUp(RegistrationApp);
    };





    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstname":
            case "lastname":
            case "username":
                formErrors.username =
                    value.length < 8 ? "please use unique username" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password = passwordRegex.test(value)
                    ? ""
                    : "Should contain 8 character long, at least 1 number, 1 big letter, and 1 small letter";
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
                    <h1>Create Account</h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="firstname">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                className={formErrors.firstname.length > 0 ? "error" : null}
                                placeholder="First Name"
                                type="text"
                                name="firstname"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.firstname.length > 0 && (
                                <span className="errorMessage">{formErrors.firstname}</span>
                            )}
                        </div>
                        <div className="lastname">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                className={formErrors.lastname.length > 0 ? "error" : null}
                                placeholder="Last Name"
                                type="text"
                                name="lastname"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.lastname.length > 0 && (
                                <span className="errorMessage">{formErrors.lastname}</span>
                            )}
                        </div>
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
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
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
                            <button type="submit" href="/profile">Register</button>
                            <a href="/profile">Register</a>
                            <a href="/login">Already Have an Account?</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Registration;