import React, { Component } from "react";
import {Row, Col} from "reactstrap"
import "./Contact.css";
import FB from "../images/facebook.png"
import Insta from "../images/instagram.png"
import Linkin from "../images/linkin.png"
import Twitter from "../images/twitter.png"
import Whatssap from "../images/whatssap.png"
import MapContainer from "./MapContainer"
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

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            formErrors: {
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                loginSuccess: false,
            }
        };
    }

    handleSubmit = e => {
        e.preventDefault()
        const RegistrationApp = {
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
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
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
            <div className="row">
            <div className="form-wrapper">                   
            <MapContainer/>
                </div>
                <div className="form-wrapper">
                    <h1>Write To Us</h1>
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

                        <div className="subject">
                            <label htmlFor="subject">Subject</label>
                            <input
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Subject"
                                type="subject"
                                name="subject"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}
                        </div>

                        <div className="message">
                            <label
                                htmlFor="message"
                                className="grey-text"
                            >Your message
                            </label>
                            <textarea
                                type="text"
                                id="message"
                                className="form-control"
                                rows="3" />
                        </div>

                        <div className="SM">
                            <label htmlFor="SM">Find us on these social media</label>
                        </div>

                        <div>
                            <img src={FB} class="fa fa-facebook" />
                            <img src={Insta} class="fa fa-insta" />
                            <img src={Linkin} class="fa fa-linkin" />
                            <img src={Twitter} class="fa fa-twitter" />
                            <img src={Whatssap} class="fa fa-facebook" />
                        </div>

                        <div className="createAccount">
                            <button type="submit" href="/profile">Send</button>
                        </div>
                    </form>
                </div>
                </div>
                </div>
        );
    }
}

export default Registration;