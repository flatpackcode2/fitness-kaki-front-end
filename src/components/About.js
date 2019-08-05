import React, { Component } from "react";
import './About.css'
import FB from "../images/facebook.png"
import Insta from "../images/instagram.png"
import Linkin from "../images/linkin.png"
import Twitter from "../images/twitter.png"
import Whatssap from "../images/whatssap.png"
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

                </div>
            </div>
        );
    }
}

export default About;