import React, { Component } from 'react';
import './Profile.css'
import Acc from "../images/account.png"
import axios from 'axios'

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
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

    // componentDidMount = async () => {
    //     // Retrieve JWT from localStorage
    // //     let JWT = await localStorage.getItem('userToken');
    // //     // headers need Authorization: `Bearer ${JWT}`
    // //     let config = {
    // //         headers: {
    // //             Authentication: `Bearer ${JWT}`
    // //         }
    // //     }
    // //     // Axios call to endpoint
    // //     axios.get('your end point', config)
    // //         .then(results => {
    // //             console.log(results)
    // //         })

    // //     // .then() you can set state with the user information

    // // }

    handleSubmit = e => {
        e.preventDefault()
        let JWT = localStorage.getItem('userToken');
        let data = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email
        }
        console.log(`username is ${data['username']}`)
        console.log(`first name is ${data['first_name']}`)
        console.log(`last name is ${data['last_name']}`)
        console.log(`email is ${data['email']}`)

        axios.post('http://final-project-healthy.herokuapp.com/api/v1/users/update',
            data,
            {
                headers: {
                    Authorization: `Bearer ${JWT}`
                },
            }).then(result => {
                // this.props.history.push('/profile')
                localStorage.setItem('userData', JSON.stringify(result.data.updated_details))
                this.props.updateDetails()
            })
            .catch(error => {
                console.log(`Edit-Profile failed: ${error}`)
                console.log(error)
                // console.log(error.response.data.message)
            })
    }



    // handleSubmit = e => {
    //     e.preventDefault()
    //     const RegistrationApp = {
    //         username: this.state.username,
    //         first_name: this.state.first_name,
    //         last_name: this.state.last_name,
    //         email: this.state.email
    //     }


    //     this.props.LogMeUp(RegistrationApp);
    // };

    openFile() {
        this.fileInputRef.current.click()
    }
    handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }


    render() {
        const { formErrors } = this.state;
        console.log(this.state)
        function refreshPage() {
            window.location.reload(false);
        }
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>{this.props.current_user.first_name} Profile</h1>
                    {/* <div className="Card"> */}
                    <div className="imageinput" onClick={this.openFile}>
                        {/* <img src={Acc} id="account" /> */}
                        <input ref={this.fileInputRef} type="file" className="" style={{ display: 'none' }} />Choose profile picture
                    </div>

                    {/* </div> */}
                    <br></br>
                    <div class="form-group">
                        <input type='text' name="username" className="form-control" onChange={this.handleInput} value={this.state.username} placeholder={this.props.current_user.username} />
                    </div>
                    <div class="form-group">
                        <input type='text' name="first_name" className="form-control" onChange={this.handleInput} value={this.state.first_name} placeholder={this.props.current_user.first_name} />
                    </div>
                    <div class="form-group">
                        <input type='text' name="last_name" className="form-control" onChange={this.handleInput} value={this.state.last_name} placeholder={this.props.current_user.last_name} />
                    </div>
                    <div class="form-group">
                        <input type='text' name="email" className="form-control" onChange={this.handleInput} value={this.state.email} placeholder={this.props.current_user.email} />
                    </div>
                    <button type="button" onClick={this.handleSubmit} >Save changes</button>
                </div>
            </div>
        );
    }
}

export default Profile;