import React, { Component } from "react";
import './About.css'
import Info from "../images/about.jpg"
import Chat from "../images/Chat.png"
import Company from "../images/company.png"
import Developer from "../images/Developer.png"
import axios from 'axios';

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="wrapper">
                <div id="wider-box" className="form-wrapper">
                    <h1>About Us</h1>

                    <div>
                        <img src={Info} id="information" />
                        <img src={Chat} id="chat" />
                        <img src={Company} id="company" />
                        <img src={Developer} id="developer" />
                    </div>



                </div>
            </div>
        );
    }
}

export default About;