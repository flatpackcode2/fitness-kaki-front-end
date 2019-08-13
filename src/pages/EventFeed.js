import React from 'react';
import {
  Button,
  Row,
  Col,
  CardBody,
  CardSubtitle,
  Container,
  CardText,
  CardTitle,
  Progress,
} from 'reactstrap';
import axios from 'axios';
import Loader from '../images/loader.gif';
import { Link } from "react-router-dom";

class EventFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: true,
      eventsList: [],
      isLoading: true,
    }
  }

  //retrieve all events via axios
  componentDidMount() {
    axios.get('https://final-project-healthy.herokuapp.com/api/v1/events/')
      .then(response => {
        console.log('****');
        console.log(response);
        let tempEventList = response.data;
        this.setState({ eventsList: tempEventList, isLoading: false });
      })
      .catch(error => {
        console.log('ERROR: ', error);
      })
  }

  getUserDetails = () => {
    let users = this.props.users
    for (let idx = 0; idx++; idx < users) {
      console.log(idx)
      console.log(users[idx])
      // if (userId==users[idx]['id']){
      //   return users[idx];
      // };
    };
  }

  render() {
    console.log(this.getUserDetails())
    const { eventsList, isLoading } = this.state;
    console.log("eventsList is", eventsList)
    return (
      <div>
        <div>
          <h1>This Heading is in EventFeed.js</h1>
          <h4 className="text-center">Don't see a fitness meet you like? How about <Link to={'/events/create'}>creating your own</Link>?</h4>
          {isLoading ?
            <Container>
              <Row className="d-flex align-items-center justify-content-center">
                <img src={Loader} alt="Loading event feed" />
              </Row>
            </Container>
            :

            eventsList.map((eventInList) => {
              return (
                <Container key={eventInList.id} className="my-2">
                  <Button color="danger">
                    <Row md="10" className="d-flex align-items-center rounded">
                      <Col md="3" className=" d-flex justify-content-center align-item-center rounded">
                        <img width="100%" className="border border-white p1 rounded" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Capitals-Maple_Leafs_%2834075134291%29.jpg" alt="event image" />
                      </Col>
                      <Col md="9" className="rounded">
                        <CardBody className="p-1 text-left">
                          <CardTitle><h3>{eventInList.name}</h3></CardTitle>
                          <CardSubtitle>{eventInList.time}</CardSubtitle>
                          <CardText>Host : {eventInList.host}</CardText>
                          <CardText>{eventInList.location}</CardText>
                          <CardText>{eventInList.description}</CardText>
                          <div className="text-center">Capacity: {eventInList.max_number} (this is just text for now)</div>
                          <Progress color="success" value="25" />
                        </CardBody>
                      </Col>
                    </Row>
                  </Button>
                </Container>)
            })

          }

        </div>
      </div>
    )
  }

}

//create an event

export default EventFeed;