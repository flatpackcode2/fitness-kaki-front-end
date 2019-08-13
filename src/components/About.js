import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardDeck
} from 'reactstrap';
import './About.css'
import About_Logo from "../images/about.png";
import Chat_Logo from "../images/Chat.png";
import Company_Logo from "../images/company.png";
import Developer_Logo from "../images/Developer.png";
import axios from 'axios';

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <CardDeck>
                <Card body className="text-center">
                    <CardImg top width="50%" src={Company_Logo} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Company</CardTitle>
                        <CardText>Information for our company</CardText>
                    </CardBody>
                </Card>
                <Card body className="text-center">
                    <CardImg top width="50%" src={Developer_Logo} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Developer</CardTitle>
                        <CardText>Information about the developers that are working on this website</CardText>
                    </CardBody>
                </Card>
                <Card body className="text-center">
                    <CardImg top width="50%" src={Chat_Logo} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Chatroom</CardTitle>
                        <CardText>Chat with our support team</CardText>
                    </CardBody>
                </Card>
                <Card body className="text-center">
                    <CardImg top width="50%" src={About_Logo} alt="Card image cap" class="fa fa-about" />
                    <CardBody>
                        <CardTitle>Other Information</CardTitle>
                        <CardText>Look this up for any other FAQ</CardText>
                    </CardBody>
                </Card>
            </CardDeck>
        );
    }
}

export default About;