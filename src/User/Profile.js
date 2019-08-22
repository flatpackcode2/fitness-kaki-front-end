import React, { Component } from 'react';
import { Button } from "reactstrap"
import './Profile.css'
import Dominic from "../images/Dominic.jpg"
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

    handleSubmit = e => {
        e.preventDefault()
        let JWT = localStorage.getItem('userToken');
        let data = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email
        }

        axios.post('https://final-project-healthy.herokuapp.com/api/v1/users/update',
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
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>{this.props.current_user.first_name}'s Profile</h1>
                    {/* <div className="Card"> */}
                    <div>
                        {/* <img src={Acc} id="account" /> */}
                        <img src={Dominic} style={{ width: '270px', display: 'block', margin: 'auto' }} alt="react is a pain"/>
                    </div>

                    {/* </div> */}
                    <br></br>
                    <div className="form-group">
                        <input type='text' name="username" className="form-control" onChange={this.handleInput} value={this.state.username} placeholder={this.props.current_user.username} />
                    </div>
                    <div className="form-group">
                        <input type='text' name="first_name" className="form-control" onChange={this.handleInput} value={this.state.first_name} placeholder={this.props.current_user.first_name} />
                    </div>
                    <div className="form-group">
                        <input type='text' name="last_name" className="form-control" onChange={this.handleInput} value={this.state.last_name} placeholder={this.props.current_user.last_name} />
                    </div>
                    <div className="form-group">
                        <input type='text' name="email" className="form-control" onChange={this.handleInput} value={this.state.email} placeholder={this.props.current_user.email} />
                    </div>
                    <Button color="primary" onClick={this.handleSubmit} >Save changes</Button>
                </div>
            </div>
        );
    }
}

export default Profile;