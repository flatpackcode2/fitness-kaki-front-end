import React, { Component } from 'react';
import { UncontrolledCarousel, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Community from "../images/community.jpg"
import Healthy from "../images/Healthy.jpg"
import Fitness from "../images/Fitness.jpg"

const items = [
    {
        src: Community,
        altText: '',
        caption: '',
        header: ''
    },
    {
        src: Healthy,
        altText: '',
        caption: '',
        header: '',

    },
    {
        src: Fitness,
        altText: '',
        caption: '',
        header: ''
    }
];

const Home = (props) => {


    return (
        <>
            <UncontrolledCarousel items={items} />
            <Row>
                <Col sm="12">
                    <Card body>
                        <h1 align="center">Community bonding with Sports</h1>
                        <h2 align="center">Trying to look for random people to do sports? <br></br>We are here for loners who wants to do some outdoor activities with other lonely people</h2>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Home;