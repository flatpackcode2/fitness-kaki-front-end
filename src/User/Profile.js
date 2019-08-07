import React, { Component } from 'react';
import './Profile.css'
import Acc from "../images/account.png"

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            email: null,
            password: null,
            formErrors: {
                username: "",
                email: "",
                password: "",
                loginSuccess: false,
            }
        };
    }

    componentDidMount = async () => {
        // Retrieve JWT from localStorage
        let JWT = await localStorage.getItem('userToken');
        // Axios call to endpoint

        // headers need Authorization: `Bearer ${JWT}`

        // .then() you can set state with the user information

    }

    handleSubmit = e => {
        e.preventDefault()
        const RegistrationApp = {
            username: this.state.username,
            password: this.state.password
        }


        this.props.LogMeUp(RegistrationApp);
    };

    render() {
        const { formErrors } = this.state;

        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Profile</h1>
                    <img src={Acc} id="account" />
                </div>
            </div>
        );
    }
}

export default Profile;