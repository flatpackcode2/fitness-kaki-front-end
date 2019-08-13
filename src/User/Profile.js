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
            },
        };
        this.fileInputRef = React.createRef();
        this.openFile = this.openFile.bind(this);
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
    openFile() {
        this.fileInputRef.current.click()
    }
    render() {
        const { formErrors } = this.state;

        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Profile</h1>
                    {/* <div className="Card"> */}
                    <div className="imageinput" onClick={this.openFile}>
                        {/* <img src={Acc} id="account" /> */}
                        <input ref={this.fileInputRef} type="file" className="" style={{ display: 'none' }} />Choose profile picture
                    </div>

                    {/* </div> */}
                    <br></br>
                    <div class="form-group">
                        <input type='text' name="new_email" class="form-control" value="Username" />
                    </div>
                    <div class="form-group">
                        <input type='text' name="new_email" class="form-control" value="First name" />
                    </div>
                    <div class="form-group">
                        <input type='text' name="new_email" class="form-control" value="Last name" />
                    </div>
                    <div class="form-group">
                        <input type='text' name="new_email" class="form-control" value="Email" />
                    </div>
                    <div class="form-group">
                        <input type='text' name="new_email" class="form-control" value="Password" />
                    </div>
                    <button>Save changes</button>
                </div>
            </div>
        );
    }
}

export default Profile;