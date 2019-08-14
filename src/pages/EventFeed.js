import React from 'react';
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  Container,
  CardText,
  CardTitle,
  Progress,
  Form,
  Input
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
      eventsJoined:0
    }
  }

  //retrieve all events via axios
  componentDidMount() {
    axios.get('https://final-project-healthy.herokuapp.com/api/v1/events/')
      .then(response => {
        console.log('Component did mount~')
        console.log(response);
        let tempEventList = response.data;
        this.setState({ eventsList: tempEventList, isLoading: false })
        // console.log(tempEventList)
      })
      .catch(error => {
        console.log('ERROR: ', error);
      })
  }

  handleSubmit = e =>{
    //make an api call to guestlist and add current user to guest list
    let event_id = e.target.id
    let JWT = localStorage.getItem('userToken')
    axios.post('https://final-project-healthy.herokuapp.com/api/v1/guestlists/',
    {event_id:event_id},
      {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${JWT}`
            }
      }
    ).then(response => {
      console.log(response);

      axios.get('https://final-project-healthy.herokuapp.com/api/v1/events/')
      .then(response => {
        console.log('Component did mount~')
        console.log(response);
        let tempEventList = response.data;
        this.setState({ eventsList: tempEventList, isLoading: false })
        console.log(tempEventList)
      })
      .catch(error => {
        console.log('ERROR: ', error);
      })

  }).catch(error => {
      console.log("ERROR in request: ", error)
  })
}

  render() {
    const { eventsList, isLoading } = this.state;
    return (
      <div>
        <div>
          <h1>Events Near You</h1>
          <h4 className="text-center">Don't see a fitness meet you like? How about <Link to={'/events/create'}>creating your own</Link>?</h4>
          {isLoading ?
            <Container>
              <Row className="d-flex align-items-center justify-content-center">
                <img src={Loader} alt="Loading event feed" />
              </Row>
            </Container>
            :

            eventsList.map((eventInList) => {
              console.log(eventInList.image)
              return (
                <Container key={eventInList.id} className="my-2">
                  <Card color="info">
                    <Row md="10" className="d-flex align-items-center rounded">
                      <Col md="3" className=" d-flex justify-content-center align-item-center rounded">
                        <img width="100%" className="border border-white p1 rounded" src={eventInList.image} alt="event image" />
                      </Col>
                       <Col md="9" className="rounded">
                        <CardBody className="p-1 text-left">
                          <CardTitle><h3 className='text-light'>{eventInList.name}</h3></CardTitle>
                          <CardSubtitle className='text-light'>{eventInList.time}</CardSubtitle>
                          <CardText className='text-light'>Host : {eventInList.host.username}</CardText>
                          <CardText className='text-light'>{eventInList.location}</CardText>
                          <CardText className='text-light'>{eventInList.description}</CardText>
                          <CardText className="text-light">Capacity: {eventInList.guests.length}/{eventInList.max_number}</CardText>
                          <Row className="align-items-center">
                            <Col md="8">
                              <Progress color="success" value={Math.floor(eventInList.guests.length/eventInList.max_number*100)} />
                            </Col>
                            <Col md="4">
                            <Form>
                              <Input type="hidden" value={eventInList.id}></Input>
                              <Button id={eventInList.id} color="success" onClick={this.handleSubmit}>Join</Button>
                            </Form>
                            </Col>
                          </Row>
                        </CardBody>
                      </Col>
                    </Row>
                  </Card>
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