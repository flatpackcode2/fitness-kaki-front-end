import React, { Component } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardFooter, Row, Col
} from 'reactstrap';
import './About.css'
import Dominic from "../images/Dominic.jpg";
import Account from "../images/account.png";
import colin from "../images/colin.jpg";

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <>
            <style>{
                `.card-title{
                    font-size: 20px;
                }`
            }
            </style>
            <h2 className="text-center">About Us</h2>
            <Row className="d-flex justify-content-center">
                <p className="text-center">This platform is forked from the FitnessKaki repo <br/> - a group project done as part the <a href="https://www.nextacademy.com/quantum-degrees/coding/full-time/full-stack-web-development" target="_blank">NEXT Academy Full Stack Web Development Bootcamp</a>. Check out the <a href="https://github.com/flatpackcode2/fitness-kaki-front-end" target="_blank">front-end</a> and <a href="https://github.com/flatpackcode2/fitness-kaki-backend" target="_blank">back-end</a>.<br/>
                It is currently maintained by:</p>
                </Row>
                <Row className="d-flex justify-content-center">
                <Col md={10} className="d-flex justify-content-center">
                <Card className="text-center w-25 m-2 p-2">
                        <CardImg top width="" src={colin} alt="Card image cap" className="rounded-circle" />
                        <CardBody>
                            <CardTitle><strong>Colin Peter</strong></CardTitle>
                            <CardText>Back-end, front-end and ML enthusiast</CardText>
                            <CardFooter><a href="https://github.com/flatpackcode2" target="_blank"><i className="fab fa-github-square fa-3x"></i></a>
                            &nbsp;
                            <a href="https://www.linkedin.com/in/colinnoahpeter/" target="_blank"><i className="fab fa-linkedin fa-3x"></i></a>&nbsp;
                            <a href="mailto:colinnoahpeter@gmail.com?Subject=Hello%20there!" target="_top"><i className="fas fa-envelope-square fa-3x"></i></a>
                            </CardFooter>
                        </CardBody>
                </Card>
                </Col>
                </Row>
            
            <Row className="d-flex justify-content-center">
            <p>I would like to thank my following teammates for building the initial version with me:</p>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col md={10} className="d-flex justify-content-center">
                        <Card className="text-center w-25 m-2">
                            <CardImg top width="50%" src={Dominic} alt="Card image cap" className="rounded-circle p-2" />
                            <CardBody>
                                <CardTitle><strong>Dominic Leong</strong></CardTitle>
                                <CardText>Front-end</CardText>
                                <CardFooter><a href="https://github.com/rsl13a" target="_blank"><i className="fab fa-github-square fa-3x"></i></a></CardFooter>
                            </CardBody>
                        </Card>
                        <Card className="text-center w-25 m-2">
                            <CardImg top width="50%" src={Account} alt="Card image cap" className="rounded-circle p-2" />
                            <CardBody>
                                <CardTitle><strong>Farshid Farnia</strong></CardTitle>
                                <CardText>Front-end</CardText>
                                <CardFooter><a href="https://www.linkedin.com/in/farshid-farnia" target="_blank"><i className="fab fa-linkedin fa-3x"></i></a>&nbsp;<a href="https://github.com/farshidfarnia" target="_blank"><i className="fab fa-github-square fa-3x"></i></a></CardFooter>
                            </CardBody>
                        </Card>
                        <Card className="text-center w-25 m-2">
                            <CardImg top width="50%" src={Account} alt="Card image cap" className="rounded-circle p-2" />
                            <CardBody>
                                <CardTitle><strong>Joash Tee</strong></CardTitle>
                                <CardText>Front-end</CardText>
                                <CardFooter><a href="https://github.com/Joash-Tee" target="_blank"><i className="fab fa-github-square fa-3x"></i></a></CardFooter>
                            </CardBody>
                        </Card>
                </Col>
            </Row>
            </>
        );
    }
}

export default About;